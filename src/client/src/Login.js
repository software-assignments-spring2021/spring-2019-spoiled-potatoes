import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import App from './App'

class Login extends Component {
  
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(inputName) => this.inputName = inputName} />
          Password:
          <input type="password" ref={(inputPass) => this.inputPass = inputPass} />
        </label>
        <input type="submit" value="Submit" />

      </form> 
    );
  }
}

export default Login;

/*
this goes between ul w/ class="navbar-nav ml-auto" in body

                            {{#if username}}
                            <li class="nav-item">
                                Welcome, {{username}}
                            </li>
                            {{else}}
                            <li class="nav-item">
                                <a class="nav-link" href="/register">Register</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/login">Login</a>
                            </li>
                            {{/if}}
*/