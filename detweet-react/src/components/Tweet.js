import React, { Component } from 'react';

class Tweet extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="column centered">
                <div id="tweetId" className="tweet ui segment hvr-float-shadow">
                    <div className="top">
                        <p>You tweeted:</p>
                    </div>
                    <button className="keep-tweet ui button violet hvr-pulse-grow" title="Keep me!">Keep me</button>
                    <p className="tweet-text">tweetText</p>
                </div>
            </div>
        );
    }
}
 
export default Tweet;