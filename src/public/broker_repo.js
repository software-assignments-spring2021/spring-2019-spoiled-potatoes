require('../datastorage/mongo.js');
// const passport = require('passport');
const mongoose = require('mongoose');

class BrokerRepository {
  constructor() {
    this.Broker = mongoose.model('Broker');
  }

  store(tok) {
    this.Broker.register(new this.Broker({ token: tok }), (err) => {
      if (err) {
        if (err.name === 'BrokerExistsError') {
          console.log('Store Error');
        }
        console.log('Unknown Error Occurred');
        return false;
      }
      console.log('New broker has been successfully stored');
      return true;
    });
  }
}

module.exports = {
  BrokerRepo: BrokerRepository,
};
