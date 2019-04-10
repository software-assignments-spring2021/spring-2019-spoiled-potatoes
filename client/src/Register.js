
import React, { Component } from 'react';
import axios from 'axios';
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

    axios.post('/register', {
      username: inputName,
      email: inputEmail,
      password: inputPass
    })
      .then(response => {
        console.log(response)
        if (response.data.loggedIn) {
          console.log('successful signup')
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          })
        } else if (!response.data.registration) {
          console.log('username already taken')
        }
      }).catch(error => {
        console.log('signup error: ')
        console.log(error)
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

