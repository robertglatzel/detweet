from detweet_app import app
from requests_oauthlib import OAuth1Session
from flask import jsonify, request, url_for, session
from flask_cors import CORS
from detweet_app.functions.delete_tweets import delete_tweets
from detweet_app.functions.filter_tweets import filter_tweets
from detweet_app.functions.get_all_tweets import get_all_tweets
import re

CORS(app, resources={r"*": {"origins": "*"}})

request_token_url = 'https://api.twitter.com/oauth/request_token'
base_authorization_url = 'https://api.twitter.com/oauth/authorize'

@app.route('/login')
def request_url():
    oauth = OAuth1Session(
        client_key=app.config['TWITTER_OAUTH_CLIENT_KEY'],
        client_secret=app.config['TWITTER_OAUTH_CLIENT_SECRET']
    )

    fetch_response = oauth.fetch_request_token(request_token_url)
    session['oauth_token'] = fetch_response['oauth_token']
    session['oauth_token_secret'] = fetch_response['oauth_token_secret']

    authorization_url = oauth.authorization_url(base_authorization_url)

    return authorization_url

@app.route('/authorized')
def authorized():
    oauth_verifier = request.args.get('oauth_verifier')
    oauth_token = request.args.get('oauth_token')

    dict_ = {
        'verifier': oauth_verifier,
        'oauth_token': oauth_token
    }
    return jsonify(dict_)


"""


@app.route('/tweet_page')
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
    ''' gets all tweets, passes them to filter_tweet
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
def logout():
    ''' Deletes the OAuth token from the database and redirects the user
        to the serve_login_page view
    '''
    logout_user()
    return redirect(url_for('main'))


@app.errorhandler(404)
def handle_error(error):
    return render_template('404page.html'), 404
"""