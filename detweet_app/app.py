#!/usr/bin/python3
""" Script to start a Flask web application """
from flask import Flask, render_template, url_for, redirect
from flask_dance.contrib.twitter import make_twitter_blueprint, twitter
from flask_cors import CORS
from deTweet import safety
from models.AuthClass import AuthClass

login = AuthClass()

app = Flask(__name__)
app.url_map.strict_slashes = False
app.secret_key = 'our super secret key'
app.config['TWITTER_OAUTH_API_KEY'] = login.consumer_key
app.config['TWITTER_OAUTH_API_SECRET'] = login.consumer_secret

twitter_bp = make_twitter_blueprint()
app.register_blueprint(twitter_bp, url_prefix='/login')
#cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:port"}})



@app.route('/')
def serve_login_page():
    return render_template('login.html')


@app.route('/login')
def index():
    if not twitter.authorized:
        return redirect(url_for('twitter.login'))

    resp = twitter.get("account/verify_credentials.json")
    assert resp.ok
    

    screen_name = resp.json()['screen_name']
    print(screen_name)
    #return "You are @{screen_name} on Twitter".format(screen_name=resp.json()["screen_name"])
    return redirect(url_for('tweet_page', username=screen_name))

@app.route('/tweet_page/<username>')
def tweet_page(username):
    return render_template('index.html', username=username)

@app.route('/get_tweets')
def get_tweets():
    return render_template('index.html', tweets=safety())

if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
