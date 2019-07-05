from detweet_app import app
from flask import jsonify, redirect, render_template, request, url_for, session
from flask_cors import CORS
from flask_dance.contrib.twitter import twitter
from flask_login import login_required, logout_user
from detweet_app.functions.delete_tweets import delete_tweets
from detweet_app.functions.filter_tweets import filter_tweets
from detweet_app.functions.get_all_tweets import get_all_tweets
import re

CORS(app, resources={r"*": {"origins": "*"}})


@app.route('/')
def main():
    return render_template('login.html')


@app.route('/login')
def login():
    return redirect(url_for('twitter.login'))


@app.route('/tweet_page')
@login_required
def tweet_page():
    resp = twitter.get('account/verify_credentials.json')
    info = resp.json()
    img = info['profile_image_url_https']
    img_no_normal = ''.join(re.split("_normal", img))
    return render_template(
            'index.html',
            username=info['screen_name'],
            info=info['description'],
            img=img_no_normal
            )


@app.route('/get_tweets', methods=['POST'])
def get_tweets():
    ''' gets's all tweets, passes them to filter_tweet
    '''
    user_timeline_tweets = get_all_tweets(twitter)
    user_filter = request.get_json()
    tweets = filter_tweets(user_timeline_tweets, user_filter)
    return jsonify(tweets)


@app.route('/delete_tweets', methods=['POST'])
def tweet_deleter():
    ''' Grabs the POST data sent from the client
        deletes each tweet based on the tweet id present
        in the list
    '''
    tweet_ids_to_delete = request.get_json()
    return jsonify(
        delete_tweets(twitter, tweet_ids_to_delete)
    )


@app.route('/logout')
@login_required
def logout():
    """ Deletes the OAuth token from the database and redirects the user
        to the serve_login_page view
    """
    logout_user()
    return redirect(url_for('main'))


@app.errorhandler(404)
def handle_error(error):
    return render_template('404page.html'), 404
