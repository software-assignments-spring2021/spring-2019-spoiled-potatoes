

class BrokerRepository {
  constructor() {
  	// testStorage will act as an in memory collection of Trader objects   
    this.testStorage = [];
  }

  post(tok) {
    try {
      this.testStorage.push({ token: tok });
      return true;
    } catch (error) {
      console.log('Registration Error');
      return false;
    }
  }
}

module.exports = {
  BrokerRepo: BrokerRepository,
};
