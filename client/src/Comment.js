import React, { Component } from 'react';
//import * as bs from 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';

// import logo from './logo.svg';
//import './App.css';

class Comment extends Component {

    render() {
      console.log(this.props.comment.timestamp.split(':'));
      return (  	
        <div >
        <Container>
            <Row>
              <Col>
              <div class="comment">
                <p class="user">{this.props.comment.username}</p>
                <p>{this.props.comment.text}</p>
                <p class="timestamp">{this.props.comment.timestamp.split(':')[0].split('T')[0]} at 
                {this.props.comment.timestamp.split(':')[0].split('T')[1]}:{this.props.comment.timestamp.split(':')[1]}</p>
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



<div class="media pt-3">
              <div class="media-body border-top border-bottom border-gray">
                <h5 class="mt-0">{this.props.comment.username}</h5>
                {this.props.comment.text}
              </div>
                
              </div>

text-gray-dark
<p class="media-body pb-3 mb-0 small lh-125 border-top border-bottom border-gray">
                  <strong class="d-block">{this.props.comment.username}</strong>
                  {this.props.comment.text}
                </p>

<div class="media text-muted pt-3">
                <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  <strong class="d-block text-gray-dark">@username</strong>
                  Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
              </div>

<div class="panel panel-default">
                <div class="panel-heading">{this.props.comment.username}</div>
                <div class="panel-body">{this.props.comment.text}</div>
              </div>

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