
import React, { Component } from 'react';
import { InputGroup,FormControl } from 'react-bootstrap';
// import Cookies from 'js-cookie';
import './App.css';

class Searchbar extends Component {

  render() {
    return (
        <InputGroup>
            <InputGroup.Prepend>
            <InputGroup.Text>Seach For Music</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as="textarea" placeholder="..." aria-label="With textarea" />
        </InputGroup>
    );
  }
}

export default Searchbar;

