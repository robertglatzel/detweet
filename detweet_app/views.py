#!/usr/bin/python3
""" Script to start a Flask web application """

from detweet_app import app, db, User, OAuth
from flask import jsonify, redirect, render_template, request, url_for, session, flash
from flask_cors import CORS
from flask_dance.consumer import oauth_authorized
from flask_dance.consumer.storage.sqla import SQLAlchemyStorage
from flask_dance.contrib.twitter import twitter
from .deTweet import get_all_tweets, delete_tweets
from flask_dance.contrib.twitter import make_twitter_blueprint
from flask_login import LoginManager, current_user, login_required, login_user, logout_user
import re

twitter_bp = make_twitter_blueprint(redirect_to='index')
twitter_bp.storage = SQLAlchemyStorage(OAuth, db.session, user=current_user)
app.register_blueprint(twitter_bp, url_prefix='/login')
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'twitter.login'
CORS(app, resources={r"*": {"origins": "*"}})


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))

#create/Login Local user on Succesful OAuth Login
@oauth_authorized.connect_via(twitter_bp)
def twitter_logged_in(twitter_bp, token):
    print(token)
    if not token:
        flash("Failed to log in with twitter", category="error")
        return False

    resp = twitter_bp.session.get("account/verify_credentials.json")
    if not resp.ok:
        msg = "Failed to fetch user info from Twitter"
        flash(msg, category="error")
        return False

    twitter_info = resp.json()
    id = str(twitter_info['id'])

    # Find this OAuth token in the database, or create it
    query = OAuth.query.filter_by(
    provider=twitter_bp.name,
    provider_user_id=id)
    try:
        oauth = query.one()
    except NoResultFound:
        oauth = Oauth(
          provider=twitter_bp.name,
          provider_user_id=hubspot_user_id,
          token=token,
        )

    if oauth.user:
        login_user(oauth.user)
        flash("Successfully signed in with Twitter")
    else:
        # Create a new local user account for this user
        user = User(
        # Remember that 'email' can be None, if the user declines
            username=twitter_info["screen_name"], 
            id = twitter_info['id']
            )
        oauth.user = user
        db.session.add_all([user, oauth])
        db.session.commit()
        login_user(user)
        flash("Successfully signed in with hubspot")

    return False

@app.route('/')
def serve_login_page():
    return render_template('login.html')

@app.route('/login')
def index():
    if not twitter.authorized:
        return redirect(url_for('twitter.login'))

    resp = twitter.get("account/verify_credentials.json")
    session['img'] = resp.json()['profile_image_url_https']
    screen_name = resp.json()['screen_name']
    return redirect(url_for('tweet_page', username=screen_name))

@app.route('/tweet_page/<username>')
def tweet_page(username):
    img = session.get('img', None)
    img = ''.join(re.split("_normal", img))
    return render_template('index.html', username=username, img=img)

@app.route('/get_tweets', methods=['POST'])
def get_tweets():
    '''
    gets's all tweets, passes them to filter_tweet
    '''
    tweets = get_all_tweets(twitter, request)
    return(jsonify(tweets))

@app.route('/delete_tweets', methods=['POST'])
def tweet_deleter():
    ''' Grabs the POST data sent from the client
        deletes each tweet based on the tweet id present
        in the list
    '''
    ret_status = delete_tweets(twitter, request)
    return jsonify(ret_status)

if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
