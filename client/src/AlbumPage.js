import React, { Component } from 'react';
import { Image, Container, Row, Col } from 'react-bootstrap';
// import logo from './logo.svg';
//import './App.css';
import Navbar from './Navbar';
import axios from 'axios';
import CommentSection from './CommentSection';

class AlbumPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  //should be replaced by accessing the location state value "this.props.location.state" for username
  componentDidMount() {
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

    render() {
      console.log(this.state.username);
      console.log(this.props);
      return (  	
        <div >
        <Navbar component={this}/>

        <Container>
            <Row className="jumbotron-home">
                <Col>
                <Image src={this.props.location.state.image[3]['#text']} rounded />
                </Col>
                <Col xs={8}>
                  <div class="jumbotron p-4 p-md-5 text-white rounded bg-dark">
                  <div class="col-md-10 px-0">
                      <h1 class="display-4 font-italic">{this.props.location.state.name}</h1>
                      <p class="lead mb-0">{typeof this.props.location.state.artist == "string" ? this.props.location.state.artist : this.props.location.state.artist['name']}</p>
                      <p class="lead my-3"> Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
                  </div>
                  <div class="col-md-2 px-0">
                    <p class="timestamp">95%</p>
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
/*
<div class="col-md-6 px-0"></div>



<Jumbotron fluid>
                    <p>
                    Artist: {typeof this.props.location.state.artist == "string" ? this.props.location.state.artist : this.props.location.state.artist['name']}
                  </p>
                  <p>
                    Album Name: {this.props.location.state.name}
                    </p>
                  </Jumbotron>
*/
export default AlbumPage;




