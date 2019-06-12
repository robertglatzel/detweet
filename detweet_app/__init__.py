#!/usr/bin/env python3

from flask import Flask
from flask_dance.contrib.twitter import make_twitter_blueprint
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

sentry_sdk.init(
    dsn="https://09c2874ccfa24b7ba3634623ebf97350@sentry.io/1480075",
    integrations=[FlaskIntegration()]
)

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')
app.url_map.strict_slashes = False

blueprint = make_twitter_blueprint(redirect_to='tweet_page')
app.register_blueprint(blueprint, url_prefix="/login")
import detweet_app.views
