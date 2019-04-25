import React, { Component } from 'react';
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import './App.css';
import AlbumBlock from './AlbumBlock'

class AlbumListComponent extends Component {

    render() {
        console.log(this.state)
        return (
            <ListGroup variant="flush">
                <ListGroupItem>{this.props.albums.map(a => <AlbumBlock name={a.name} artist={a.artist} image={a.image[3]['#text']} id = {a._id} score = {a.score} />)}</ListGroupItem>
            </ListGroup>  
        ); 
    }
}
export default AlbumListComponent;
