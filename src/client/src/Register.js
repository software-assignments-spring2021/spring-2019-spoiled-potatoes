
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Register extends Component {
    constructor(props){
        super(props)
        this.state = { name:"", pass:"", email:"" }
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
  render() {
    return (
        <form onSubmit={(e) => this.props.handleSubmit(e, this.state.name, this.state.pass, this.state.email, this.props.component)}>
        <h1>Register</h1>
        <label>
          Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
          Email:
          <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
          Password:
          <input type="password" name="pass" value={this.state.pass} onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />

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





