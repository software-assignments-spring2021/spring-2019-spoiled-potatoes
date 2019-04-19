import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import {Modal, Button } from 'react-bootstrap';
// import App from './App'



class AlbumSearch extends Component {
  constructor(props) {
    super(props)
    this.state = { name: "", artist: "", results: [], show: false, }
    this.handleAlbumSearch = this.handleAlbumSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchDB = this.searchDB.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);


  }

  handleClose(obj) {
    this.setState({ show: false });
    this.props.history.push(obj);
  }

  handleShow() {
    this.setState({ show: true });
  }

  searchDB(mbid, albumName, resObj) {
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
          this.handleShow();
          //sleep(1000);
        }
      } else {
        console.log('failure');
      }
    });
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
    axios
      .get('/get_lastfm', {
        params: paramObj
      })
      .then(response => {
        if (response.status === 200) {
          // update App.js state
          console.log(response.data);
          if (paramObj['method'] === "album.getinfo") {
            this.setState({
              results: [<li><Link onClick={() => this.searchDB(response.data.album.mbid, response.data.album.name,
                {
                  pathname: "/album/" + response.data.album.name,
                  state: response.data.album,
                  username: this.props.username
                })}>{response.data.album.name}
              </Link></li>]
            });
          } else if (paramObj['method'] === "artist.gettopalbums") {
            this.setState({
              results: response.data.topalbums.album.map(
                item => <li><Link to={{
                  //pathname: "/album/" + item['name'],
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
                  //pathname: "/album/" + item['name'],
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

  render() {
    return (
      <>
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
      <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={this.handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
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