def delete_tweets(twitter_req_obj, tweet_id_list):
    """
    Deletes all flagged tweets
    """
    for tweet_id in tweet_id_list:
        try:
            tweet_id = int(tweet_id)
            endpoint_build = "statuses/destroy/{}.json".format(tweet_id)
            resp = twitter_req_obj.post(endpoint_build).json()
        except:
            print("Fail")
            return "fail"
    print("All flagged tweets have been deleted.")
    return "success"
