import React, { Component } from 'react';
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import './App.css';
import AlbumBlock from './AlbumBlock'

class AlbumListComponent extends Component {

    render() {
        console.log(this.state)
        return (
            <ListGroup>
                <ListGroupItem>{this.props.albums.map(a => <AlbumBlock name={a.name} artist={a.artist} image={a.image[3]['#text']} id = {a._id} />)}</ListGroupItem>
            </ListGroup>  
        ); 
    }
}
export default AlbumListComponent;
