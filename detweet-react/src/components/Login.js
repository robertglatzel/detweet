import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Login = (props) => {
	return (
		<div>
			<Logo />
			<div id="sign-in" className="instructions">
				<p className="ui center aligned">
					Welcome to <strong>deTweet</strong>, a Twitter application that cleans your profile of unwanted
					tweets by filtering your tweets against a database of flagged words. We make it easy for you to
					review and remove problematic tweets with the click of a button. <br /> <br />
					Sign in below to get started, or login with a dummy profile to check out deTweet's features!
				</p>
				<Link to="/select">
					<button id="login-button" className="ui basic button centered" onClick={props.login}>
						<i className="twitter icon" />
						<p>Sign in with Twitter</p>
					</button>
				</Link>
				<br />
				<Link to="/select">
					<button id="dummy-button" className="ui basic button centered" onClick={props.dummy}>
						<i className="twitter icon" />
						<p>Dummy Profile</p>
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Login;
