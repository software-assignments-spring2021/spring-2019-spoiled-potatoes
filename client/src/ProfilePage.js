import React, { Component } from 'react';
import { Image,Form,Button,Container,Row,Col, Jumbotron } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AlbumListComponent from './AlbumListComponent'

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          reviewed: [],
          added: [],
        }
        this.componentWillMount = this.componentWillMount.bind(this);
      }

      componentWillMount() {
        axios.get('/get_albums_reacted_on').then(response => {
          console.log('component will mount response');
          console.log(response.data);
          var test = response.data.docs
          this.setState({
            reviewed: test
          });
        })
        const params = {username : this.props.username}
        axios.get('/search_album', {params}).then(response => {
            console.log('component will mount response');
            console.log(response.data);
            var test = response.data.docs
            this.setState({
              added: test
            });
          })
    }

    render() {
      console.log(this.props);
      return (  	
        <Container>
            <Row>
                <Col sm={6}>
                <Jumbotron>
                    <Row className="justify-content-md-center"><h1>Your Profile</h1></Row>
                    <Row className="justify-content-md-center"><Image roundedCircle /></Row>
                    <Row className="justify-content-md-center">{this.props.username}</Row>
                    <Row>
                        <Col>
                            <Row className="justify-content-md-center"><h3>Change Password</h3></Row>
                            <Form>
                                <Form.Control placeholder="Old password" />
                                <Form.Control placeholder="New password" />
                                <Form.Control placeholder="Confirm password" />
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
      );
    }
  }
  
  export default ProfilePage;




