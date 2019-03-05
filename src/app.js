const express = require('express');
// const { Trader } = require('./public/trader/trader.js');

const app = express();


app.get('/', (req, res) => {
  res.send('hello world');
});

// used to exemplify testing. delete after we have actual functions to test
function add(x, y) {
  return x + y;
}

app.listen(3000);

// delete after deleting add function
module.exports = add;
