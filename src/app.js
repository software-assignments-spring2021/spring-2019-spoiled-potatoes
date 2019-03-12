/* eslint no-unused-expressions: 0 */
/* eslint no-sequences: 0 */
/* eslint no-underscore-dangle:0 */
const express = require('express');

const app = express();

require('./datastorage/mongo.js');
const mongoose = require('mongoose');

const Trader = mongoose.model('Trader');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const path = require('path');

const publicPath = path.join(__dirname, '/public/');
const bodyParser = require('body-parser');

passport.use(new LocalStrategy(Trader.authenticate()));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Trader.findById(id, (err, user) => {
    done(err, user);
  });
});
// middleware for sessions and bodyparsing
app.use(express.static(publicPath));
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(express.static(publicPath));
app.use(session({ secret: 'itsfreerealestate', resave: false, saveUninitialized: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/home', (req, res) => {
  if (req.body) {
    console.log('req.user', req.user);
  }
  console.log('in get for app.get');
  console.log(req.user);
  res.send({ user: req.user });
});

app.get('/fail', (req, res) => {
  console.log(req.user);
  console.log('failed');
  res.send('hi');
});

app.post('/register', (req, res) => {
  Trader.register(new Trader({ username: req.body.name, email: req.body.email }),
    req.body.password, (err) => {
      if (err) {
        if (err.name === 'UserExistsError') {
          res.send({ registration: false });
        }
      } else {
        console.log('in /register');
        passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/fail' })(req, res);
        // I cant get auth to work so for now it just registers without starting a session
        res.send({ registration: true });
      }
    });
});

// used to exemplify testing. delete after we have actual functions to test
function add(x, y) {
  return x + y;
}

app.listen(3001);

// delete after deleting add function
module.exports = add;
