const {request}  =  require('chai');
const { Broker } = require('../src/public/broker/broker.js');

describe('Broker.register(password)', () => {
    it('should return ("UserExistsError", false) if a user already exists', () => {
        const name = 'testPass';
        const email = 'throwAway';
        const pass = 'badHardCoding';
        const expectedErr = 'UserExistsError';
        const expectedBool = false;

        const testTrader = new Broker(email, name);
        const result = testBroker.register(pass);

        expect(result[0]).to.be.equal(expectedBool);
        expect(result[1]).to.be.equal(expectedErr);
    })
})