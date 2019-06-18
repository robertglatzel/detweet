#!/usr/bin/python3

from detweet_app import access_token_url, authorize_url, app, consumer, client, db, oauth, request_token_url
from detweet_app.models import User
import urllib.parse
from flask import jsonify, redirect, render_template, request, url_for, session
from flask_cors import CORS
from flask_login import login_required, current_user, logout_user, login_user
from .deTweet import get_all_tweets, delete_tweets
import re
import json
from uuid import uuid4


CORS(app, resources={r"*": {"origins": "*"}})

tmp_cache = {}

@app.route('/')
def entry():
    return render_template('login.html')

@app.route('/login')
def login():

    # Sends a request to the request token url to obtain a request token
    resp, content = client.request(request_token_url, "GET")
    print("The status code of the initial request is {}".format(resp['status']))

    # resp['status'] is a string. need to convert to an int
    if int(resp['status']) != 200:
        raise Exception("Invalid Response {}".format(resp['status']))

    # Stores the request token in the tmp_cache dictionary after parsing and decoding the value of content
    tmp_cache['request_token'] = dict(urllib.parse.parse_qsl(content.decode("utf-8")))

    # Generates url to redirect for authenticating the user
    tmp = "{}?oauth_token={}".format(authorize_url, tmp_cache['request_token']['oauth_token'])
    print("The redirect url is {}".format(tmp))
    return redirect(tmp)

@app.route('/callback')
def callback():

    # Jumps into this route after user authenticated through twitter correctly

    # Grabs the oauth token and secret from the request token in the login route
    token = oauth.Token(
        tmp_cache['request_token']['oauth_token'],
        tmp_cache['request_token']['oauth_token_secret']
    )

    # Does something, don't exactly know yet
    token.set_verifier(request.args.get('oauth_verifier'))

    # Creates a client to interact with the access_token endpoint
    client = oauth.Client(consumer, token)
    # Destroys the request token from the cache
    tmp_cache.pop('request_token')

    # Grabs the access_token from the access_token_url
    resp, content = client.request(access_token_url, "POST")

    # Access token obtained
    access_token = dict(urllib.parse.parse_qsl(content.decode('utf-8')))

    print("The access token for the authenticating user is {}".format(access_token))

    # Query the database for an instance of this user
    user = User.query.filter_by(username=access_token['screen_name']).first()

    print("Found a user in our tables = {}".format(user))

    if user is None:

        print("Creating a user in our database")
        user = User(
            username=access_token['screen_name'],
            oauth_token = access_token['oauth_token'],
            oauth_token_secret = access_token['oauth_token_secret']
        )    

        #Adding the user to the current session
        db.session.add(user)
        # Commiting the user to the database
        db.session.commit()

    # Logging the user into the session
    login_user(user)

    return redirect(url_for('tweet_page'))

@app.route('/tweet_page')
@login_required
def tweet_page():
    print("You have entered the tweet_page route")
    print("The user logged into this route is = {}".format(current_user))

    token = oauth.Token(
        current_user.oauth_token,
        current_user.oauth_token_secret
    )
    client = oauth.Client(consumer, token)
    credential_url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    resp, content = client.request(credential_url, "GET")

    if resp['status'] == 401:
        return redirect(url_for('entry'))

    info = json.loads(content.decode('utf-8'))

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

    print("The logged in user is = {}".format(current_user))

    token = oauth.Token(
        current_user.oauth_token,
        current_user.oauth_token_secret
    )

    print(token.key)
    print(token.secret)
    client = oauth.Client(consumer, token)

    tweets = get_all_tweets(client, request)
    return(jsonify(tweets))

@app.route('/delete_tweets', methods=['POST'])
def tweet_deleter():
    ''' Grabs the POST data sent from the client
        deletes each tweet based on the tweet id present
        in the list
    '''
    token = oauth.Token(
        current_user.oauth_token,
        current_user.oauth_token_secret
    )
    client = oauth.Client(consumer, token)
    ret_status = delete_tweets(client, request)
    return jsonify(ret_status)

@app.route('/logout')
@login_required
def session_logout():
    """ Deletes the OAuth token from the database and redirects the user
        to the serve_login_page view
    """
    logout_user()
    return redirect(url_for('entry'))


@app.errorhandler(404)
def handle_error(error):
    return render_template('404page.html'), 404

if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
