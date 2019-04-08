import React, { Component } from 'react';
import { Image,Button,Container,Row,Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';

class DummyAlbum extends Component {

    render() {
      return (  	
        <Container fluid>
            <Row>
                <Col xs>
                <Image src="https://static1.squarespace.com/static/5755a35501dbae3c6d1ba03e/t/5aa962b371c10bfea1ee9dca/1521050296074/Awaken_My_Love.jpg/120x120" thumbnail/>
                </Col>
                <Col>
                <h4> Album Name</h4>
                <h5> Artists</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                <Button variant="success">Upvote</Button>
                <Button variant="danger">Downvote</Button>
                </Col>
            </Row>
        </Container>
      );
    }
  }
  
  export default DummyAlbum;