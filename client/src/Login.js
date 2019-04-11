import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
// import App from './App'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { name: "", password: "" }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateUser = this.props.updateUser.bind(this);
  }

  handleLoginSubmit(event) {
    event.preventDefault();

    axios
      .post('/login', {
        username: this.state.name,
        password: this.state.password
      })
      .then(response => {
        console.log('login response: ')
        console.log(response)
        if (response.data.loggedIn === true) {
          console.log(response.data.username)
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          })
        } else {
          alert('Wrong username or password. Try again.')
        }
      }).catch(error => {
        console.log('login error: ')
        console.log(error);
        alert('Error logging in. Try again.')
      })
  }


  render() {
    return (
      <form onSubmit={(event) => this.handleLoginSubmit(event)}>
        <div class="form-group">
          <h1>Login</h1>
          <label>
            Username:
          <input type="text" name="name" required value={this.state.name} onChange={this.handleInputChange} />
            Password:
          <input type="password" name="password" required value={this.state.password} onChange={this.handleInputChange} />
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
