#!/usr/bin/env python3

from flask import Flask
from flask_dance.contrib.twitter import make_twitter_blueprint

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')
app.url_map.strict_slashes = False


blueprint = make_twitter_blueprint(redirect_to='tweet_page')

app.register_blueprint(blueprint, url_prefix='/login')
import detweet_app.views
