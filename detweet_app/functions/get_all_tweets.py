def get_all_tweets(twitter):
    ''' Tries to grab 3200 tweets from a user's timeline

        Args:
            twitter:
                object containing tokens to make requests
                against the Twitter API

        Returns:
            list: list of tweet objects from a user's timeline
    '''
    global_tweet_list = []
    last_tweet_id = None
    payload = {
        'count': 200,
        'tweet_mode': 'extended',
        'include_rts': 1,
    }
    for i in range(16):
        if last_tweet_id is not None:
            payload['max_id'] = last_tweet_id - 1
        tweet_list = twitter.get(
            'statuses/user_timeline.json',
            params=payload
            ).json()
        if len(tweet_list) == 0:
            print('All tweets have been retrieved')
            break
        last_tweet_id = tweet_list[-1].get('id')
        global_tweet_list += tweet_list

    return global_tweet_list
