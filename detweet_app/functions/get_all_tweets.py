def get_all_tweets(twitter_req_obj):
    '''
    Grabs 3200 the tweets from the twitter api in their full text form.
    '''
    global_tweet_list = []
    last_tweet_id = None
    payload = {
        'count': 200,
        'include_rts': 1,
        'tweet_mode': 'extended'
    }
    for i in range(16):
        if (last_tweet_id) is not None:
            payload = {
                'max_id': last_tweet_id,
            }
        tweet_list = twitter_req_obj.get(
            'statuses/user_timeline.json',
            params=payload
            ).json()
        last_tweet_id = tweet_list[-1].get('id')
        global_tweet_list += tweet_list

    return global_tweet_list
