import React, { Component } from 'react';
import { Image,Form,Button,Container,Row,Col, Jumbotron } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
import AlbumListComponent from './AlbumListComponent'
import PotatoHeader from './potatoHeader.png'


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
                <Col sm={6}>
                <Jumbotron>
                    <Row className="justify-content-md-center"><h1>Your Profile</h1></Row>
                    <Row className="justify-content-md-center"><Image src={PotatoHeader} roundedCircle /></Row>
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




