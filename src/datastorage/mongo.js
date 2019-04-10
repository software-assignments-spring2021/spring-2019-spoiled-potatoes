const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const fs = require('fs');
const path = require('path');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});
userSchema.plugin(passportLocalMongoose);

mongoose.model('User', userSchema);

const albumSchema = new mongoose.Schema({
  name: String,
  artist: String,
  mbid: String,
  image: [{
    '#text': String,
    size: String,
  }],
  tags: [String],
  votes: [{
    username: String,
    timestamp: { type: Date, default: Date.now },
    sentiment: { type: Number, min: 0, max: 1 }, // 0 if dislike, 1 if like
  }],
});

const Album = mongoose.model('Album', albumSchema);

if (process.env.TRAVIS) {
  const pass = process.env.TRAVIS_PASS;
  const connection = 'mongodb://nyu_agile_test_admin:';
  const cluster = '@cluster0-shard-00-00-l3dcg.mongodb.net:27017,cluster0-shard-00-01-l3dcg.mongodb.net:27017,cluster0-shard-00-02-l3dcg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
  const connString = connection + pass + cluster;
  mongoose.connect(connString, { useNewUrlParser: true });
} else {
  const fn = path.join(__dirname, 'config.json');
  const data = fs.readFileSync(fn);
  const conf = JSON.parse(data);
  mongoose.connect(conf.dbconf, { useNewUrlParser: true });
}

module.exports = mongoose.model('User', userSchema);
module.exports = Album;
