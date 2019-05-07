import React, { Component } from 'react';
import { Image, Container, Row, Button, Col } from 'react-bootstrap';
// import logo from './logo.svg';
//import './App.css';
import axios from 'axios';
import CommentSection from './CommentSection';

class AlbumPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "", UpVoted: false, DownVoted: false, score: ""
    }
    this.getScore = this.getScore.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.sendVote = this.sendVote.bind(this)
    this.checkVote = this.checkVote.bind(this)
  }

  getScore(db_id){
    const params = { _id: db_id }
    axios.get('/search_album', {params}).then(response => {
      this.setState({score: Math.round(response.data.docs[0].score * 100) ? Math.round(response.data.docs[0].score * 100) + '%' : 'No score'})
    })
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
        this.checkVote(this.state.username, this.props.location.state.db_id)
        this.getScore(this.props.location.state.db_id)
      } else {
        console.log('Get user: no user');
        this.setState({
          username: null,
        })
      }
    })
  }

  sendVote(username, id, sentiment) {
    axios.post('/vote', { username, albumObjectId: id, sentiment }).then(response => {
      console.log(response.data);
      this.checkVote(this.state.username, this.props.location.state.db_id)
      this.getScore(this.props.location.state.db_id)
    })
  }

  checkVote(username, id) {
    console.log('\n\nin check vote\n\n')
    const params = { username, albumObjectId: id }
    axios.get('/get_votes', { params }).then(response => {
      if (response.data.docs.length > 0) {
        if (response.data.docs[0].sentiment === 0) {
          this.setState({ DownVoted: true });
        }
        else {
          this.setState({ UpVoted: true })
        }

      }
    })
  }

    render() {
      console.log(this.state.username);
      console.log('album page location: ',this.props.location.state);
      //const Percentage = Math.round(this.props.location.state.score * 100) + '%'
      return (  	
        <div >
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <a class="navbar-brand" href="/">Spoiled Potatoes</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
        <Container>
            <Row className="jumbotron-home">
                <Col>
                <Image src={this.props.location.state.image[3]['#text']} rounded />
                {this.state.username ?
                  <>
                    {this.state.UpVoted === true ?
                      <Row>
                        <Col>
                          <Button variant="outline-danger" size="sm" disabled> Downvote </Button>
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
                          <Button variant="outline-success" size="sm" disabled> Upvote </Button>
                        </Col>
                      </Row>
                      :
                      null
                    }
                    {this.state.UpVoted === false & this.state.DownVoted === false ?
                      <Row>
                        <Col>
                          <Button variant="outline-danger" size="sm" onClick={() => this.sendVote(this.state.username, this.props.location.state.db_id, 0)}> Downvote </Button>
                        </Col>
                        
                        <Col>
                          <Button variant="outline-success" size="sm" onClick={() => this.sendVote(this.state.username, this.props.location.state.db_id, 1)}> Upvote </Button>
                        </Col>
                      </Row>
                      :
                      null
                    }
                  </>
                  :
                  null
                }
                </Col>
                <Col xs={8}>
                  <div class="jumbotron p-4 p-md-5 text-white rounded bg-dark">
                  <div class="row">
                  <div class="col-md-6 px-0">
                      <h1 class="display-4 font-italic">{this.props.location.state.name}</h1>
                      <p class="lead mb-0">{typeof this.props.location.state.artist == "string" ? this.props.location.state.artist : this.props.location.state.artist['name']}</p>
                  </div>
                  <div class="col-md-6 px-0">
                  <h1 class="score display-4">Album Score: {this.state.score}</h1>
                  </div>
                  </div>
                  </div>
                </Col>
            </Row>
        </Container>

        <Container>
          <CommentSection album={this.props.location.state.db_id} username={this.state.username} albumQuery={this.props.location.state.mbid ?
            this.props.location.state.mbid : this.props.location.state.name} />
        </Container>
      </div>
    );
  }
}

export default AlbumPage;




