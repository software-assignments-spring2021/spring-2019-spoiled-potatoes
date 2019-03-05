const { expect } = require('chai');
const { TraderRepo } = require('../src/public/trader_repo_test');

const traderRepo = new TraderRepo();

describe('post()', () => {
  it('should register user', () => {
    // 1. ARRANGE
    const username = 'ignacio';
    const email = 'email@email.com';
    const password = '1234';

    // 2. ACT
    const registered = traderRepo.post(email, username, password);

    // 3. ASSERT
    expect(registered).to.be.equal(true);
    expect(traderRepo.testStorage.find(elem => elem.username === username)
      .username).to.be.equal(username);
  });
});

describe('findUser()', () => {
  it('should retrieve a user', () => {
    // 1. ARRANGE
    const username = 'ignacio';

    // 2. ACT
    const usr = traderRepo.findUser(username);

    // 3. ASSERT
    expect(usr).to.not.be.equal(false);
    expect(usr.username).to.be.equal(username);
  });
});

describe('addPortfolioItem()', () => {
  it('should update an existing user portfolio and return it', () => {
    const username = 'sam';
    const email = 'email@email.com';
    const password = '1234';

    traderRepo.post(email, username, password);

    const portfolio = traderRepo.addPortfolioItem(username, { asset: 1000 });

    expect(portfolio[0]).to.be.equal(true);
    expect(portfolio[0]).to.not.be.equal(false);
    expect(portfolio[1].asset).to.be.equal(1000);
  });
});
