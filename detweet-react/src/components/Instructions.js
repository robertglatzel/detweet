import React, { Component } from 'react';

const Instructions = (props) => {
	return (
		<div id="instruction-box" className="instructions">
			<p>
				If you see a tweet that you would like to keep, click the 'Keep me' button.<br /> When you're ready to
				remove the tweets just click the button below, or search again.
			</p>
			<div className="remove-button">
				<button id="remove-all" className="ui basic button centered button-style" onClick={props.delete}>
					Remove Tweets
				</button>
				<button id="reset" className="ui basic button button-style" onClick={props.searchAgain}>
					Search Again
				</button>
			</div>
		</div>
	);
};

export default Instructions;
