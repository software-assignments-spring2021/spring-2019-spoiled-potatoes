const { TraderRepo } = require('../trader_repo.js');

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
    this.repo.post(this.username, password, this.email);
    return this.repo.findUser(this.username);
  }

  addPortfolioItem(portItem) {
    /*
     portfolio has yet to be well defined, so for testing this will
     probably just add some object as described in portfolio info
    */
    this.repo.addPortfolioItem(this.username, portItem);
  }

  accountInfo() {
    // could be changed to
    this.repo.findUser(this.username);
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
