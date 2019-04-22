import React, { Component } from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';

class Comment extends Component {

    render() {
      console.log(this.props.comment.timestamp.split(':'));
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
                <small>{this.props.comment.timestamp.split(':')[0].split('T')[0]} at {this.props.comment.timestamp.split(':')[0].split('T')[1]}:{this.props.comment.timestamp.split(':')[1]}</small>
            </Jumbotron>
            </Col>
            </Row>
        </Container>
        </div>
      );
    }
  }
  
  export default Comment;




