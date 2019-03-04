require('../datastorage/mongo.js');
// const passport = require('passport');
const mongoose = require('mongoose');

class TraderRepository {
  constructor() {
    this.Trader = mongoose.model('Trader');
  }

  post(usr, password, em) {
    this.Trader.register(new this.Trader({ username: usr, email: em }), password, (err) => {
      if (err) {
        if (err.name === 'UserExistsError') {
          console.log('Registration Error');
        }
      } else {
        console.log('New user ', usr, ' has been successfully registered');
      }
    });
  }

  getPortfolio(usr) {
    this.Trader.findOne({ username: usr }, doc => doc.portfolio);
  }

  findUser(usr) {
    this.Trader.findOne({ username: usr }, (doc) => {
      const retVal = { username: doc.username, email: doc.email };
      return retVal;
    });
  }

  addPortfolioItem(usr, portObj) {
    this.Trader.findOne({ username: usr }, (doc) => {
      const tempPort = doc.portfolio;
      Object.keys(portObj).forEach((key) => {
        tempPort[key] = portObj[key];
      });
      doc.update({ $set: { portfolio: tempPort } });
      doc.save();
    });
  }
}

module.exports = {
  TraderRepo: TraderRepository,
};
