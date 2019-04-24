import React, { Component } from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import AlbumSearch from './AlbumSearch';
import AlbumListComponent from './AlbumListComponent'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      random:[],
      popular:[],
      last_added:[],
      most_liked:[],
      trending:[],
    }
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount(){
    axios.get('/get_random').then(response => {
      console.log('component will mount response');
      console.log(response.data);
      var test = response.data
      for (var item in test) {
        if (item.name == null || item.artist == null || item.iamge == null) {
          delete test.item
        }
      }
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
  
  render() {
    console.log(this.props.username)

    return (
      <Container>
        <Jumbotron>
          <h1>Welcome to Spoiled Potatoes{this.props.username ? ', ' + this.props.username : null}!</h1>
          <p>
            Review and explore more music!
          </p>
        </Jumbotron>
        <AlbumSearch username={this.props.username} />
        <Row>
          <Col>
            <Row><h3>Most Popular</h3></Row>
            <Row><AlbumListComponent albums={this.state.popular} /></Row>
            <Row><Button variant="primary">More...</Button></Row>
          </Col>
          <Col>
            <Row><h3>Most Liked</h3></Row>
            <Row><AlbumListComponent albums={this.state.most_liked} /></Row>
            <Row><Button variant="primary">More...</Button></Row>
          </Col>
          <Col>
            <Row><h3>Trending</h3></Row>
            <Row><AlbumListComponent albums={this.state.trending} /></Row>
            <Row><Button variant="primary">More...</Button></Row>
          </Col>
          <Col>
            <Row><h3>Last Added</h3></Row>
            <Row><AlbumListComponent albums={this.state.last_added} /></Row>
            <Row><Button variant="primary">More...</Button></Row>
          </Col>
          <Col>
            <Row><h3>Random</h3></Row>
            <Row><AlbumListComponent albums={this.state.random} /></Row>
            <Row><Button variant="primary">More...</Button></Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
