import React, { Component } from 'react';
import { Button,Card, Col,Row, Badge} from 'react-bootstrap';
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
      this.componentWillMount = this.componentWillMount.bind(this);
    }
    
    componentWillMount() {
      this.checkVote(this.props.username, this.props.id)
    }
    sendVote(username, id, sentiment) {
      axios.post('/vote',{username, albumObjectId: id, sentiment}).then(response => {
        console.log(response.data);
      })
      this.checkVote(this.props.username, this.props.id)
    }

    checkVote(username, id) {
      const params = {username, albumObjectId: id}
      axios.get('/get_votes',{ params}).then(response => {
        if (response.data.docs.length > 0) {
          if(response.data.docs[0].sentiment === 0) {
            this.setState({ DownVoted: true });
          }
          else {
            this.setState({ UpVoted : true })
          }
          
        }
      })
    }

    render() {
      const Percentage = Math.round(this.props.score*100) + '%'
      console.log(this.props.albumObj);
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
            {this.props.username ?
              <Card.Text>
                {this.state.UpVoted === true ?
                <Row>
                <Col>
                  <Button variant="outline-danger" size="sm" disabled> Downvote </Button>
                </Col>
                <Col>
                  {this.props.score ?
                  <h3><Badge variant="dark">{Percentage}</Badge></h3>
                  :
                  <h3><Badge variant="dark">No Score</Badge></h3>
                  }
                </Col>
                <Col>
                  <Button variant="success" size="sm" disabled> Upvote </Button>
                </Col>
              </Row>
                :
                null
                }
                {this.state.DownVoted === true ?
                <Row>
                <Col>
                  <Button variant="danger" size="sm" disabled> Downvote </Button>
                </Col>
                <Col>
                  {this.props.score ?
                  <h3><Badge variant="dark">{Percentage}</Badge></h3>
                  :
                  <h3><Badge variant="dark">No Score</Badge></h3>
                  }
                </Col>
                <Col>
                  <Button variant="outline-success" size="sm" disabled> Upvote </Button>
                </Col>
                </Row>
                :
                null
                }
                {this.state.UpVoted === false & this.state.DownVoted === false ?
                <Row>
                <Col>
                  <Button variant="outline-danger" size="sm" onClick={() => this.sendVote(this.props.username, this.props.id, 0)}> Downvote </Button>
                </Col>
                <Col>
                  {this.props.score ?
                  <h3><Badge variant="dark">{Percentage}</Badge></h3>
                  :
                  <h3><Badge variant="dark">No Score</Badge></h3>
                  }
                </Col>
                <Col>
                  <Button variant="outline-success" size="sm" onClick={() => this.sendVote(this.props.username, this.props.id, 1)}> Upvote </Button>
                </Col>
                </Row>
                :
                null
                }
              </Card.Text>
              : 
              null
            }
        </Card>
    );
  }
}

export default AlbumBlock; 