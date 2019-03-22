import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Home extends Component {

  componentDidMount(){
      console.log('in component did mount')
      fetch('/home', { credentials : 'same-origin' }).then((res) => {
        console.log(res.text);
        res.json().then( (data) => {
          console.log(data.user)
          //can get user from server ^^^^^^^
        })
      })
}
    

  render() {
    return (
        <div>
            you have registered/logged in
        </div>    
    );
  }
}

export default Home;
