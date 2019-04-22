import React, { Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import {Modal, Button } from 'react-bootstrap';
// import App from './App'
import {
  withRouter
} from 'react-router-dom';

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
  hasPrev(){
    return (this.index - 1 > 0);
  }

  next(){
    console.log('in next');
    console.log(this.component.state.searchParams);
    this.res += this.chunk;
    this.component.state.searchParams['page'] = this.index + 1;//state.searchParams['page'] = this.index++;
    console.log(this.component.state.searchParams);
    this.index++;
    this.component.buildList(this.component.state.searchParams);
  }

  prev(){
    this.res -= this.chunk;
    this.component.state.searchParams['page'] = this.index - 1;
    this.index--;
    this.component.buildList(this.component.state.searchParams);  }
}

class AlbumSearch extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { name: "", artist: "", results: [], show: false, add: {}, modalFill:"", searchParams: {}, currTotal: 0, }
    this.handleAlbumSearch = this.handleAlbumSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.buildList = this.buildList.bind(this);
    this.searchDB = this.searchDB.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.lastfmIter = new lastfmIter(50, this);
  }

  handleClose() {
    console.log(this);
    this.setState({ show: false });
  }

  handleSubmit(){
    axios.post('/add_album', {
      name: this.state.add.state.name, 
      artist: this.state.add.state.artist, 
      mbid: this.state.add.state.mbid, 
      tags: this.state.add.state.tags, 
      image: this.state.add.state.image,
    }).then(() => {
        this.handleClose();
        this.props.history.push(this.state.add);
      }
    );
  }

  handleShow() {
    this.setState({ show: true });
  }

  searchDB(mbid, albumName, resObj) {
    //const self = this;
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
          //console.log('albums found, ready to vote?');
          //console.log(response.data.docs);
          console.log(resObj)
          resObj.state['db_id'] = response.data.docs[0]._id;
          this.props.history.push(resObj);
        } else {
          this.setState({add: resObj, modalFill: resObj.state.name})
          this.handleShow();
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
          //response.
          // update App.js state
          console.log(response.data);
          
          if (paramObj['method'] === "album.getinfo") {
            this.setState({
              results: [<li onClick={() => this.searchDB(response.data.album.mbid, response.data.album.name,
                {
                  pathname: "/album/" + response.data.album.name,
                  state: response.data.album,
                  username: this.props.username
                }
                )}>{response.data.album.name}
              ></li>]
            });
          } else if (paramObj['method'] === "artist.gettopalbums") {
            this.setState({currTotal: parseInt(response.data.topalbums['@attr'].totalPages)});
            this.setState({
              results: response.data.topalbums.album.map(
                item => <li onClick={() => this.searchDB(item.mbid, item.name, {
                  pathname: "/album/" + item['name'],
                  state: item,
                  username: this.props.username
                }
                )}>{item['name']}
                </li>
              )
            });
          } else {
            this.setState({
              results: response.data.results.albummatches.album.map(
                item => <li onClick={() => this.searchDB(item.mbid, item.name,{
                  pathname: "/album/" + item['name'],
                  state: item,
                  username: this.props.username
                })} >{item['name']}
                </li>
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

  nextList(e){
    e.preventDefault();
    console.log(this.state.currTotal)
    this.lastfmIter.next();
  }

  prevList(e){
    e.preventDefault();
    console.log(this.state.currTotal)
    this.lastfmIter.prev();
  }

  render() {
    //const test = lastfmIter(50,this);
    
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
        {this.lastfmIter.hasPrev() ? <button onClick={(e) => this.prevList(e)}>prev</button> : null}
        {this.lastfmIter.hasNext(this.state.currTotal) ? <button onClick={(e) => this.nextList(e)}>next</button> : null}
        
      </div>
      <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Start the discussion about {this.state.modalFill}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Looks like {this.state.modalFill} hasn't been reviewed yet. {this.props.username ? "Hit 'submit' to add it!":"Register or Log in to add reviews!"}</Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
          Close
          </Button>
          {
            this.props.username ? 
            <Button variant="primary" onClick={this.handleSubmit}>
            Submit
            </Button>
            :
            null
          }
          
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

export default withRouter(AlbumSearch);