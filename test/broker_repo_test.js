const { expect } = require('chai');
const { BrokerRepo } = require('../src/public/broker_repo_test');

const brokerRepo = new BrokerRepo();

describe('post()', () => {
  it('should register user', () => {
    // 1. ARRANGE
    const token = 'ABCD1234';

    // 2. ACT
    const registered = brokerRepo.post(token);

    // 3. ASSERT
    expect(registered).to.be.equal(true);
    expect(brokerRepo.testStorage.find(elem => elem.token === token)
      .token).to.be.equal(token);
  });
});