import React, { Component } from 'react';
import { Image, Form, Button, Container, Row, Col, Jumbotron } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AlbumListComponent from './AlbumListComponent';
//import CommentSection from './CommentSection';

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reviewed: [],
      added: [],
      username: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log(this.state.username)
        const params = { username: this.state.username }
        axios.get('/search_album', { params }).then(response => {
          console.log('component will mount response');
          console.log(response.data);
          var test = response.data.docs
          this.setState({
            added: test
          });
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          username: null,
        })
      }
    })
    axios.get('/get_albums_reacted_on').then(response => {
      console.log('component will mount response');
      console.log(response.data);
      var test = response.data.docs
      this.setState({
        reviewed: test
      });
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.newPassword !== this.state.confirmPassword) {
      alert("New password and confirm password don't match");
    } else {
      axios.post('/change_password', {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword
      })
        .then(response => {
          console.log(response)
          if (response.data.success) {
            console.log('successful password change')
            alert('Password changed.')
            this.setState({
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            })
          } else {
            console.log('not changed')
            alert('Wrong old password.')
          }
        }).catch(error => {
          console.log('Not changed')
          alert('Wrong old password.')
        })
    }
  }

  render() {
    console.log(this.props);
    return (
      <>
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
          <a class="navbar-brand" href="/">Spoiled Potatoes</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </nav>
        <Container>
          <Row className="jumbotron-home">
            <Col sm={6}>
              <Jumbotron>
                <Row className="justify-content-md-center"><h1>Your Profile</h1></Row>
                <Row className="justify-content-md-center"><Image roundedCircle /></Row>
                <Row className="justify-content-md-center">{this.props.username}</Row>
                <Row>
                  <Col>
                    <Row className="justify-content-md-center"><h3>Change Password</h3></Row>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Control placeholder="Old password" type="password" name="oldPassword" value={this.state.oldPassword} required onChange={this.handleInputChange} />
                      <Form.Control placeholder="New password" type="password" name="newPassword" value={this.state.newPassword} required onChange={this.handleInputChange} />
                      <Form.Control placeholder="Confirm password" type="password" name="confirmPassword" value={this.state.confirmPassword} required onChange={this.handleInputChange} />
                      <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
            <Col>
              <Row><h3>Music Reviewed</h3></Row>
              <Row><AlbumListComponent albums={this.state.reviewed} /></Row>
            </Col>
            <Col>
              <Row><h3>Music Added</h3></Row>
              <Row><AlbumListComponent albums={this.state.added} /></Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default ProfilePage;
