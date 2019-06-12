#!/usr/bin/python3
""" Script to start a Flask web application """

from detweet_app import app, blueprint
from flask import jsonify, redirect, render_template, request, url_for, session
from flask_cors import CORS
from flask_dance.contrib.twitter import twitter
from .deTweet import get_all_tweets, delete_tweets
import re
from uuid import uuid4


CORS(app, resources={r"*": {"origins": "*"}})


def getUserInformation():
    resp = twitter.get('account/verify_credentials.json')

    info = resp.json()

    keys_to_store = ['screen_name', 'profile_image_url_https','description']

    for item in keys_to_store:
        session[item] = info[item]

@app.route('/')
def serve_login_page():
    return render_template('login.html')

@app.route('/login')
def index():
    return redirect(url_for('twitter.login'))

@app.route('/tweet_page')
def tweet_page():
    getUserInformation()
    img = session['profile_image_url_https']
    img_no_normal = ''.join(re.split("_normal", img))
    return render_template(
            'index.html',
            username = session['screen_name'],
            info = session['description'],
            img = img_no_normal
            )

@app.route('/get_tweets', methods=['POST'])
def get_tweets():
    ''' gets's all tweets, passes them to filter_tweet
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

@app.route('/logout')
def session_logout():
    """ Deletes the OAuth token from the database and redirects the user
        to the serve_login_page view
    """
    for key in session.keys():
        session.pop(key)
    return redirect(url_for('serve_login_page'))


@app.errorhandler(404)
def handle_error(error):
    return render_template('404page.html'), 404

if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
