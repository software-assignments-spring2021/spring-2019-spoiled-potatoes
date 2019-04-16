import React, { Component } from 'react';
import { Image,Button,Container,Row,Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
// import axios from 'axios';



class AlbumBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
        name: "" , artist: "", img: ""
    };
    this.selectImage = this.selectImage.bind(this);
  };

  
    selectImage(mbid, name){

    }



    componentDidMount(){
      

    }


    render() {
      console.log(this.state)
      return (  	
        <Container fluid>
            <Row>
                <Col xs>
                <Image src={this.state.img}/>
                </Col>
                <Col>
                <h4> 
                  {this.state.name}
                </h4>
                <h5> 
                  {this.state.artist}
                </h5>
                </Col>
            </Row>
            <Row>
                <Col>
                <Button variant="success">Upvote</Button>
                <Button variant="danger">Downvote</Button>
                </Col>
            </Row>
        </Container>
      );
    }
  }
  
  export default AlbumBlock;