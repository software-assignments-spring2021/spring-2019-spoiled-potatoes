/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint no-unused-expressions: 0 */
/* eslint no-sequences: 0 */
/* eslint no-underscore-dangle:0 */
/* eslint object-shorthand:0 */
// app.js
const express = require('express');
require('dotenv').config();
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
const Vote = mongoose.model('Vote');
const Comment = mongoose.model('Comment');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const axios = require('axios');

const { computeTrending, getTrendingList } = require('./computeTrending.js');

const listMax = 10;

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

// serve build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
}

computeTrending(Vote, Comment);

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
  res.send({ message: 'home', loggedIn: true, username: req.user.username });
});

app.get('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
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
      passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/' })(req, res);
    }
  });
});

app.post('/login', (req, res) => {
  console.log('in login');
  passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/' })(req, res);
});

// Adds album to database
app.post('/add_album', (req, res) => {
  const {
    name, username, artist, mbid, tags, image,
  } = req.body;

  const newAlbum = new Album({
    name, username, artist, mbid, tags, image,
  });

  newAlbum.save((err) => {
    if (err) {
      console.log(err);
      res.send({ added: false, message: 'Album add failed' });
    } else {
      res.send(newAlbum);
    }
  });
});

// Searches albums in database based on query
app.get('/search_album', (req, res) => {
  console.log('in app.get/album_search');
  console.log(req.query.tags);
  if (req.query.tags) {
    req.query.tags = { $all: req.query.tags };
  } else if (req.query.ids) {
    req.query = { _id: { $in: req.query.ids } };
  }
  Album.find(req.query, (err, docs) => {
    if (err) {
      res.send({ status: 'failure', message: 'failed to find album' });
    } else {
      res.send({ status: 'success', docs });
    }
  });
});

// Adds a vote to album specified
app.post('/vote', (req, res) => {
  const {
    username, albumObjectId, sentiment,
  } = req.body;

  const newVote = new Vote({
    username, albumObjectId, sentiment,
  });

  newVote.save((err) => {
    if (err) {
      res.send({ success: false, message: 'Vote failed' });
    } else {
      Album.findOneAndUpdate({ _id: albumObjectId },
        { $inc: { votesCount: 1, reactionsCount: 1, rawScore: sentiment } },
        { new: true }).exec((error, doc) => {
        if (!error) {
          // eslint-disable-next-line no-param-reassign
          doc.score = doc.rawScore / doc.votesCount;
          doc.save();
          User.findOne({ username }, (userError, user) => {
            if (!userError) {
              user.albumsReactedOn.indexOf(albumObjectId) === -1 ? user
                .albumsReactedOn.push(albumObjectId) : null;
              user.save();
              res.send({ success: true, message: 'Vote registered' });
            } else {
              res.send({ success: false, message: 'Vote failed' });
            }
          });
        } else {
          res.send({ success: false, message: 'Vote failed' });
        }
      });
    }
  });
});

// Gets votes based on query
app.get('/get_votes', (req, res) => {
  Vote.find(req.query, (err, docs) => {
    if (err) {
      res.send({ success: false });
    } else {
      let scoreCounter = 0;
      for (const vote in docs) {
        scoreCounter += docs[vote].sentiment;
      }
      const score = scoreCounter / docs.length;
      res.send({ success: true, docs, score });
    }
  });
});


app.get('/profiles/:name', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/album/:album', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Adds a comment to album specified
app.post('/comment', (req, res) => {
  const {
    username, albumObjectId, text,
  } = req.body;

  const newComment = new Comment({
    username, albumObjectId, text,
  });

  newComment.save((err) => {
    if (err) {
      res.send({ success: false, message: 'Comment failed' });
    } else {
      Album.findOneAndUpdate({ _id: albumObjectId },
        { $inc: { commentsCount: 1, reactionsCount: 1 } }).exec((error) => {
        if (!error) {
          User.findOne({ username }, (userError, user) => {
            if (!userError) {
              user.albumsReactedOn.indexOf(albumObjectId) === -1 ? user
                .albumsReactedOn.push(albumObjectId) : null;
              user.save();
              res.send({ success: true, message: 'Comment registered' });
            } else {
              res.send({ success: false, message: 'Comment failed' });
            }
          });
        } else {
          res.send({ success: false, message: 'Comment failed' });
        }
      });
    }
  });
});

// Gets comments based on query
app.get('/get_comments', (req, res) => {
  console.log('GET COMMENTS QUERY');
  const dbQuery = { albumObjectId: req.query['0'] };
  Comment.find(dbQuery, (err, docs) => {
    if (err) {
      res.send({ success: false });
    } else {
      res.send({ success: true, docs });
    }
  });
});

// Serves as relay between client and lastfm by relaying all requests
// to lastfm and all responses back to client
app.get('/get_lastfm', (req, res) => {
  const paramsObj = req.query;
  paramsObj.api_key = process.env.LASTFM_KEY;
  axios
    .get('http://ws.audioscrobbler.com/2.0/', {
      params: paramsObj,
    })
    .then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        res.send(response.data);
      } else {
        res.status(400);
        res.send();
      }
    }).catch((error) => {
      console.log('album search error: ');
      console.log(error);
      res.status(400);
      res.send();
    });
});

// Gets random list of albums from database
app.get('/get_random', (req, res) => {
  Album.findRandom({}, {}, { limit: listMax }, (err, results) => {
    if (!err) {
      console.log(results);
      res.send(results);
    } else {
      res.status(400);
      res.send();
    }
  });
});

// Gets most popular albums, defined as albums with most reactions (comments + votes)
app.get('/get_most_popular', (req, res) => {
  Album.find().sort({ reactionsCount: -1 }).limit(listMax).exec((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.status(400);
      res.send();
    }
  });
});

// Gets most recently added albums
app.get('/get_last_added', (req, res) => {
  Album.find().sort({ timestamp: -1 }).limit(listMax).exec((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.status(400);
      res.send();
    }
  });
});

// Gets most liked albums (best scores)
app.get('/get_most_liked', (req, res) => {
  Album.find().sort({ score: -1, rawScore: -1 }).limit(listMax).exec((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.status(400);
      res.send();
    }
  });
});

// Gets trending albums
app.get('/get_trending', (req, res) => {
  const trendingList = getTrendingList();
  console.log(trendingList.slice(0, listMax));
  Album.find({ _id: { $in: trendingList.slice(0, listMax) } }, (err, docs) => {
    if (!err) {
      const responseList = [];
      for (const id in trendingList) {
        if (trendingList.hasOwnProperty(id)) {
          const thisId = trendingList[id];
          responseList[id] = docs.find(element => element._id == thisId);
        }
      }
      res.send(responseList);
    }
  });
});

// Gets albums reacted on by specified user
app.get('/get_albums_reacted_on', (req, res) => {
  Album.find({ _id: { $in: req.user.albumsReactedOn } }, (err, docs) => {
    if (!err) {
      res.send({ success: true, docs });
    } else {
      res.send({ success: false });
    }
  });
});

server.listen(process.env.PORT || 3001);
