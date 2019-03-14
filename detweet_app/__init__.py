#!/usr/bin/python3
from flask import Flask
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')
app.url_map.strict_slashes = False

db = SQLAlchemy(app)
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(250), unique = True)

class OAuth(OAuthConsumerMixin, db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    user = db.relationship(User)

db.create_all()

import detweet_app.views
