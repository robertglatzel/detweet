#!/usr/bin/python3
from flask import Flask
from flask_dance.contrib.twitter import make_twitter_blueprint
from flask_cors import CORS

app = Flask(__name__, instance_relative_config=True)
#app.config.from_object('config')
app.config.from_pyfile('config.py')
app.url_map.strict_slashes = False

twitter_bp = make_twitter_blueprint()
app.register_blueprint(twitter_bp, url_prefix='/login')
CORS(app, resources={r"/": {"origins": "*"}})
import detweet_app.views
