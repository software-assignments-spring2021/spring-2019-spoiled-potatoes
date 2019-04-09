import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
// import App from './App'



class AlbumSearch extends Component {
  constructor(props) {
    super(props)
    this.apiKey = process.env.REACT_APP_ALBUM_API_KEY;
    this.state = {  name: "", artist:"",results:[] }
    this.handleAlbumSearch = this.handleAlbumSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchDB = this.searchDB.bind(this);
  }
  

  searchDB(mbid, albumName){
    axios.get('/search_album',{params: {mbid: mbid, name: albumName}}).then(response => {
      if (response.status){
        if (response.data.docs.length) {
          console.log(mbid);
          console.log(response.data.docs);
          console.log('albums found, ready to vote?');
        } else {
          console.log('album not found, ')
        }
      } else {
        console.log('failure');
      }
    });
  }
  

  handleAlbumSearch(event, inputName, inputArtist) {
    event.preventDefault();

    let paramObj ={};

    if (inputName && inputArtist) {
      paramObj = {
        method: "album.getinfo",
        api_key: this.apiKey,
        artist: inputArtist,
        album: inputName,
        format: "json",
      }
    } else if (inputArtist) {
      paramObj = {
        method: "artist.gettopalbums",
        artist: inputArtist,
        api_key: this.apiKey,
        format: "json",
    }
    } else {
      paramObj = {
        method: "album.search",
        album: inputName,
        api_key: this.apiKey,
        format: "json",
      }
    }
    console.log(paramObj);
    axios
      .get('http://ws.audioscrobbler.com/2.0/', {
        params: paramObj
      })
      .then(response => {
        if (response.status === 200) {
          // update App.js state
          console.log(response.data);
          if (paramObj['method'] === "album.getinfo"){
            this.setState({
              results: [<li onClick={() => this.searchDB(response.data.album.mbid)}>{response.data.album.name}</li>]
            });
          } else  {
            this.setState({
              results: response.data.topalbums.album.map(item => <li onClick={() => this.searchDB(item.mbid)}>{item['name']}</li>)
            });
          }
        }
      }).catch(error => {
        console.log('album search error: ');
        console.log(error);

      })
  }


  render() {
    return (
      <div>
      <form onSubmit={(event) => this.handleAlbumSearch(event, this.state.name, this.state.artist)}>
        <div class="form-group">
          <h1>Search for an album to start reviewing</h1>
          <label>
            Album Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
            Artist:
          <input type="text" name="artist" value={this.state.artist} onChange={this.handleInputChange} />
          </label>
          <input type="submit" disabled={!(this.state.name || this.state.artist)} value="Search" />
        </div>
      </form>
      <ul>{this.state.results}</ul>
      </div>
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