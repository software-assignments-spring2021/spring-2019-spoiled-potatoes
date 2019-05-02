import React from 'react';
import ReactDOM from 'react-dom';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import AlbumPage from './AlbumPage'
import ProfilePage from './ProfilePage'
//import history from './history'
import * as serviceWorker from './serviceWorker';
import { Route,  BrowserRouter as Router } from 'react-router-dom';


const routing = (
  <>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
      integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
      crossOrigin="anonymous"
    ></link>
    <Router>
        <Route exact path="/" component={App} />
        <Route path="/album/:id" component={AlbumPage} />
        <Route path="/profiles/:username" component={ProfilePage} />   
    </Router>
    </>
  )

ReactDOM.render(routing, document.getElementById('root'));
// <Route exact path="/album/:id" component={AlbumPage} />
//<Route path="album/:id" component={AlbumPage} />
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
