import React, { Component } from 'react';
// import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import {Form, Button} from 'react-bootstrap';
// import App from './App'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { text: ""}
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.props.username);
    console.log(this.state);
  }


  render() {
    return (
        <Form
        onSubmit={e => this.handleSubmit(e)}
        >
        <Form.Group controlId="commentForm">
          <Form.Label>Comment</Form.Label>
          <Form.Control name="text" onChange={this.handleInputChange} as="textarea" rows="3" />
        </Form.Group>
        <Button  variant="primary" type="submit">
            Submit
        </Button>
      </Form>
    );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
}

export default Login;
