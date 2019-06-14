#!/usr/bin/python3
""" Script to start a Flask web application """

from detweet_app import app, request_token_url, access_token_url, authorize_url, consumer, client, oauth
import urllib.parse
from flask import jsonify, redirect, render_template, request, url_for, session
from flask_cors import CORS
from .deTweet import get_all_tweets, delete_tweets
import re
import json
from uuid import uuid4


CORS(app, resources={r"*": {"origins": "*"}})


@app.route('/')
def entry():
    return render_template('login.html')

@app.route('/login')
def login():
    resp, content = client.request(request_token_url, "GET")
    '''
    if resp['status'] != 200:
        raise Exception("Invalid Response {}".format(resp['status']))
    '''

    session['request_token'] = dict(urllib.parse.parse_qsl(content.decode("utf-8")))

    tmp = "{}?oauth_token={}".format(authorize_url, session['request_token']['oauth_token'])
    return redirect(tmp)

@app.route('/callback')
def callback():

    token = oauth.Token(
        session['request_token']['oauth_token'],
        session['request_token']['oauth_token_secret']
    )

    token.set_verifier(request.args.get('oauth_verifier'))

    client = oauth.Client(consumer, token)
    session.pop('request_token')

    resp, content = client.request(access_token_url, "POST")

    session['access_token'] = dict(urllib.parse.parse_qsl(content.decode('utf-8')))

    return redirect(url_for('tweet_page'))

@app.route('/tweet_page')
def tweet_page():
    token = oauth.Token(
        session['access_token']['oauth_token'],
        session['access_token']['oauth_token_secret']
    )
    client = oauth.Client(consumer, token)
    credential_url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    resp, content = client.request(credential_url, "GET")

    if resp['status'] == 401:
        return redirect(url_for('entry'))

    info = json.loads(content.decode('utf-8').replace("'", '"'))

    img = info['profile_image_url_https']
    img_no_normal = ''.join(re.split("_normal", img))
    return render_template(
            'index.html',
            username = info['screen_name'],
            info = info['description'],
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
    return redirect(url_for('entry'))


@app.errorhandler(404)
def handle_error(error):
    return render_template('404page.html'), 404

if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
