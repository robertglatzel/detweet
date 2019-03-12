#!/usr/bin/python3
from flask import Flask
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin, SQLAlchemyStorage
from flask_dance.contrib.twitter import make_twitter_blueprint
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')
app.url_map.strict_slashes = False

db = SQLAlchemy(app)
class OAuth(OAuthConsumerMixin, db.Model):
    pass
db.create_all()

twitter_bp = make_twitter_blueprint()
twitter_bp.storage = SQLAlchemyStorage(OAuth, db.session)

app.register_blueprint(twitter_bp, url_prefix='/login')

import detweet_app.views
