import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'
// import App from './App'

class lastfmIter {
  constructor(chunk, component){
    this.component = component;
    this.chunk = chunk;
    this.res = 0;
    this.index = 1;
  }

  hasNext(total){
    return (this.res + this.chunk <= total);
  }
  hasPrev(total){
    return (this.index - 1 > 1);
  }

  next(){
    this.res += this.chunk;
    this.component.state.searchParams['page'] = this.index++;
    this.buildList(this.component.state.searchParams);
  }

  prev(){
    this.res -= this.chunk;
    this.component.state.searchParams['page'] = this.index--;
    this.buildList(this.component.state.searchParams);
  }

}

class AlbumSearch extends Component {
  constructor(props) {
    super(props)
    this.state = { name: "", artist: "", results: [], searchParams: {} }
    this.handleAlbumSearch = this.handleAlbumSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchDB = this.searchDB.bind(this);
    this.buildList = this.buildList.bind(this);
    this.lastfmIter = lastfmIter(50, this);
  }


  searchDB(mbid, albumName) {
    let paramObj = {};
    if (mbid) {
      paramObj = {
        mbid: mbid
      }
    } else {
      paramObj = {
        name: albumName
      }
    }
    console.log(paramObj);
    axios.get('/search_album', { params: paramObj }).then(response => {
      if (response.status) {
        if (response.data.docs.length) {
          console.log('albums found, ready to vote?');
        } else {
          console.log('album not found, ')
        }
      } else {
        console.log('failure');
      }
    });
  }

  buildList(paramObj){
    axios
      .get('/get_lastfm', {
        params: paramObj
      })
      .then(response => {
        if (response.status === 200) {
          response.
          // update App.js state
          console.log(response.data);
          if (paramObj['method'] === "album.getinfo") {
            this.setState({
              results: [<li><Link to={{
                pathname: "/album/" + response.data.album.name,
                state: response.data.album,
                username: this.props.username
              }} onClick={() => this.searchDB(response.data.album.mbid)}>{response.data.album.name}
              </Link></li>]
            });
          } else if (paramObj['method'] === "artist.gettopalbums") {
            this.setState({
              results: response.data.topalbums.album.map(
                item => <li><Link to={{
                  pathname: "/album/" + item['name'],
                  state: item,
                  username: this.props.username
                }} onClick={() => this.searchDB(item.mbid, item.name)}>{item['name']}
                </Link></li>
              )
            });
          } else {
            this.setState({
              results: response.data.results.albummatches.album.map(
                item => <li><Link to={{
                  pathname: "/album/" + item['name'],
                  state: item,
                  username: this.props.username
                }} onClick={() => this.searchDB(item.mbid, item.name)}>{item['name']}
                </Link></li>
              )
            });
          }
        }
      }).catch(error => {
        console.log('album search error: ');
        console.log(error);

      })
  }

  handleAlbumSearch(event, inputName, inputArtist) {
    event.preventDefault();

    let paramObj = {};

    if (inputName && inputArtist) {
      paramObj = {
        method: "album.getinfo",
        artist: inputArtist,
        album: inputName,
        format: "json",
      }
    } else if (inputArtist) {
      paramObj = {
        method: "artist.gettopalbums",
        artist: inputArtist,
        format: "json",
      }
    } else {
      paramObj = {
        method: "album.search",
        album: inputName,
        format: "json",
      }
    }
    console.log(paramObj);
    this.setState({searchParams: paramObj});
    this.buildList(paramObj);
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