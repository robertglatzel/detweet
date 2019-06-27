import React from 'react';

const Tweet = (props) => {
	return (
		<div className="column centered">
			<div id={props.id} className="tweet ui segment hvr-float-shadow">
				<div className="top">
					<p>You tweeted:</p>
				</div>
				<button onClick={props.keep} className="keep-tweet ui button violet hvr-pulse-grow" title="Keep me!">
					Keep me
				</button>
				<p className="tweet-text">{props.text}</p>
			</div>
		</div>
	);
};

export default Tweet;
