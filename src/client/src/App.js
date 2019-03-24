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

  handleSubmit(e, inputName, inputPass, inputEmail, component) {
    e.preventDefault();

    const test = JSON.stringify({
      'username': inputName,
      'password': inputPass,
      'email': inputEmail
    });

    console.log(test);

    fetch('/register', {
      credentials: 'include',
      method: 'POST',
      body: test,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(function response(res) {
      console.log('res', res);
      res.json().then((data) => {
        console.log(data.message);
        console.log(data.registration);

        if (data.registration) {
          console.log('registration success');
          component.setState({ loggedIn: true });
        }
        else {
          console.log('registration failure');
        }
      })
    })
  }

  handleLoginSubmit(event, inputName, inputPass, component) {
    event.preventDefault();

    const userAndPass = JSON.stringify({
      'username': inputName,
      'password': inputPass
    });

    fetch('/login', {
      credentials: 'include',
      method: 'POST',
      body: userAndPass,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(function response(res) {
      console.log('res', res);
      res.json().then((data) => {
        console.log(data.message);
        console.log(data.registration);

        if (data.registration) {
          console.log('login success');
          component.setState({ loggedIn: true });
        }
        else {
          console.log('login failure');
        }
      })
    })
  }

  render() {
    const isLoggedIn = this.state.loggedIn;
    return (
      <div>
        {isLoggedIn ? (<Home />) : (
          <div>
            <Register component={this} handleSubmit={this.handleSubmit} />
            <Login component={this} handleLoginSubmit={this.handleLoginSubmit} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
