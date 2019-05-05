import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import Comment from './Comment';
import AddComment from './AddComment'

class CommentSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.getComments = this.getComments.bind(this);
  }


  componentWillMount() {
    this.getComments();
  }

  getComments() {
    console.log('album query: ', this.props.album);
    axios.get('/get_comments', {
      params: this.props.album
    }).then(response => {
      console.log('component will mount response');
      console.log(response.data.docs);
      let test = response.data.docs
      this.setState({
        comments: test.map(
          item => <Comment comment={{ username: item.username, text: item.text, timestamp: item.timestamp }} />
        )
      });
    })
  }

  render() {
    return (
      <>

        <div class="my-3 p-3 bg-gray rounded box-shadow">
          <h1 class="border-bottom border-black pb-2 mb-0">Comments</h1>
          {this.state.comments.length ?

            <Container>
              <Row>
                <Col>
                  {this.state.comments}
                </Col>
              </Row>
            </Container>

            :

            <div class="comment">
              <p>No comments</p>
            </div>
          }
          {this.props.username ?
            <div class="comment-div">
              <AddComment parent={this} album={this.props.album} username={this.props.username} getComments={this.getComments}></AddComment>
            </div>
            :
            null
          }
        </div>
      </>
    );
  }
}

export default CommentSection;




