import React, { Component } from 'react';
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import './App.css';
import AlbumBlock from './AlbumBlock'

class DummyListComponent extends Component {

    render() {
        return (
            <ListGroup>
                <ListGroupItem><AlbumBlock /></ListGroupItem>
                <ListGroupItem><AlbumBlock /></ListGroupItem>
                <ListGroupItem><AlbumBlock /></ListGroupItem>
                <ListGroupItem><AlbumBlock /></ListGroupItem>
                <ListGroupItem><AlbumBlock /></ListGroupItem>
            </ListGroup>    
    );
  }
}

export default DummyListComponent;
