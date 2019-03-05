const { BrokerRepo } = require('../broker_repo.js');

/*
this class will be the parent class for all broker objects. This will store connection parameters.

it will interact with the broker_repo module in order to update the database
*/

class BrokerModel {
  constructor(token) {
    this.token = token;
    this.repo = new BrokerRepo();
  }

  register() {
    // registers a broker to the database
    return this.repo.store(this.token);
  }
}

module.exports = {
  Broker: BrokerModel,
};
