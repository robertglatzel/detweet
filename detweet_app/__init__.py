#!/usr/bin/env python3

from flask import Flask
from authlib.flask.client import OAuth

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')
app.url_map.strict_slashes = False

oauth = OAuth(app)

auth0 = oauth.register(
    'auth0',
    client_id='G66gVi4HPmHHhJVRXD5alEZzlU02PuG2',
    client_secret = 'GlKWByC67S0vTv_9ZSMqcrZnC_LAeccN8ghUvQYxxobOjuKaMTVL9bkrwjDoIftV',
    api_base_url = 'https://dev-p8knhxpg.auth0.com',
    access_token_url = 'https://dev-p8knhxpg.auth0.com/oauth/token',
    authorize_url = 'https://dev-p8knhxpg.auth0.com/authorize',
    client_kwargs = {
        'scope': 'openid profile'
    }
)

import detweet_app.views