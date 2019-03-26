import React, { Component } from 'react';
import Cookies from 'js-cookie';
// import logo from './logo.svg';
import './App.css';
// import App from './App'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { name: "", password: "" }
    this.handleInputChange = this.handleInputChange.bind(this);
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
          Cookies.set('username', data.user.username);
          component.setState({ username: Cookies.get('username') });
        }
        else {
          console.log('login failure');
        }
      })
    })
  }


  render() {
    return (
      <form onSubmit={(event) => this.handleLoginSubmit(event, this.state.name, this.state.password, this.props.component)}>
        <div class="form-group">
        <h1>Login</h1>
        <label>
          Username:
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
          Password:
          <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </div>
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