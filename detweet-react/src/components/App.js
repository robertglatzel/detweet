import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Nav from './Nav';
import Login from './Login';
import Footer from './Footer';
import TweetPage from './TweetPage';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			real: null,
			isLogged: false,
			user: { username: '', description: '' }
		};
	}

	login = () => {
		// Login used for real user
		// Retrieve data from twitter api, pass it in here.
		this.setState((prevState) => ({
			user: {
				...prevState.user,
				username: 'real user',
				description: 'I am a real user'
			},
			real: true,
			isLogged: true
		}));
	};

	dLogin = () => {
		// login for dummy user.
		// Retrieve data from fake detweet and pass data in here.
		this.setState((prevState) => ({
			user: {
				...prevState.user,
				username: 'Fake user',
				description: 'I am a fake user'
			},
			real: false,
			isLogged: true
		}));
	};

	render() {
		return (
			<div id="page-container">
				<div id="contant-wrap">
					<Nav />
					{!this.state.isLogged ? (
						<Login login={this.login} dummy={this.dLogin} />
					) : (
						<TweetPage userType={this.state.real} userInfo={this.state.user} />
					)}
					<Footer />
				</div>
			</div>
		);
	}
}

export default App;
