#!/usr/bin/python3
""" Script to start a Flask web application """

from detweet_app import app
from .oauth import blueprint
from .models import OAuth, User
from flask import jsonify, redirect, render_template, request, url_for, session
from flask_cors import CORS
from flask_dance.contrib.twitter import twitter
from flask_login import login_required, logout_user, current_user
from .deTweet import get_all_tweets, delete_tweets
import re
from uuid import uuid4


CORS(app, resources={r"*": {"origins": "*"}})

@app.route('/')
def serve_login_page():
    return render_template('login.html')

@app.route('/login')
def index():
    return redirect(url_for('twitter.login'))

@app.route('/tweet_page')
@login_required
def tweet_page():
    if current_user.is_authenticated == False:
        return redirect(url_for('index'))
    img = current_user.image_url
    img_no_normal = ''.join(re.split("_normal", img))
    return render_template(
            'index.html',
            username = current_user.name,
            info = current_user.description,
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
@login_required
def session_logout():
    """ Deletes the OAuth token from the database and redirects the user
        to the serve_login_page view
    """
    logout_user()
    return redirect(url_for('serve_login_page'))


@app.errorhandler(404)
def handle_error(error):
    return render_template('404page.html'), 404

if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
