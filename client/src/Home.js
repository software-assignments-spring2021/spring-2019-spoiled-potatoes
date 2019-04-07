import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './AlbumSearch';
import AlbumSearch from './AlbumSearch';
// import AddAPI from './AddAPI';

class Home extends Component {

  render() {
    console.log(this.props.username)
    return (
      <div class="container">
        <h1>Welcome {this.props.username}</h1>
        <AlbumSearch/>
      </div>

    );
  }
}

export default Home;
