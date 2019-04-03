const { expect } = require('chai');

function add(first, second) {
  return first + second;
}

describe('add()', () => {
  it('should add two numbers', () => {
    // 1. ARRANGE
    const first = 2;
    const second = 3;
    const expected = 5;

    // 2. ACT
    const result = add(first, second);

    // 3. ASSERT
    expect(result).to.be.equal(expected);
  });
});
