import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import logo from './logo.svg';
//import './App.css';
import { Image, Modal, Button, ListGroup} from 'react-bootstrap';
// import App from './App'
import {
  withRouter
} from 'react-router-dom';

class lastfmIter {
  constructor(chunk, component) {
    this.component = component;
    this.chunk = chunk;
    this.res = 0;
    this.index = 1;
  }

  hasNext(total) {
    return (this.res + this.chunk <= total);
  }
  hasPrev() {
    return (this.index - 1 > 0);
  }

  next() {
    console.log('in next');
    console.log(this.component.state.searchParams);
    this.res += this.chunk;
    this.component.state.searchParams['page'] = this.index + 1;//state.searchParams['page'] = this.index++;
    console.log(this.component.state.searchParams);
    this.index++;
    this.component.buildList(this.component.state.searchParams);
  }

  prev() {
    this.res -= this.chunk;
    this.component.state.searchParams['page'] = this.index - 1;
    this.index--;
    this.component.buildList(this.component.state.searchParams);
  }
}

class AlbumSearch extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { searchType: "", name: "", artist: "", results: [], show: false, add: {}, modalFill: "", searchParams: {}, currTotal: 0, }
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

  handleSubmit() {
    
    axios.post('/add_album', {
      name: this.state.add.state.name,
      artist: this.state.searchType === "Artist" ? this.state.add.state.artist.name : this.state.add.state.artist,
      mbid: this.state.add.state.mbid,
      tags: this.state.searchType === "Both" ? this.state.add.state.tags.tag.map((item) => item.name) : this.state.add.state.tags,
      image: this.state.add.state.image,
      username: this.props.username,
    }).then((response) => {
      console.log(response.data);
      console.log(response.data);
      this.handleClose();
      const resObj = this.state.add;
      resObj.state['db_id'] = response.data._id;
      console.log(resObj);
      this.props.history.push(resObj);
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
          console.log(resObj);
          console.log(resObj.pathname);
          console.log(this.props.history);
          this.props.history.push(resObj);
        } else {
          console.log(resObj);
          
          this.setState({ add: resObj, modalFill: resObj.state.name })
          this.handleShow();
        }
      } else {
        console.log('failure');
      }
    });
  }

  buildList(paramObj) {
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
            this.setState({searchType: "Both"});
            //console.log(response.data.album);
            this.setState({
              results: [<ListGroup.Item action onClick={() => this.searchDB(response.data.album.mbid, response.data.album.name,
                {
                  pathname: "/album/" + response.data.album.name,
                  state: response.data.album,
                  username: this.props.username
                }
              )}> 
                <div class="media text-muted pt-3">
                  <img alt="" class="mr-2 rounded" src={response.data.album['image'][1]['#text']} width={"64px"} height={"64px"}/>
                  <div class="media-body pb-3 mb-0 small lh-125 border-gray">
                    <div class="d-flex justify-content-between align-items-center w-100">
                      <strong class="text-gray-dark">{response.data.album.name} - {response.data.album.artist}</strong>
                    </div>
                  </div>
                </div>
                </ListGroup.Item>]
            });
          } else if (paramObj['method'] === "artist.gettopalbums") {
            //console.log(response)
            this.setState({searchType: "Artist"});
            this.setState({ currTotal: parseInt(response.data.topalbums['@attr'].totalPages) });
            this.setState({
              results: response.data.topalbums.album.map(
                item => 
                
                <ListGroup.Item action onClick={() => this.searchDB(item.mbid, item.name, {
                  pathname: "/album/" + item['name'],
                  state: item,
                  username: this.props.username
                })} >
                <div class="media text-muted pt-3">
                  <img alt="" class="mr-2 rounded" src={item['image'][1]['#text']} width={"64px"} height={"64px"}/>
                  <div class="media-body pb-3 mb-0 small lh-125 border-gray">
                    <div class="d-flex justify-content-between align-items-center w-100">
                      <strong class="text-gray-dark">{item['name']} - {item['artist']['name']}</strong>
                    </div>
                  </div>
                </div>
                </ListGroup.Item>
              )
            });
          } else {
            this.setState({searchType: "Album"});
            this.setState({currTotal: parseInt(response.data.results['opensearch:totalResults'])});
            this.setState({
              results: response.data.results.albummatches.album.map(
                item => 
                <ListGroup.Item action onClick={() => this.searchDB(item.mbid, item.name, {
                  pathname: "/album/" + item['name'],
                  state: item,
                  username: this.props.username
                })} >
                <div class="media text-muted pt-3">
                  <img alt="" class="mr-2 rounded" src={item['image'][1]['#text']}  width={"64px"} height={"64px"}/>
                  <div class="media-body pb-3 mb-0 small lh-125 border-gray">
                    <div class="d-flex justify-content-between align-items-center w-100">
                      <strong class="text-gray-dark">{item['name']} - {item['artist']}</strong>
                    </div>
                  </div>
                </div>
                </ListGroup.Item>
                /*
                <ListGroup.Item action onClick={() => this.searchDB(item.mbid, item.name, {
                  pathname: "/album/" + item['name'],
                  state: item,
                  username: this.props.username
                })} ><Image src={item['image'][0]['text']} thumbnail />{item['name']} - {item['artist']}
                </ListGroup.Item>
                */
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
    this.setState({ searchParams: paramObj });
    this.buildList(paramObj);
  }

  nextList(e) {
    e.preventDefault();
    console.log(this.state.currTotal)
    this.lastfmIter.next();
  }

  prevList(e) {
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
          <div class="my-3 p-3 bg-gray rounded box-shadow">
          {this.state.results}
          </div>
          <ListGroup></ListGroup>
          {this.lastfmIter.hasPrev() ? <button onClick={(e) => this.prevList(e)}>prev</button> : null}
          {this.lastfmIter.hasNext(this.state.currTotal) ? <button onClick={(e) => this.nextList(e)}>next</button> : null}

        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Start the discussion about {this.state.modalFill}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Looks like {this.state.modalFill} hasn't been reviewed yet. {this.props.username ? "Hit 'submit' to add it!" : "Register or Log in to add reviews!"}</Modal.Body>
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