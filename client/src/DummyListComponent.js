import React, { Component } from 'react';
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import './App.css';
import DummyAlbum from './DummyAlbum'

class DummyListComponent extends Component {

    render() {
        return (
            <ListGroup>
                <ListGroupItem><DummyAlbum /></ListGroupItem>
                <ListGroupItem><DummyAlbum /></ListGroupItem>
                <ListGroupItem><DummyAlbum /></ListGroupItem>
                <ListGroupItem><DummyAlbum /></ListGroupItem>
                <ListGroupItem><DummyAlbum /></ListGroupItem>
            </ListGroup>    
    );
  }
}

export default DummyListComponent;
