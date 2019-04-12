import React, { Component } from 'react';
import { Image,Jumbotron,Button,Container,Row,Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
import CommentSection from './CommentSection';

class AlbumPage extends Component {

    render() {
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
        <CommentSection username={this.props.location.username} albumQuery={this.props.location.state.mbid ? 
          this.props.location.state.mbid : this.props.location.state.name}/>
        </Container>
        </div>
      );
    }
  }
  
  export default AlbumPage;




