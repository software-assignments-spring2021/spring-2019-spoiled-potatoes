import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
// import App from './App'

const apiKey = process.env.REACT_ALBUM_API_KEY;

class AlbumSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {  name: "", artist:"" }
    this.handleAlbumSearch = this.handleAlbumSearch.bind(this);
  }
  
  

  handleAlbumSearch(event, inputName, inputArtist) {
    event.preventDefault();

    let searchMethod = "";
    let paramObj ={};
    /*
    support 3 different methods:

    - artist.gettopalbums     to search for albums from an artist
        paramObj = {
            method: searchMethod,
            artist: inputArtist,
            key: apiKey,
            format: "json",
        }
    - album.getinfo           to search for just an album using artist name and album name
        paramObj = {
            method: searchMethod,
            key: apiKey,
            artist: inputArtist,
            album: inputName,
            format: "json",
        }
    - album.search            to free search an album just by name
        paramObj = {
            method: searchMethod,
            album: inputName,
            key: apiKey,
            format: "json",
        }
    
    method var will be reassigned based on parameters input by user

    */
    switch(inputName, inputArtist){
        
    }
    axios
      .get('http://ws.audioscrobbler.com/2.0/', {
        params: paramObj
      })
      .then(response => {
        console.log('login response: ')
        console.log(response)
        if (response.status === 200) {
          console.log(response)
          // update App.js state
        }
      }).catch(error => {
        console.log('login error: ')
        console.log(error);

      })
  }


  render() {
    return (
      <form onSubmit={(event) => this.handleAlbumSearch(event, this.state.name, this.state.artist)}>
        <div class="form-group">
          <h1>Search for an album to start reviewing</h1>
          <label>
            Album Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
            Artist:
          <input type="text" name="artist" value={this.state.artist} onChange={this.handleInputChange} />
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