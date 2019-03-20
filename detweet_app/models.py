#!/usr/bin/env python3

from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin


db = SQLAlchemy()


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), unique=True)
    image_url = db.Column(db.String(256), unique=True)
    description = db.Column(db.String(256), unique=True)



class OAuth(OAuthConsumerMixin, db.Model):
    provider_user_id = db.Column(db.String(256), unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    user = db.relationship(User)


# setup login manager
login_manager = LoginManager()
login_manager.login_view = 'serve_login_page'


@login_manager.user_loader
def load_user(user_id):
    try:
        return User.query.filter_by(id=int(user_id)).first()
    except:
        return None 
