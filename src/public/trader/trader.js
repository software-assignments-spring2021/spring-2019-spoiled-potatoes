const { TraderRepo } = require('../trader_repo_test.js');

/*
this class will carry out all of the actions of a trader

it will interact with the trader_repo module in order to update the database
*/

class TraderModel {
  constructor(email, username) {
    this.email = email;
    this.username = username;
    this.repo = new TraderRepo();
  }

  register(password) {
    // registers a trader to the database
    return this.repo.post(this.email, this.username, password);
  }

  addPortfolioItem(portItem) {
    /*
     portfolio has yet to be well defined, so for testing this will
     probably just add some object as described in portfolio info
    */
    return this.repo.addPortfolioItem(this.username, portItem);
  }

  accountInfo() {
    this.repo.findUser(this.username).then(info => info);
  }

  portfolioInfo() {
    /*
    this should return information about portfolio assets tracked for the dashboard

    right now it will just return a list or an object with account type as
    the key and acount value as the value
    */
    return this.repo.getPortfolio(this.username);
  }
}

module.exports = {
  Trader: TraderModel,
};
