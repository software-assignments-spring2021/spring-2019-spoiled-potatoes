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
              <div class="panel panel-default">
                <div class="panel-heading">Panel Heading</div>
                <div class="panel-body">Panel Content</div>
              </div>
              </Col>
            </Row>
        </Container>
        </div>
      );
    }
  }
  
  export default Comment;

/*
<div class="comment-div">{this.props.comment.username}</div>
            <div class="comment-div">
                <p>
                {this.props.comment.text}
                </p>
            </div>
            <small>{this.props.comment.timestamp.split(':')[0].split('T')[0]} at 
            {this.props.comment.timestamp.split(':')[0].split('T')[1]}:{this.props.comment.timestamp.split(':')[1]}</small>


<Col xs={8}>
            <Jumbotron className="comment-div">
              <div >{this.props.comment.username}</div>
            </Jumbotron>
            <Jumbotron className="comment-div">
                
                <div>
                <p>
                {this.props.comment.text}
                </p>
                </div>
                <small>{this.props.comment.timestamp.split(':')[0].split('T')[0]} at {this.props.comment.timestamp.split(':')[0].split('T')[1]}:{this.props.comment.timestamp.split(':')[1]}</small>
            </Jumbotron>
            </Col>

*/