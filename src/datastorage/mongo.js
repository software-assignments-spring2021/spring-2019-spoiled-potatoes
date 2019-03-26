const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const fs = require('fs');
const path = require('path');

const traderSchema = new mongoose.Schema({
  username: String,
  email: String,
  portfolio: [{ id: String, key: String }],
  // portfolio is a list of ids to supported APIs and the user's key (will have to be hashed)
});
traderSchema.plugin(passportLocalMongoose);

mongoose.model('Trader', traderSchema);

const brokerSchema = new mongoose.Schema({
  name: String,
  endpoints: [{ function: String, endpoint: String }],
  // endpoints is a list of objects that describe the various endpoints and corresponding
  // functionalities of a supported API
});
brokerSchema.plugin(passportLocalMongoose);

mongoose.model('Broker', brokerSchema);


if (process.env.TRAVIS) {
  const pass = process.env.TRAVIS_PASS;
  const connection = 'mongodb://nyu_agile_test_admin:';
  const cluster = '@cluster0-shard-00-00-l3dcg.mongodb.net:27017,cluster0-shard-00-01-l3dcg.mongodb.net:27017,cluster0-shard-00-02-l3dcg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
  const connString = connection + pass + cluster;
  mongoose.connect(connString);
} else {
  const fn = path.join(__dirname, 'config.json');
  const data = fs.readFileSync(fn);
  const conf = JSON.parse(data);
  mongoose.connect(conf.dbconf);
}

module.exports = mongoose.model('Trader', traderSchema);
module.exports = mongoose.model('Broker', brokerSchema);
