import React from 'react';
import UserInfo from './UserInfo';
import TweetAndUser from './TweetAndUser';
import { Route, Link, Switch } from 'react-router-dom';

const Select = ({ match, userType, userInfo }) => {
	return (
		<div>
			<UserInfo user={userInfo} />
			<Switch>
				<Route
					exact
					path={match.url}
					render={() => (
						<div id="user-or-tweet" className="instructions">
							<p>
								There are two ways of using deTweet. <br />
								If you would like to use deTweet to clean up your tweets, select Tweets. <br />
								If you would like to unfollow users you don't interact with, select Users.
							</p>
							<Link to={`${match.url}/tweets`}>
								<button
									id="tweet-select-button"
									type="submit"
									className="ui basic button centered button-style"
								>
									Tweets
								</button>
							</Link>
							<Link to={`${match.url}/users`}>
								<button
									id="user-select-button"
									type="submit"
									className="ui basic button centered button-style"
								>
									Users
								</button>
							</Link>
						</div>
					)}
				/>
				{/* Path takes on the name of the selection made with the link button */}
				<Route
					path={`${match.url}/:selectionName`}
					render={({ match }) => <TweetAndUser userType={userType} match={match} />}
				/>
			</Switch>
		</div>
	);
};

export default Select;
