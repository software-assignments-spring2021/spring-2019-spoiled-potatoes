import React, { Component } from 'react';
import { Button,Card,Badge,Col,Row} from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AlbumBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  
    componentWillMount() {
      axios.get('/user/').then(response => {
        console.log('Get user response: ')
        console.log(response.data)
        if (response.data.user) {
          console.log('Get User: There is a user saved in the server session: ')
          this.setState({
            username: response.data.user.username,
          })
        } else {
          console.log('Get user: no user');
          this.setState({
            username: null,
          })
        }
      })
    }

    OnVote(name, vote) {
      axios.post('/vote', {name, vote}).then(response => {
          console.log(response.data);
      })
    }

    render() {
      const CheckScore = this.props.score
      console.log(this.state)
    return (   	
        <Card border="primary" className="text-center">
          <Card.Img variant="top" src={this.props.image} />
          <Card.Title>
            <Link to="AlbumPage">{this.props.name}</Link>         
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.artist}</Card.Subtitle>
            {CheckScore == null ? <Badge variant="dark">No Score</Badge> : <Badge variant="dark">{this.props.score}</Badge>}
          <Row>
            <Col>
              <Button variant="success" size="sm" onClick={() => this.OnVote(this.props.username,1)}> Upvote </Button>
            </Col>
            <Col>
            <Button variant="danger" size="sm" onClick={() => this.OnVote(this.props.username,0)}> Downvote </Button>
            </Col>
          </Row>
        </Card>
    );
  }
}

export default AlbumBlock; 