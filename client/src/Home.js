import React, { Component } from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
import AlbumSearch from './AlbumSearch';
import './AddAPI';
import DummyListComponent from './DummyListComponent'
// import AddAPI from './AddAPI';

class Home extends Component {

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
            <Row><DummyListComponent /></Row>
            <Row><Button variant="primary">More...</Button></Row>
          </Col>
          <Col>
            <Row><h3>Trending</h3></Row>
            <Row><DummyListComponent /></Row>
            <Row><Button variant="primary">More...</Button></Row>
          </Col>
          <Col>
            <Row><h3>Last Added</h3></Row>
            <Row><DummyListComponent /></Row>
            <Row><Button variant="primary">More...</Button></Row>
          </Col>
          <Col>
            <Row><h3>Random</h3></Row>
            <Row><DummyListComponent /></Row>
            <Row><Button variant="primary">More...</Button></Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
