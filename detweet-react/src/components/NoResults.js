import React from 'react';

const NoResults = (props) => {
	return (
		<div id="no-results-div" className="instructions">
			<p>Looks like we didn't find any matches. Want to try again?</p>
			<button id="search-again-nr" onClick={props.search} className="ui basic button centered button-style">
				Search Again
			</button>
		</div>
	);
};

export default NoResults;
