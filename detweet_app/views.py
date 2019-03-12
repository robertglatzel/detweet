#!/usr/bin/python3
""" Script to start a Flask web application """

from detweet_app import app, twitter_bp
from flask import jsonify, redirect, render_template, request, url_for
from flask_cors import CORS
from flask_dance.contrib.twitter import twitter
from . import deTweet

CORS(app, resources={r"*": {"origins": "*"}})

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
    return redirect(url_for('tweet_page', username=screen_name))

@app.route('/tweet_page/<username>')
def tweet_page(username, tweets=None):
    return render_template('index.html', username=username)

@app.route('/get_tweets', methods=['POST'])
def get_tweets():
    global_tweet_list = []
    last_tweet_id = None
    for i in range(16):
        if (last_tweet_id) is None:
            payload = {'count': 200, 'include_rts': 1}
        else:
            payload = {'count': 200, 'include_rts': 1, 'max_id': last_tweet_id}
        tweet_list = twitter.get('statuses/user_timeline.json', params=payload).json()
        last_tweet_id = tweet_list[-1].get('id')
        global_tweet_list += tweet_list

    user_filter = request.get_json()
    tweets = deTweet.safety(global_tweet_list, user_filter)
    return jsonify(tweets)

if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
