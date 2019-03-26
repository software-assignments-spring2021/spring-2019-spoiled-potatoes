import React, { Component } from 'react';
import Cookies from 'js-cookie';
import logo from './logo.svg';
import './App.css';
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Navbar from './Navbar'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { username: Cookies.get('username'), login: true, register: false }
  }

  renderLogin(e) {
    e.preventDefault();
    //this.set
    //return <Login component={this} />;
    //this.setState();
    this.setState(() => {
      return {login:true, register: false};
    });
  }

  renderRegister(e) {
    e.preventDefault();
    //this.set
    //return <Login component={this} />;
    //this.setState({login:false, register: true});
    this.setState(() => {
      return {login:false, register: true};
    });
  }
  logout(e){
    e.preventDefault();
    fetch('/fail', { credentials : 'same-origin' }).then((res) => {
      console.log(res.text);
      res.json().then( (data) => {
        console.log(data.user);
        Cookies.set('username','');
        //this.props.component.setState({ username: Cookies.get('username') });
        this.setState(() => {
          return { username: Cookies.get('username') };
        });
      })
    })
  }
  render() {
    //const isLoggedIn = this.state.loggedIn;
    console.log(this.state.username)
    return (
      <div class="container">
        <Navbar logout={this.logout.bind(this)} renderRegister={this.renderRegister.bind(this)} renderLogin={this.renderLogin.bind(this)} component={this}/>
        { this.state.username ? (<div class="container"><Home component={this}/></div>) : (
          <div class="container">
           { this.state.register ? <Register component={this} /> : null}
           { this.state.login ? <Login component={this} /> : null}
        </div>
        )}
      </div>
    );
  }
}

export default App;

/*
          <div>
            <Register component={this} />
            <Login component={this} />
          </div>
*/