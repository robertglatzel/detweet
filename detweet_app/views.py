#!/usr/bin/python3
""" Script to start a Flask web application """

from detweet_app import app, db, OAuth1Token, oauth
from flask import jsonify, redirect, render_template, request, url_for, session, flash
from flask_cors import CORS
from .deTweet import get_all_tweets, delete_tweets
import re

CORS(app, resources={r"*": {"origins": "*"}})

@app.route('/')
def serve_login_page():
    return render_template('login.html')

@app.route('/login')
def index():
    redirect_uri = url_for('authorize', _external = True)
    return oauth.twitter.authorize_redirect(redirect_uri)

@app.route('/authorize')
def authorize():
    token = oauth.twitter.authorize_access_token()
    user_id = token['user_id']
    name = token['screen_name']
    oauth_token = token['oauth_token']
    oauth_token_secret = token['oauth_token_secret']
    oauth_entry = OAuth1Token(
            user_id = int(user_id),
            name = name,
            oauth_token = oauth_token,
            oauth_token_secret = oauth_token_secret
            )
    oauth_entry.save()
    return redirect(url_for('tweet_page'))

@app.route('/tweet_page')
def tweet_page():
    img = session.get('img', None)
    img = ''.join(re.split("_normal", img))

    resp = oauth.twitter.get("account/verify_credentials.json")

    session['img'] = resp.json()['profile_image_url_https']
    screen_name = resp.json()['screen_name']

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
