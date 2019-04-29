import React, { Component } from 'react';
import { Image,Form,Button,Container,Row,Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
import PotatoHeader from './potatoHeader.png'
import AlbumListComponent from './AlbumListComponent'
import axios from 'axios';

const albums = [
    {name:"Name", artist:"Artist", image:[{'#text': "0", size: "small"},
                                          {'#text': "0", size: "medium"},
                                          {'#text': "0", size: "large"},
                                          {'#text': "https://static1.squarespace.com/static/5755a35501dbae3c6d1ba03e/t/5aa962b371c10bfea1ee9dca/1521050296074/Awaken_My_Love.jpg/120x120", size: "extra large"},
                                          ]
    }
]

class ProfilePage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        username: "",
        reviewed: [],
        added: [],
    
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
      axios.get('/get_random').then(response => {
        console.log('component will mount response');
        console.log(response.data);
        var test = response.data
        this.setState({
          random: test
        });
      })
      axios.get('/get_most_popular').then(response => {
        console.log('component will mount response');
        console.log(response.data);
        let test = response.data
        this.setState({
          popular: test
        });
      })
    }

    render() {
      console.log(this.props);
      return (  	
        <Container>
            <Row>
                <Col>
                    <Row><Image src={PotatoHeader} rounded /></Row>
                    <Row>{this.state.username}</Row>
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




