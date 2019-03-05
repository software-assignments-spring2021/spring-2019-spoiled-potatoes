

class BrokerRepository {
  constructor() {
  	// testStorage will act as an in memory collection of Broker objects   
    this.testStorage = [];
  }

  store(tok) {
    try {
      this.testStorage.push({ token: tok });
      return true;
    } catch (error) {
      console.log('Store Error');
      return false;
    }
  }
}

module.exports = {
  BrokerRepo: BrokerRepository,
};
