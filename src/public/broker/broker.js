const { BrokerRepo } = require('../broker_repo.js');

/*
this class will carry out all of the actions of a broker

it will interact with the broker_repo module in order to update the database
*/

class BrokerModel {
  constructor(token) {
    this.token = token;
    this.repo = new BrokerRepo();
  }

  register(password) {
    // registers a trader to the database
    return this.repo.post(this.token);
  }
}

module.exports = {
  Broker: BrokerModel,
};
