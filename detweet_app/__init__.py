#!/usr/bin/python3
from flask import Flask
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin, SQLAlchemyStorage
from flask_dance.contrib.twitter import make_twitter_blueprint
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')
app.url_map.strict_slashes = False

db = SQLAlchemy(app)
class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(250), unique = True)

class OAuth(OAuthConsumerMixin, db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    user = db.relationship(User)
db.create_all()

twitter_bp = make_twitter_blueprint(redirect_to='index')
twitter_bp.storage = SQLAlchemyStorage(OAuth, db.session)

app.register_blueprint(twitter_bp, url_prefix='/login')

import detweet_app.views
