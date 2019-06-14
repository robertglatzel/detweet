#!/usr/bin/env python3

from flask import Flask
import oauth2 as oauth


app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')
app.url_map.strict_slashes = False

consumer_key = app.config['TWITTER_OAUTH_API_KEY']
consumer_secret = app.config['TWITTER_OAUTH_API_SECRET']

request_token_url = 'https://api.twitter.com/oauth/request_token'
access_token_url = 'https://api.twitter.com/oauth/access_token'
authorize_url = 'https://api.twitter.com/oauth/authorize'

consumer = oauth.Consumer(consumer_key, consumer_secret)
client = oauth.Client(consumer)

import detweet_app.views
