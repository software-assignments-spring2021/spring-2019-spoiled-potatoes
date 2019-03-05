// this file is used only as an example for understanding
// the testing framework, mocha
// mocha tutorial: https://hackernoon.com/a-crash-course-on-testing-with-node-js-6c7428d3da02

const { expect } = require('chai');
const add = require('../src/app');

describe('add()', () => {
  it('should add two numbers', () => {
    // 1. ARRANGE
    const x = 5;
    const y = 1;
    const sum1 = x + y;

    // 2. ACT
    const sum2 = add(x, y);

    // 3. ASSERT
    expect(sum2).to.be.equal(sum1);
  });
});
