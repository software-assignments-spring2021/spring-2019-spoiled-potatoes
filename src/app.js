/* eslint no-unused-expressions: 0 */
/* eslint no-sequences: 0 */
/* eslint no-underscore-dangle:0 */
/* eslint object-shorthand:0 */
// app.js
const express = require('express');
const CryptoJS = require('crypto-js');
// this should become an environment variable or part of a config file
const cryptKey = 'tobereplaced';

const app = express();
const server = require('http').Server(app);

const path = require('path');

const publicPath = path.join(__dirname, '/public/');

const mongoose = require('mongoose');
require('./datastorage/mongo.js');

const Trader = mongoose.model('Trader');
const Broker = mongoose.model('Broker');
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

function getBrokerID(brokerName) {
  Broker.findOne({ name: brokerName }, (err, broker) => {
    if (err) {
      return false;
    }
    return broker._id;
  });
}
/*
function getAllAPI() {
  
}
*/
app.get('/home', (req, res) => {
  console.log('HOME');
  console.log(req.session);
  res.send({ message: 'home', registration: true, user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/fail');
});

app.get('/fail', (req, res) => {
  console.log('FAIL');
  console.log(req.session);
  res.send({ message: 'fail', registration: false });
});

app.get('/register', (req, res) => {
  res.send({ message: 'register get view' });
});

app.get('/listAPI', (req, res) => {
  console.log('listAPI');
  if (req.user) {
    console.log('send it listAPI');
    Broker.find({}, (err, brokers) => {
      if (err) { res.redirect('/fail'); }
      const retArr = [];
      brokers.forEach((element) => {
        retArr.push(element.name);
      });
      console.log('before res.send: ', retArr);
      res.send({ brokers: retArr });
    });
  }
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

app.post('/addAPI', (req, res) => {
  Trader.findOne({ name: req.user.username }, (err, usr) => {
    if (err) {
      res.redirect('/fail');
    } else {
      console.log(req);
      const brokerID = getBrokerID(req.body.brokerName);
      if (!brokerID) { res.redirect('/fail'); }
      const hiddenKey = CryptoJS.AES.encrypt(req.body.key, cryptKey);
      const newAPI = { id: brokerID, key: hiddenKey };
      usr.portfolio.push(newAPI);
      usr.markModified('portfolio');
      usr.save((error) => {
        if (error) {
          return false;
        }
        return true;
      });
    }
  });
});

app.post('/login', (req, res) => {
  console.log('in login');
  passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/fail' })(req, res);
});

server.listen(process.env.PORT || 3001);
