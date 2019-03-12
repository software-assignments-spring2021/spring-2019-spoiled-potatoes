import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home'
import Login from './Login'
import Register from './Register'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false }
  }

  handleSubmit(e, inputName, inputPass, inputEmail, component){
    e.preventDefault();

    const test = JSON.stringify({
      "name": inputName,
      "password": inputPass,
      "email": inputEmail
    });

    console.log(test);
    console.log('in handle');

    fetch('/register', {  
      credentials: 'same-origin',
      method: 'post',
      body: test,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(function response(res) {
      res.json().then(function loaded(data) {
        if (data.registration) {
          console.log('registration success');
          component.setState({loggedIn: true});
        } else {
          console.log('registration failure');
        }
      })
    })
    
  }
  render() {
    const isLoggedIn = this.state.loggedIn;
    return (
      <div>
        {isLoggedIn ? (<Home />) : (<Register component={this} handleSubmit={this.handleSubmit}/>)}
      </div>

      

      
    );
  }
}

export default App;
