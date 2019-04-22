import React, { Component } from 'react';
import { Image,Form,Button,Container,Row,Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
import AlbumListComponent from './AlbumListComponent'

const albums = [
    {name:"Name", artist:"Artist", image:[{'#text': "0", size: "small"},
                                          {'#text': "0", size: "medium"},
                                          {'#text': "0", size: "large"},
                                          {'#text': "https://static1.squarespace.com/static/5755a35501dbae3c6d1ba03e/t/5aa962b371c10bfea1ee9dca/1521050296074/Awaken_My_Love.jpg/120x120", size: "extra large"},
                                          ]
    }
]

class ProfilePage extends Component {

    render() {
      console.log(this.props);
      return (  	
        <Container>
            <Row>
                <Col>
                    <Row><Image src={this.props.location.state.image[3]['#text']} rounded /></Row>
                    <Row>{this.props.username}</Row>
                    <Row>
                        <Col>
                            <Row><h3>Change Password</h3></Row>
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
                </Col>
                <Col>
                    <Row><h3>Music Reviwed</h3></Row>
                    <Row><AlbumListComponent albums={albums} /></Row>
                </Col>
                <Col>
                    <Row><h3>Music Added</h3></Row>
                    <Row><AlbumListComponent albums={albums} /></Row>
                </Col>
            </Row>
        </Container>
      );
    }
  }
  
  export default ProfilePage;




