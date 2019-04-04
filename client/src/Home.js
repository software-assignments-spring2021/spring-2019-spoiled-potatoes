import React, { Component } from 'react';
import Cookies from 'js-cookie';
// import logo from './logo.svg';
import './App.css';
import './AddAPI';
// import AddAPI from './AddAPI';

class Home extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    // fetch('/listAPI', { credentials : 'same-origin' }).then((res) => {
    //   console.log('AHHHHHHHHHHHHHHH');
    //   res.json().then((data) => {
    //     console.log('data', data);
    //     const listItems = data.brokers.map((item) => {
    //         return <li class="list-group-item">{item}</li>
    //     })
    //     console.log('inFunc: ',listItems)
    //     this.setState({list: listItems});
    //   })
    // })
  }

  render() {
    console.log(this.props.username)
    return (
      <div class="container">
        <h1>Welcome {this.props.username}</h1>
      </div>

    );
  }
}

export default Home;
