#!/usr/bin/python3

from detweet_app import app, auth0
from flask import jsonify, redirect, render_template, url_for, session
from flask_cors import CORS
from .deTweet import get_all_tweets, delete_tweets
import re
from uuid import uuid4
from functools import wraps
import json
from os import environ as env
from werkzeug.exceptions import HTTPException


CORS(app, resources={r"*": {"origins": "*"}})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'profile' not in session:
            return redirect('/')
        return f(*args, **kwargs)

    return decorated

@app.route('/')
def serve_login_page():
    return render_template('login.html')

@app.route('/callback')
def callback_handling():
    # Handles response from token endpoint

    auth0.authorize_access_token()
    resp = auth0.get('user_info')
    user_info = resp.json()

    session['jwt_payload'] = user_info
    session['profile'] = {
        'user_id': user_info['sub'],
        'name': user_info['name'],
        'picture': user_info['picture']
    }

    return redirect('/tweet_page')


@app.route('/login')
def login():
    headers = {
        'response_type': 'token',
        'connection': 'twitter',
        'redirect_uri': 'http://localhost:5000/tweet_page'
    }
    auth0.get('/authorize', headers=headers)

@app.route('/tweet_page')
@requires_auth
def tweet_page():

    return render_template('index.html')

    """
    current_user = session['profile']
    img = current_user.get('picture')
    img_no_normal = ''.join(re.split("_normal", img))
    return render_template(
            'index.html',
            username = current_user.get('name'),
            info = current_user.description,
            img = img_no_normal
            )

    """


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
    session.clear()

    params = {
        'returnTo': url_for('')
    }


@app.errorhandler(404)
def handle_error(error):
    return render_template('404page.html'), 404