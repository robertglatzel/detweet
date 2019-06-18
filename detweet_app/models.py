from detweet_app import db, login_manager
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True, nullable=False)
    #email = db.Column(db.String(320), unique=True, nullable=False)
    #description = db.Column(db.String(160), nullable=False)
    oauth_token = db.Column(db.Text)
    oauth_token_secret = db.Column(db.Text)

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id = user_id).first()