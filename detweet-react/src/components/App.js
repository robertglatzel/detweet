import React, { Component } from 'react';
import './App.css';
import Nav from './Nav'
import Login from './Login'
import Footer from './Footer'
import TweetPage from './TweetPage'



class App extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			real: false,
			isLogged: false
		 }
		 this.login.bind(this);
		 this.dLogin.bind(this);
	}

	login(){
		this.setState({real:true, isLogged: true})
	}

	dLogin(){
		this.setState({isLogged:true})
	}

	render() { 
		return (     
		<div className="App" id="page-container">
			<div id="contant-wrap">
				<Nav />
				{!this.state.isLogged ? 
					(<Login login={this.login.bind(this)} dummy={this.dLogin.bind(this)} />) :
					(<TweetPage user={this.state.real} />)
				}
				<Footer />
			</div>
		</div> 
		);
	}
}

export default App;
