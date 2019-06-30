#!/usr/bin/python3
"""
This twitter bot favorites posts having to do with the 100 day coding challange.
"""

from TwitterAPI import TwitterAPI
import pprint

"""Setup"""

api = TwitterAPI(consumer_key, consumer_secret, access_token, access_secret)


def unfollow_by_likes():
    ''' 
    Looks at your friends and your recent likes. If you haven't liked one of your friends tweets, display the user 
    Needs to handle paging. Should go through All your friends, and let user decide how far back to look (tweet like count)
    '''

    friends = api.request('friends/list', {'count': 200})
    my_likes = api.request('favorites/list', {'count': 200})

    # Extract user id's from friends list, get user id's from liked tweets
    friends_ids = [friend['id'] for friend in friends]
    liked_tweet_user_ids = [tweet['user']['id']
                            for tweet in my_likes]

    # Based on your current likes, get the users who aren't in your recent 200 likes.
    users_not_interact = list(set(friends_ids) - set(liked_tweet_user_ids))

    user_list = []
    count = 0
    for f in friends:
        if f['id'] in users_not_interact:
            user_dict = {'name': f['screen_name'], 'id': f['id'],
                         'img': f['profile_image_url_https'], 'description': f['description']}
            user_list.append(user_dict)
            count += 1

    pprint.pprint(user_list)
    return (user_list)


unfollow_by_likes()
