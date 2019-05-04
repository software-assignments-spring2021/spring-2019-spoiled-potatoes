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
      this.checkVote = this.checkVote.bind(this)
      this.state = { UpVoted: false, DownVoted: false}
    }
    
    sendVote(username, id, sentiment) {
      axios.post('/vote',{username, albumObjectId: id, sentiment}).then(response => {
        console.log(response.data);
      })
    }

    checkVote(username, id) {
      const params = {username, albumObjectId: id}
      axios.get('/get_votes',{ params}).then(response => {
        if (response.data.docs.length > 0) {
          console.log(response.data.docs[0])
          if(response.data.docs[0].sentiment == 0) {
            this.setState({ DownVoted: true });
          }
          else {
            this.setState({ UpVoted : true })
          }
          
        }
      })
    }

    render() {
      this.checkVote(this.props.username, this.props.id)
    return (   	
        <Card border="primary" className="text-center">
          <Card.Img variant="top" src={this.props.image} />
          <Card.Title>
            <Link to="AlbumPage">{this.props.name}</Link>         
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.artist}</Card.Subtitle>
            {this.props.score ?
              <Badge variant="dark">{this.props.score}</Badge>
              :
              <Badge variant="dark">No Score</Badge> 
            }
            {this.props.username ?
              <Row>
                <Col>
                  {this.state.UpVoted ?
                    <Button variant="success" size="sm" disabled> Upvote </Button>
                    :
                    <Button variant="outline-success" size="sm" onClick={() => this.sendVote(this.props.username, this.props.id, 1)}> Upvote </Button>
                  }
                </Col>
                <Col>
                  {this.state.DownVoted ?
                    <Button variant="danger" size="sm" disabled> Downvote </Button>
                    :
                    <Button variant="outline-danger" size="sm" onClick={() => this.sendVote(this.props.username, this.props.id, 0)}> Downvote </Button>
                  }
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