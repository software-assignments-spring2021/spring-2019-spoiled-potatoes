import React, { Component } from 'react';
import { Image, Jumbotron, Container, Row, Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
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
      <div>
        <Container>
          <Row>
            <Col>
              <Image src={this.props.location.state.image[3]['#text']} rounded />
            </Col>
            <Col>
              <div className="album">
                <Jumbotron >
                  <p>
                    Artist: {typeof this.props.location.state.artist == "string" ? this.props.location.state.artist : this.props.location.state.artist['name']}
                  </p>
                  <p>
                    Album Name: {this.props.location.state.name}
                  </p>
                </Jumbotron>
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




