import React, { Component } from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
import AlbumSearch from './AlbumSearch';
import AlbumListComponent from './AlbumListComponent'

const albums = [
    {name:"Name", artist:"Artist", image:[{'#text': "0", size: "small"},
                                          {'#text': "0", size: "medium"},
                                          {'#text': "0", size: "large"},
                                          {'#text': "https://static1.squarespace.com/static/5755a35501dbae3c6d1ba03e/t/5aa962b371c10bfea1ee9dca/1521050296074/Awaken_My_Love.jpg/120x120", size: "extra large"},
                                          ]
    }
]

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
            <Row><AlbumListComponent albums={albums} /></Row>
            <Row><Button variant="primary">More...</Button></Row>
          </Col>
          <Col>
            <Row><h3>Trending</h3></Row>
            <Row><AlbumListComponent albums={albums} /></Row>
            <Row><Button variant="primary">More...</Button></Row>
          </Col>
          <Col>
            <Row><h3>Last Added</h3></Row>
            <Row><AlbumListComponent albums={albums} /></Row>
            <Row><Button variant="primary">More...</Button></Row>
          </Col>
          <Col>
            <Row><h3>Random</h3></Row>
            <Row><AlbumListComponent albums={albums} /></Row>
            <Row><Button variant="primary">More...</Button></Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
