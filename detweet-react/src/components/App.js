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
      realLogin: false,
      dummyLogin: false,
      isLogged: false
     }
     this.login.bind(this);
  }

  login(){
    this.setState({realLogin: true, isLogged: true})
    console.log('logged in');
  }

  dummyLogin(){
    this.setState({dummyLogin: true, isLogged:true})
    console.log('Logged in with dummy profile.')
  }

  render() { 
    return (     
    <div className="App">
      <Nav />
      {!this.state.isLogged ? 
        (<Login login={this.login.bind(this)} dummy={this.dummyLogin.bind(this)} />) :
        (<TweetPage />)
      }
      <Footer />
    </div> 
    );
  }
}

export default App;
