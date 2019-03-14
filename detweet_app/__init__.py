#!/usr/bin/python3
from flask import Flask
from authlib.flask.client import OAuth
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')
app.url_map.strict_slashes = False

db = SQLAlchemy(app)
class OAuth1Token(db.Model)
    user_id = Column(Integer, nullable=False)
    name = Column(String(20), nullable=False)

    oauth_token = Column(String(48), nullable=False)
    oauth_token_secret = Column(String(48))

    def to_token(self):
        return dict(
            oauth_token=self.access_token,
            oauth_token_secret=self.alt_token,
        )

db.create_all()

class Cache(object):
    def __init__(self):
        self.temp_dict = {}

    def get(self, key):
        return self.temp_dict.get(key)

    def set(self, key, value, expires=None):
        self.temp_dict[key] = value

oauth = OAuth(app, cache = Cache())

oauth.register(
    name='twitter',
    request_token_url='https://api.twitter.com/oauth/request_token',
    request_token_params=None,
    access_token_url='https://api.twitter.com/oauth/access_token',
    access_token_params=None,
    refresh_token_url=None,
    authorize_url='https://api.twitter.com/oauth/authenticate',
    api_base_url='https://api.twitter.com/1.1/',
    client_kwargs=None,
)
import detweet_app.views
