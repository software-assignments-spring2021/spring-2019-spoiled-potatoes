const { expect } = require('chai');
const { Trader } = require('../src/public/trader/trader.js');

describe('Trader.register(password)', () => {
  it('should return ("UserExistsError", false) if a user already exists', () => {
    // user "testPass" already exists in test mongo dB
    const name = 'testPass';
    const email = 'throwAway';
    const pass = 'badHardCoding';
    const expectedErr = 'UserExistsError';
    const expectedBool = false;

    const testTrader = new Trader(email, name);
    const result = testTrader.register(pass);

    expect(result[0]).to.be.equal(expectedBool);
    expect(result[1]).to.be.equal(expectedErr);
  });
});
