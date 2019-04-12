import React, { Component } from 'react';
import { Image,Jumbotron,Button,Container,Row,Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';

class Comment extends Component {

    render() {
      console.log(this.props);
      return (  	
        <div className="album">
        <Container>
            <Row>
            <Col>
            <Jumbotron>
                {this.props.comment.username}
            </Jumbotron>
            </Col>
            <Col xs={8}>
            <Jumbotron>
                <div>
                <p>
                {this.props.comment.text}
                </p>
                </div>
                <small>{this.props.comment.timestamp}</small>
            </Jumbotron>
            </Col>
            </Row>
        </Container>
        </div>
      );
    }
  }
  
  export default Comment;




