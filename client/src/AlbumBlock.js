import React, { Component } from 'react';
import { Image,Button,Container,Row,Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
//import DummyListComponent from "./DummyListComponent";
// import axios from 'axios';
import { Link } from 'react-router-dom';



class AlbumBlock extends Component {


    render() {
      console.log(this.state)
      return (  	
        <Container fluid>
            <Row>
                <Col xs>
                <Image src={this.props.image}/>
                </Col>
                <Col>
                <Link to="AlbumPage">
                  {this.props.name}
                </Link>
                <h5> 
                  {this.props.artist}
                </h5>
                </Col>
            </Row>
            <Row>
                <Col xs>
                  
                    <Button variant="success" size="sm"> Upvote </Button>
              
                    <Button variant="danger" size="sm">Downvote</Button>

                    <h5> {this.props.vote} </h5>
                
                </Col>
            </Row>
        </Container>
      );
    }
  }
  
  export default AlbumBlock;