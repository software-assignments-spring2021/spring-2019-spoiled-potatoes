/* eslint no-unused-expressions: 0 */
/* eslint no-sequences: 0 */
/* eslint no-underscore-dangle:0 */
/* eslint object-shorthand:0 */
// app.js
const express = require('express');

const app = express();
const server = require('http').Server(app);

const path = require('path');

const publicPath = path.join(__dirname, '/public/');

const mongoose = require('mongoose');
require('./datastorage/mongo.js');

const Trader = mongoose.model('Trader');
// const Broker = mongoose.model('Broker');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');


passport.use(new LocalStrategy(Trader.authenticate()));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Trader.findById(id, (err, user) => {
    done(err, user);
  });
});


app.use(express.static(publicPath));
app.use(session({ secret: 'itsfreerealestate', resave: false, saveUninitialized: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


app.get('/home', (req, res) => {
  console.log('HOME');
  console.log(req.session);
  res.send({ message: 'home', registration: true, user: req.user });
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
  Trader.register(new Trader({ username: username, email: email }), req.body.password, (err) => {
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


server.listen(process.env.PORT || 3001);
