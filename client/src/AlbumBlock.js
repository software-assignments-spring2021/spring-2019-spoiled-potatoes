import React, { Component } from 'react';
import { Button,Card, Col,Row} from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
// import axios from 'axios';
import { Link } from 'react-router-dom';

class AlbumBlock extends Component {

    render() {
      const CheckScore = this.props.score
      console.log('album object in block: ', this.props.albumObj);
    return (   	
        <Card border="primary" className="text-center">
          <Card.Img variant="top" src={this.props.image} />
          <Card.Title>
            <Link to={{
              pathname: '/album/'+this.props.albumObj.name,
              state: this.props.albumObj,
            }}>{this.props.name}</Link>         
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.artist}</Card.Subtitle>
            {CheckScore == null ? <p>No Score</p> : <p>{this.props.score}</p>}
          <Row>
            <Col>
              <Button variant="success" size="sm"> Upvote </Button>
            </Col>
            <Col>
            <Button variant="danger" size="sm"> Downvote </Button>
            </Col>
          </Row>
        </Card>
    );
  }
}

export default AlbumBlock; 