import React from 'react';
import LoadingModal from './LoadingModal';

const StartTweets = (props) => {
	return (
		<div id="start-detweet-div" className="instructions">
			<p>
				To begin filtering tweets against <strong>deTweet's</strong> database, please click the start button. Or
				enter a custom search term that you would like to filter against.
			</p>
			<button
				id="start-button"
				type="submit"
				className="ui basic button centered button-style"
				onClick={() => props.startButton(props.userType)}
			>
				Start
			</button>

			<div id="selection-toggle" className="ui slider checkbox">
				<input type="checkbox" onClick={props.searchToggle} />
				<label />
			</div>
			<div id="search-box" className="ui input">
				<input
					type="text"
					value={props.searchTerm}
					onChange={props.getValue}
					placeholder="Search..."
					disabled={props.disabledSearch}
				/>
			</div>
		</div>
	);
};

export default StartTweets;
