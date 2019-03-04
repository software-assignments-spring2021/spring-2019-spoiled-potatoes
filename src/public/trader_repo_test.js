

class TraderRepository {
  constructor() {
    // testStorage will act as an in memory collection of Trader objects
    this.testStorage = [];
  }

  post(usr, password, em) {
    try {
      this.testStorage.push({ username: usr, email: em });
      return true;
    } catch (error) {
      console.log('Registration Error');
      return false;
    }
  }

  getPortfolio(usr) {
    this.testStorage.forEach((elem) => {
      if (elem.username === usr) {
        if (Object.prototype.hasOwnProperty.call(elem, 'portfolio')) {
          return elem.portfolio;
        }
      }
      return false;
    });
  }

  findUser(usr) {
    this.testStorage.forEach((elem) => {
      if (elem.username === usr) {
        return elem;
      }
      return false;
    });
  }

  addPortfolioItem(usr, portObj) {
    // returns false + empty object tuple if usr not found, true + changed portfolio if found
    try {
      let retVal = {};
      let usrFlag = false;
      this.testStorage.forEach((elem) => {
        if (elem.username === usr) {
          usrFlag = true;
          elem.portfolio.assign(portObj);
          retVal = elem.portfolio;
        }
      });
      return (usrFlag, retVal);
    } catch (error) {
      console.log('encountered error: ', error);
      return (false, error);
    }
  }
}

module.exports = {
  TraderRepo: TraderRepository,
};
