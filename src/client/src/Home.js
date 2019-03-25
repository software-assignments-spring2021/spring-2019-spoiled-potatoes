import React, { Component } from 'react';
import Cookies from 'js-cookie';
import logo from './logo.svg';
import './App.css';
import './AddAPI';
import AddAPI from './AddAPI';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [] }
  }
    
  logout(){
    
    fetch('/logout', { credentials : 'same-origin' }).then((res) => {
      console.log(res.text);
      res.json().then( (data) => {
        console.log(data.user);
        Cookies.set('username','');
        this.props.component.setState({ username: Cookies.get('username') });
      })
    })
  }

  retrieve(){
    console.log('heyyyyyyy');
    
  }

  componentDidMount(){
    fetch('/listAPI', { credentials : 'same-origin' }).then((res) => {
      console.log('AHHHHHHHHHHHHHHH');
      res.json().then((data) => {
        console.log('data', data);
        const listItems = data.brokers.map((item) => {
            return <li class="list-group-item">{item}</li>
        })
        console.log('inFunc: ',listItems)
        this.setState({list: listItems});
      })
    })
  }

  render() {
    console.log('listItems', this.state.listItems);
    return (
            <div class="container">
            <h1>Welcome {Cookies.get('username')}</h1>
            {this.state.list.length ? 
            <div class="container">
            <h3>These are available brokerages:</h3>
            <ul class="list-group">
            {this.state.list}
            </ul>
            </div>
            : <div class="container">loading available brokerages</div>}
            
            </div>
            
    );
  }
}

export default Home;
