
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
              username: response.data.username,
              register: false
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
            <input type="text" name="name" placeholder="Username" required value={this.state.name} onChange={this.handleInputChange} />
            <input type="email" name="email" placeholder="Email" required value={this.state.email} onChange={this.handleInputChange} />
            <input type="password" name="pass" placeholder="Password" required value={this.state.pass} onChange={this.handleInputChange} />
            <input type="password" name="confirmPass" placeholder="Confirm Password" required value={this.state.confirmPass} onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Sign Up" />
        </div>
      </form>
    );
  }
}

export default Register;

