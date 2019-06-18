#!/usr/bin/env python3

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import oauth2 as oauth


app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////home/hemant/detweet.db'
app.url_map.strict_slashes = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'entry'


consumer_key = app.config['TWITTER_OAUTH_API_KEY']
consumer_secret = app.config['TWITTER_OAUTH_API_SECRET']

request_token_url = 'https://api.twitter.com/oauth/request_token'
access_token_url = 'https://api.twitter.com/oauth/access_token'
authorize_url = 'https://api.twitter.com/oauth/authorize'

consumer = oauth.Consumer(consumer_key, consumer_secret)
client = oauth.Client(consumer)

import detweet_app.views