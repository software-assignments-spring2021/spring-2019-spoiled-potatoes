
import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = { name: "", pass: "", confirmPass: "", email: "" }
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

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.pass !== this.state.confirmPass) {
      alert("Passwords don't match");
    } else {
      axios.post('/register', {
        username: this.state.name,
        email: this.state.email,
        password: this.state.pass
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
            alert('Username already taken. Choose a different one.')
          }
        }).catch(error => {
          console.log('signup error: ')
          console.log(error)
          alert('Error registering. Try again.')
        })
    }
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-group">
          <h1>Register</h1>
          <label>
            Username:
          <input type="text" name="name" required value={this.state.name} onChange={this.handleInputChange} />
            Email:
          <input type="email" name="email" required value={this.state.email} onChange={this.handleInputChange} />
            Password:
          <input type="password" name="pass" required value={this.state.pass} onChange={this.handleInputChange} />
            Confirm Password:
          <input type="password" name="confirmPass" required value={this.state.confirmPass} onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default Register;

