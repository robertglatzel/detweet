#!/usr/bin/python3
""" Script to start a Flask web application """
from detweet_app import app
from flask_dance.contrib.twitter import twitter
from flask import render_template, url_for, redirect, jsonify
from . import deTweet

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
    return redirect(url_for('tweet_page', username=screen_name,
        tweets=None))

@app.route('/tweet_page/<username>/<tweets>')
def tweet_page(username, tweets=None):
    return render_template('index.html', username=username, tweets=tweets)

@app.route('/get_tweets/user_filter')
def get_tweets(user_filter=None)
    """
    resp = twitter.get("account/verify_credentials.json")
    assert resp.ok
    payload = {'screen_name': resp.json()['screen_name']}
    resp = twitter.get('statuses/user_timeline.json', params=payload)
    print(type(resp.json()))
    #return render_template('index.html', tweets=deTweet.safety(resp.json()))
    return redirect(url_for('tweet_page', username=resp.json()['screen_name'], tweets=deTweet.safety(resp.json())))
    """

    resp = twitter.get("account/verify_credentials.json")
    assert resp.ok
    payload = {'screen_name': resp.json()['screen_name']}
    resp = twitter.get('statuses/user_timeline.json', params=payload)
    tweets = deTweet.safety(resp.json(), user_filter)
    return jsonify(tweets)

if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
