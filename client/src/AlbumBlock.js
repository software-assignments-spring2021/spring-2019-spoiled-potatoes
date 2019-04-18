import React, { Component } from 'react';
import { Image,Button,Container,Row,Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
//import DummyListComponent from "./DummyListComponent";
// import axios from 'axios';



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
                <h4> 
                  {this.props.name}
                </h4>
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