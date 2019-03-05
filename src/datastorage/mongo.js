const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const fs = require('fs');
const path = require('path');

const traderSchema = new mongoose.Schema({
  username: String,
  email: String,
  portfolio: mongoose.Schema.Types.Mixed,
});
traderSchema.plugin(passportLocalMongoose);

mongoose.model('Trader', traderSchema);

const brokerSchema = new mongoose.Schema({
  token: String,
});
brokerSchema.plugin(passportLocalMongoose);

mongoose.model('Broker', brokerSchema);

const fn = path.join(__dirname, 'config.json');
const data = fs.readFileSync(fn);
const conf = JSON.parse(data);
mongoose.connect(conf.dbconf);
