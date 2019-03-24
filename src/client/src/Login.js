import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import App from './App'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { name: "", password: "" }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    return (
      <form onSubmit={(event) => this.props.handleLoginSubmit(event, this.state.name, this.state.password, this.props.component)}>
        <h1>Login</h1>
        <label>
          Username:
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
          Password:
          <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />

      </form>
    );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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