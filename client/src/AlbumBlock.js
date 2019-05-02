import React, { Component } from 'react';
import { Button,Card,Badge,Col,Row} from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AlbumBlock extends Component {

    constructor(props) {
      super(props)
      this.sendVote =  this.sendVote.bind(this)
    }
    
    sendVote(username, id, sentiment) {
      axios.post('/vote',{username, albumObjectId: id, sentiment}).then(response => {
        console.log(response.data);
      })
    }

    render() {
      const CheckScore = this.props.score
      const CheckName = this.props.username
      console.log(this.state)
    return (   	
        <Card border="primary" className="text-center">
          <Card.Img variant="top" src={this.props.image} />
          <Card.Title>
            <Link to="AlbumPage">{this.props.name}</Link>         
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.artist}</Card.Subtitle>
            {CheckScore ?
              <Badge variant="dark">No Score</Badge> 
              : 
              <Badge variant="dark">{this.props.score}</Badge>
            }
            {CheckName ?
              <Row>
                <Col>
                  <Button variant="success" size="sm" onClick={() => this.sendVote(this.props.username, this.props.id, 1)}> Upvote </Button>
                </Col>
                <Col>
                <Button variant="danger" size="sm" onClick={() => this.sendVote(this.props.username, this.props.id, 0)}> Downvote </Button>
                </Col>
              </Row>
              : 
              null
            }
        </Card>
    );
  }
}

export default AlbumBlock; 