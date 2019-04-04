import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
// import App from './App'

class AlbumSearch extends Component {
  constructor(props) {
    super(props)
    this.state = { name: "", password: "" }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateUser = this.props.updateUser.bind(this);
  }

  handleLoginSubmit(event, inputName, inputPass, component) {
    event.preventDefault();

    axios
      .post('/login', {
        username: inputName,
        password: inputPass
      })
      .then(response => {
        console.log('login response: ')
        console.log(response)
        if (response.status === 200) {
          console.log(response.data.username)
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          })
        }
      }).catch(error => {
        console.log('login error: ')
        console.log(error);

      })
  }


  render() {
    return (
      <form onSubmit={(event) => this.handleAlbumSearch(event, this.state.name, this.state.password, this.props.component)}>
        <div class="form-group">
          <h1>Search for an album to start reviewing</h1>
          <label>
            Album Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
            Artist:
          <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Search" />
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

export default AlbumSearch;