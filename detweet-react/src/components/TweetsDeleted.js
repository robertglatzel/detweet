import React from 'react';

const TweetsDeleted = (props) => {
	return (
		<div id="search-again-div" className="instructions">
			<p>
				Thank you for using <strong>deTweet</strong>! Your tweets have been deTweeted! Please give your profile
				a moment to register the changes.
			</p>
			<button id="search-again-r" className="ui basic button centered button-style" onClick={props.searchAgain}>
				Search Again
			</button>
			<a href="https://twitter.com/intent/tweet?via=detweet_app&text=Thank%20you%20deTweet%20for%20helping%20me%20clean%20up%20my%20twitter%20account%21%20%3C3&hashtags=detweet%2Ccleanse%2Capp">
				<button id="send-tweet" className="ui basic button centered">
					Tweet about us!
				</button>
			</a>
		</div>
	);
};

export default TweetsDeleted;
