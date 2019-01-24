#!/usr/bin/python3
"""
This twitter bot favorites posts having to do with the 100 day coding challange.
"""

import tweepy
from models.AuthClass import AuthClass


"""Setup"""
login = AuthClass()
auth = tweepy.OAuthHandler(login.consumer_key, login.consumer_secret)
auth.set_access_token(login.access_token, login.access_secret)
api = tweepy.API(auth)


def favorite_challanges(searchArr, number):
    """ This function favorites number_of_tweets tweets matching keywords
    relating to the 100 days of coding challenges
    """

    number_of_tweets = number

    print("You passed in {} search keywords. They are: ".format(len(searchArr)))
    for x in searchArr:
        print(x)

    for keyword in searchArr:
        for tweet in tweepy.Cursor(
                api.search,
                keyword).items(number_of_tweets):
            try:
                tweet.favorite()
                print("This tweet says: {}".format(tweet.text))
            except tweepy.TweepError:
                print("Already favorited this one")
            except StopIteration:
                break


if __name__ == "__main__":
    search = ["#100DaysOfCode", "#100DaysofCode",
              "#301DaysOfCode", "#100daysofcode"]
    favorite_challanges(search, 10)
