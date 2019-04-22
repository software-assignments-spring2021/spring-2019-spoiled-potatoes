import React, { Component } from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
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
          comments:[],
        }
        this.componentWillMount = this.componentWillMount.bind(this);
      }


    componentWillMount(){
        console.log('album query: ', this.props.album);
        axios.get('/get_comments', {
            params: this.props.album
          }).then(response => {
              console.log('component will mount response');
              console.log(response.data.docs);
              let test = response.data.docs
              this.setState({
                comments: test.map(
                  item => <Comment comment={{username: item.username, text: item.text, timestamp: item.timestamp}}/>
                )
              });
          })
    }

    render() {
      console.log('comment section');
      console.log('comment section username: ', this.props.username)
      console.log('comment section');
      return (  
        <div>
        { this.state.comments.length ? 	
        
        <Container>
            <Row>
                <Col>
                {this.state.comments}
                </Col>
            </Row>
        </Container>
        
        :
        
        <div className="album">
        <Jumbotron fluid>No Comments</Jumbotron>
        </div>
        }
        {this.props.username ? 
          <AddComment parent={this} album={this.props.album} username={this.props.username}></AddComment>
          :
          null
        }
    </div>
      );
    }
  }
  
  export default CommentSection;




