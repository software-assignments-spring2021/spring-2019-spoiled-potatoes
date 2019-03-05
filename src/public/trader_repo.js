require('../datastorage/mongo.js');
// const passport = require('passport');
const mongoose = require('mongoose');

class TraderRepository {
  constructor() {
    this.Trader = mongoose.model('Trader');
  }

  post(em, usr, password) {
    return this.Trader.register(new this.Trader({ username: usr, email: em }), password, (err) => {
      if (err) {
        if (err.name === 'UserExistsError') {
          console.log('Registration Error');
          return [false, 'UserExistsError'];
        }
        console.log('Unknown Error Occurred: ', err);
        return [false, 'Unknown Error'];
      }
      return this.findUser(usr);
    });
  }

  getPortfolio(usr) {
    // either returns portfolio or false; more granularity on error will be required
    return this.Trader.findOne({ username: usr }, (doc, err) => {
      if (err) {
        return false;
      }
      return doc.portfolio;
    });
  }

  findUser(usr) {
    // either returns user object or false; more granularity on error will be required
    return this.Trader.findOne({ username: usr }, (doc, err) => {
      if (err) {
        return [false, {}];
      }
      const retVal = { username: doc.username, email: doc.email };
      return [true, retVal];
    });
  }

  addPortfolioItem(usr, portObj) {
    // either returns updated portfolio object or false; more granularity on error will be required
    this.Trader.findOne({ username: usr }, (doc) => {
      const tempPort = doc.portfolio;
      Object.keys(portObj).forEach((key) => {
        tempPort[key] = portObj[key];
      });
      doc.update({ $set: { portfolio: tempPort } });
      doc.save();
      return [true, tempPort];
    });
    return [false, {}];
  }
}

module.exports = {
  TraderRepo: TraderRepository,
};
