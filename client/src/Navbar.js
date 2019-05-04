
import React, { Component } from 'react';
// import Cookies from 'js-cookie';
import './App.css';
import { withRouter, Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    const pathname = "/profiles/" + this.props.component.state.username
    return (
      <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <a class="navbar-brand" href="/">Spoiled Potatoes</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <li class="nav-item">
              {!this.props.component.state.loggedIn ?
                <a class="nav-item nav-link" href="/" onClick={(e) => this.props.renderLogin(e)}>Log In</a>
                : null}
            </li>
            <li class="nav-item">
              {!this.props.component.state.loggedIn ?
                <a class="nav-item nav-link" href="/" onClick={(e) => this.props.renderRegister(e)}>Sign Up</a>
                : null}
            </li>
            <li class="nav-item">
              {this.props.component.state.loggedIn ?
                <Link to={pathname} className="nav-item nav-link">Profile</Link>
                : null}
            </li>
            <li class="nav-item">
              {this.props.component.state.loggedIn ?
                <a class="nav-item nav-link" href="/" onClick={(e) => this.props.logout(e)}>Logout</a>
                : null}
            </li>
          </div>
        </div>
      </nav >

    );
  }
}

export default withRouter(Navbar);

