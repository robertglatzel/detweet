#!/usr/bin/env python3

# Replace the braces in the URI string with your root password for the mysql root user
SQLALCHEMY_DATABASE_URI="mysql://root:{mysql password for root user}@localhost/detweet"
SQLALCHEMY_TRACK_MODIFICATIONS=False


#Fill in the strings with your keys and secrets from your twitter developer account
TWITTER_API_KEY="ENTER YOUR API KEY FROM TWITTER IN QUOTES OVER HERE"

TWITTER_OAUTH_API_SECRET="ENTER YOUR API SECRET FROM TWITTER IN QUOTES HERE"

ACCESS_TOKEN="ENTER YOUR ACCESS TOKEN FROM TWITTER IN QUOTES HERE"

ACCESS_SECRET="ENTER YOUR ACCESS SECRET FROM TWITTER IN QUOTES HERE"
