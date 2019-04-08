/* eslint no-unused-expressions: 0 */
/* eslint no-sequences: 0 */
/* eslint no-underscore-dangle:0 */
/* eslint object-shorthand:0 */
// app.js
const express = require('express');
// const CryptoJS = require('crypto-js');
// // this should become an environment variable or part of a config file
// const cryptKey = 'tobereplaced';

const app = express();
const server = require('http').Server(app);

const path = require('path');

const publicPath = path.join(__dirname, '/public/');

const mongoose = require('mongoose');
require('./datastorage/mongo.js');

const User = mongoose.model('User');
const Album = mongoose.model('Album');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


app.use(express.static(publicPath));
app.use(session({
  secret: 'itsfreerealestate',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365,
  },
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/user', (req, res) => {
  console.log('USER');
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

app.get('/home', (req, res) => {
  console.log('HOME');
  console.log(req.session);
  res.send({ message: 'home', registration: true, username: req.user.username });
});

app.get('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
});

app.get('/fail', (req, res) => {
  console.log('FAIL');
  console.log(req.session);
  res.send({ message: 'fail', registration: false });
});

app.get('/register', (req, res) => {
  res.send({ message: 'register get view' });
});

app.post('/register', (req, res) => {
  const { username, email } = req.body;
  console.log('in register');
  User.register(new User({ username: username, email: email }), req.body.password, (err) => {
    if (err) {
      if (err.name === 'UserExistsError') {
        res.send({ message: 'Username already exists', registration: false });
      }
    } else {
      passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/fail' })(req, res);
    }
  });
});

app.post('/login', (req, res) => {
  console.log('in login');
  passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/fail' })(req, res);
});

app.post('/add_album', (req, res) => {
  const {
    name, artist, mbid, tags,
  } = req.body;

  const newAlbum = new Album({
    name: name, artist: artist, mbid: mbid, tags: tags,
  });

  newAlbum.save((err) => {
    if (err) {
      res.send({ added: false, message: 'Album add failed' });
    } else {
      res.send({ added: true });
    }
  });
});

server.listen(process.env.PORT || 3001);
