#!/usr/bin/python3
from flask import Flask
from authlib.flask.client import OAuth
from sqlalchemy.ext.declarative import declarative_base
from flask_login import UserMixin

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')
app.url_map.strict_slashes = False

Base = declarative_base()

class OAuth1Token(Base):
    __tablename__ = 'OAuth1Token'
    user_id = Column(Integer, auto_increment=True, primary_key = True)
    name = Column(String(20), nullable=False)

    oauth_token = Column(String(100), nullable=False)
    oauth_token_secret = Column(String(100))

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

    def set(self, key, value, expires=None, **kwargs):
        self.temp_dict[key] = value

    def delete(self, key):
        del self.temp_dict[key]

oauth = OAuth(app, cache=Cache())
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
print(oauth.__dict__)
import detweet_app.views
