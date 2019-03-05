const { expect } = require('chai');
const { BrokerRepo } = require('../src/public/broker_repo_test');

const brokerRepo = new BrokerRepo();

describe('store()', () => {
  it('should store broker API token', () => {
    // 1. ARRANGE
    const token = 'ABCD1234';

    // 2. ACT
    const stored = brokerRepo.store(token);

    // 3. ASSERT
    expect(stored).to.be.equal(true);
    expect(brokerRepo.testStorage.find(elem => elem.token === token)
      .token).to.be.equal(token);
  });
});