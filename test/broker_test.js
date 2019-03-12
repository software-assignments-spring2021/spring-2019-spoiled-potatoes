const { expect } = require('chai')
const { Broker } = require('../src/public/broker_test.js');

const broker = new Broker();

//we create three functions on broker
// 1. store broker API    2.track securities delivered   3. recommend financial plans

//note that this dashboard mainly serves as a portfolio database and focus on trader side
describe('store()', () => {
  it('should store broker API token', () => {
    // 1. ARRANGE
    const agentname = 'cleo';
    const email = 'email@email.com';
    const password = '7875'

    // 2. ACT
    const stored = broker.store(username, email, password);

    // 3. ASSERT
    expect(stored).to.be.equal(true);
    expect(broker.testStorage.find(elem => elem.agentname === agentname)
      .agentname).to.be.equal(agentname);
  });
});

describe('deliverSecurities()', () => {
    it('should track the securities delivered by a certain agnet', () => {
      const agentname = 'jack';
      const agent = broker.deliverSecurities(agentname);
      expect(agent).to.not.be.equal(false);
      expect(agent.agentname).to.be.equal(agentname);
    });
});

describe('addFinancialPlans()', () => {
    it('should return the top financial plans for Traders', () => {
      const agentname = 'sam';
      const clientemail = 'email@email.com';
      const ref = '345SKHRY89'; //ref No. for each financial product delivered
  
      broker.post(agentname, clientemail, ref);
      const financialProduct = broker.addFinancialPlans(agentname, { asset: 1000 });
  
      expect(financialProduct[0]).to.be.equal(true);
      expect(financialProduct[0]).to.not.be.equal(false);
      expect(financialProduct[1].asset).to.be.equal(1000);
    });
  });
  



