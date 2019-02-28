#!/usr/bin/python3
""" Script to start a Flask web application """
from flask import Flask, render_template
from deTweet import safety

app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'

@app.route('/')
def index():
    ''' return the home page '''
    tweets = safety()
    print(tweets)
    return render_template('index.html', tweets=tweets)

if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
