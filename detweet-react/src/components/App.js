import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './Nav/Nav';
import Login from './Login/Login';
import Footer from './Footer/Footer';
import Select from './Select';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			real: null,
			isLogged: false,
			user: { username: '', description: '' }
		};
		this.login = this.login.bind(this);
	}

	async login(){
		// Login used for real user
		// Retrieve data from twitter api, pass it in here.
		let response = await axios.get('http://localhost:5000/login');
		console.log(response);
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
				<div id="content-wrap">
					<Nav />
					<Switch>
						<Route exact path="/" render={() => <Login login={this.login} dummy={this.dLogin} />} />
						<Route
							path="/select"
							render={({ match }) => (
								<Select userType={this.state.real} userInfo={this.state.user} match={match} />
							)}
						/>
					</Switch>
					<Footer />
				</div>
			</div>
		)
	}
}



export default App;