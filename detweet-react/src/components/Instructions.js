import React from 'react';

const Instructions = (props) => {
	/* Strip the extra s so it's usable in the paragraph. */
	let type = '';
	if (props.type === 'users') {
		type = 'user';
	} else {
		type = 'tweet';
	}
	return (
		<div id="instruction-box" className="instructions">
			<p>
				If you see a {type} that you would like to keep, click the 'Keep me' button.<br /> When you're ready to
				remove the {props.type} just click the button below, or search again.
			</p>
			<div className="remove-button">
				<button id="remove-all" className="ui basic button centered button-style" onClick={props.delete}>
					Remove {props.type}
				</button>
				<button id="reset" className="ui basic button button-style" onClick={props.searchAgain}>
					Search Again
				</button>
			</div>
		</div>
	);
};

export default Instructions;
