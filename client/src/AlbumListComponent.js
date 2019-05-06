import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import './App.css';
import AlbumBlock from './AlbumBlock'

class AlbumListComponent extends Component {

    render() {
        return (

            <ListGroup variant="flush">
                {this.props.albums.length > 0 ? <ListGroupItem>{this.props.albums.map(a => <AlbumBlock albumObj={a} name={a.name} artist={a.artist} image={a.image[3]['#text']} id={a._id} score={a.score} username={this.props.username} getLists={this.props.getLists} />)} </ListGroupItem> : null}
            </ListGroup>

        );
    }
}

//
export default AlbumListComponent;
