import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Navbar from './Navbar'
import { watchFile } from 'fs';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: null,
      login: true,
      register: false
    }

    this.getUser = this.getUser.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentWillMount() {
    this.getUser();
  }

  renderLogin(e) {
    e.preventDefault();
    this.setState(() => {
      return { login: true, register: false };
    });
  }

  renderRegister(e) {
    e.preventDefault();
    this.setState(() => {
      return { login: false, register: true };
    });
  }

  logout(e) {
    e.preventDefault();
    fetch('/logout', { credentials: 'same-origin' }).then((res) => {
      console.log(res.text);
      res.json().then((data) => {
        console.log(data.user);
        this.setState(() => {
          return {
            loggedIn: false,
            username: null,
            login: true,
            register: false
          };
        });
      })
    })
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          readyToRender: true
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
          readyToRender: true
        })
      }
    })
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  render() {
    console.log(this.state.username)
    if (this.state.readyToRender) {
      return (
        <div class="container">
          <Navbar logout={this.logout.bind(this)} renderRegister={this.renderRegister.bind(this)} renderLogin={this.renderLogin.bind(this)} component={this} />
          {this.state.loggedIn ? (<div class="container"><Home username={this.state.username} /></div>) : (
            <div class="container">
              {this.state.register ? <Register updateUser={this.updateUser} /> : null}
              {this.state.login ? <Login updateUser={this.updateUser} /> : null}
            </div>
          )}
        </div>
      );
    }
    else {
      return (
        null
      );
    }
  }
}

export default App;
