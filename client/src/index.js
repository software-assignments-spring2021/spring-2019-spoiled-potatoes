import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AlbumPage from './AlbumPage'
//import history from './history'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
//import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Route,  BrowserRouter as Router } from 'react-router-dom';


const routing = (
    <Router>
          <Route exact path="/" component={App} />
          <Route exact path="/album/:id" component={AlbumPage} />
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
