import React, { Component } from 'react';
import { Image,Button,Container,Row,Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
// import axios from 'axios';
import { Link } from 'react-router-dom';

class AlbumBlock extends Component {


  render() {
    console.log(this.state)
    return (  	
      <Container fluid>
          <Row>
              <Col>
              <Image src={this.props.image} rounded fluid/>
              </Col>
              <Col>
              <Row>
                <Link to="AlbumPage">
                  {this.props.name}
                </Link>
              </Row>
              <Row> 
                {this.props.artist}
              </Row>
              </Col>
          </Row>
          <Row>
              <Col>
                  <Button variant="success" size="sm"> Upvote </Button>
                  <Button variant="danger" size="sm">Downvote</Button>
                  <Row> {this.props.vote} </Row>
              </Col>
          </Row>
      </Container>
    );
  }
}

export default AlbumBlock; 