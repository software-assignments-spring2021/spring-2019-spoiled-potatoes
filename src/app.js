const express = require('express');
// const { Trader } = require('./public/trader/trader.js');

const app = express();


app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(3000);
