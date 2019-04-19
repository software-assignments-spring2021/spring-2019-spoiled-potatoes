import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Navbar from './Navbar'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: null,
      login: false,
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
            login: false,
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
      if (this.state.login) {
        return (
          <div class="container">
            <Navbar logout={this.logout.bind(this)} renderRegister={this.renderRegister.bind(this)} renderLogin={this.renderLogin.bind(this)} component={this} />
            <div class="container"><Login updateUser={this.updateUser} /></div>
          </div>
        );
      } else if (this.state.register) {
        return (
          <div class="container">
            <Navbar logout={this.logout.bind(this)} renderRegister={this.renderRegister.bind(this)} renderLogin={this.renderLogin.bind(this)} component={this} />
            <div class="container"><Register updateUser={this.updateUser} /></div>
          </div>
        );
      } else {
        return (
          <div class="container">
            <Navbar logout={this.logout.bind(this)} renderRegister={this.renderRegister.bind(this)} renderLogin={this.renderLogin.bind(this)} component={this} />
            <div class="container"><Home username={this.state.username} /></div>
          </div>
        );
      }
    }
    else {
      return (
        null
      );
    }
  }
}

export default App;
