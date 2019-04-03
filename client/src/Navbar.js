
import React, { Component } from 'react';
// import Cookies from 'js-cookie';
import './App.css';

class Navbar extends Component {

  render() {
    return (
        <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
          <a class="navbar-brand" href="/">Trading</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            <li class="nav-item">
            {!this.props.component.state.username ?
              <a class="nav-item nav-link" href="/" onClick={(e) => this.props.renderLogin(e)}>Login</a> 
            : null}
            </li>
            <li class="nav-item">
            {!this.props.component.state.username ?
              <a class="nav-item nav-link" href="/" onClick={(e) => this.props.renderRegister(e)}>Register</a>
            : null}
            </li>
            <li class="nav-item">
            {this.props.component.state.username ?
            <a class="nav-item nav-link" href="/" onClick={(e) => this.props.logout(e)}>Logout</a>
            : null }
            </li>
            </div>
          </div>
        </nav>
    
    );
  }
}

export default Navbar;

