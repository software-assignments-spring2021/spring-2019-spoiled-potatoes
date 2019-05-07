import React, { Component } from 'react';
import { Container, Carousel, Row } from 'react-bootstrap';
import axios from 'axios';
// import logo from './logo.svg';
//import './App.css';
import AlbumSearch from './AlbumSearch';
import AlbumListComponent from './AlbumListComponent';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      random: [],
      popular: [],
      last_added: [],
      most_liked: [],
      trending: [],
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.getLists = this.getLists.bind(this)
    this.updateScore = this.updateScore.bind(this)
    this.updateScoreInList = this.updateScoreInList.bind(this)
  }

  componentWillMount() {
    this.getLists()
  }

  getLists() {
    axios.get('/get_random').then(response => {
      console.log('component will mount response');
      console.log(response.data);
      var test = response.data
      this.setState({
        random: test
      });
    })
    axios.get('/get_most_popular').then(response => {
      console.log('component will mount response');
      console.log(response.data);
      let test = response.data
      this.setState({
        popular: test
      });
    })
    axios.get('/get_last_added').then(response => {
      console.log('component will mount response');
      console.log(response.data);
      let test = response.data
      this.setState({
        last_added: test
      });
    })
    axios.get('/get_most_liked').then(response => {
      console.log('component will mount response');
      console.log(response.data);
      let test = response.data
      this.setState({
        most_liked: test
      });
    })
    axios.get('/get_trending').then(response => {
      console.log('component will mount response');
      console.log(response.data);
      let test = response.data
      this.setState({
        trending: test
      });
    })
  }

  updateScore(albumId, newScore) {
    this.updateScoreInList(albumId, this.state.random, newScore)
    this.updateScoreInList(albumId, this.state.popular, newScore)
    this.updateScoreInList(albumId, this.state.last_added, newScore)
    this.updateScoreInList(albumId, this.state.most_liked, newScore)
    this.updateScoreInList(albumId, this.state.trending, newScore)
    this.setState(this.state)
  }

  updateScoreInList(albumId, list, newScore) {
    for (const albumIndex in list) {
      if (list.hasOwnProperty(albumIndex)) {
        const album = list[albumIndex]
        if (album._id === albumId) {
          album.score = newScore
        }
      }
    }
  }

  render() {
    console.log(this.props.username)

    return (
      <Container >
        <div class="jumbotron-home jumbotron p-4 p-md-5 text-white rounded bg-dark">
          <h1 class="display-4 font-italic">Welcome to Spoiled Potatoes{this.props.username ? ', ' + this.props.username : null}!</h1>
          <p class="lead my-3">
            Review and explore more music!
          </p>
        </div>
        <AlbumSearch appComponent={this.props.appComponent} username={this.props.username} />
        <Carousel>
          <Carousel.Item>
            <Row className="justify-content-md-center"><h3>Most Popular</h3></Row>
            <Row className="justify-content-md-center">
              <AlbumListComponent albums={this.state.popular.slice(0,1).concat(this.state.popular.slice(2,3))} username={this.props.username} updateScore={this.updateScore} />
              <AlbumListComponent albums={this.state.popular.slice(1,2).concat(this.state.popular.slice(3,4))} username={this.props.username} updateScore={this.updateScore} />
            </Row>
            <Row>.</Row>
            <Row>.</Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row className="justify-content-md-center"><h3>Most Liked</h3></Row>
            <Row className="justify-content-md-center">
              <AlbumListComponent albums={this.state.most_liked.slice(0,1).concat(this.state.most_liked.slice(2,3))} username={this.props.username} updateScore={this.updateScore} />
              <AlbumListComponent albums={this.state.most_liked.slice(1,2).concat(this.state.most_liked.slice(3,4))} username={this.props.username} updateScore={this.updateScore} />
            </Row>
            <Row>.</Row>
            <Row>.</Row>
            </Carousel.Item>
          <Carousel.Item>
            <Row className="justify-content-md-center"><h3>Trending</h3></Row>
            <Row className="justify-content-md-center">
              <AlbumListComponent albums={this.state.trending.slice(0,1).concat(this.state.trending.slice(2,3))} username={this.props.username} updateScore={this.updateScore} />
              <AlbumListComponent albums={this.state.trending.slice(1,2).concat(this.state.trending.slice(3,4))} username={this.props.username} updateScore={this.updateScore} />
            </Row>
            <Row>.</Row>
            <Row>.</Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row className="justify-content-md-center"><h3>Last Added</h3></Row>
            <Row className="justify-content-md-center">
              <AlbumListComponent albums={this.state.last_added.slice(0,1).concat(this.state.last_added.slice(2,3))} username={this.props.username} updateScore={this.updateScore} />
              <AlbumListComponent albums={this.state.last_added.slice(1,2).concat(this.state.last_added.slice(3,4))} username={this.props.username} updateScore={this.updateScore} />
            </Row>
            <Row>.</Row>
            <Row>.</Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row className="justify-content-md-center"><h3>Random</h3></Row>
            <Row className="justify-content-md-center">
              <AlbumListComponent albums={this.state.random.slice(0,1).concat(this.state.random.slice(2,3))} username={this.props.username} updateScore={this.updateScore} />
              <AlbumListComponent albums={this.state.random.slice(1,2).concat(this.state.random.slice(3,4))} username={this.props.username} updateScore={this.updateScore} />
            </Row>
            <Row>.</Row>
            <Row>.</Row>
          </Carousel.Item>
        </Carousel>
      </Container>
    );
  }
}

export default Home;
