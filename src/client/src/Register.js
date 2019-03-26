
import React, { Component } from 'react';
import Cookies from 'js-cookie';
// import logo from './logo.svg';
import './App.css';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = { name: "", pass: "", email: "" }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
          Cookies.set('username', data.user.username);
          component.setState({ username: Cookies.get('username') });
        }
        else {
          console.log('registration failure');
        }
      })
    })
  }


  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e, this.state.name, this.state.pass, this.state.email, this.props.component)}>
      <div class="form-group">
        <h1>Register</h1>
        <label>
          Username:
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
          Email:
          <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
          Password:
          <input type="password" name="pass" value={this.state.pass} onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default Register;

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





