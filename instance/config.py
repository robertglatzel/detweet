#!/usr/bin/env python3

import os

SECRET_KEY = os.urandom(16)
SQLALCHEMY_DATABASE_URI = os.environ.get('database_uri')
SQLALCHEMY_TRACK_MODIFICATIONS = False
TWITTER_OAUTH_API_KEY = os.environ.get('twitter_api_key')
TWITTER_OAUTH_API_SECRET = os.environ.get('twitter_api_secret')
ACCESS_TOKEN = os.environ.get('access_token')
ACCESS_SECRET = os.environ.get('access_secret')
