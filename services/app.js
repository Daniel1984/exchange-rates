const logger = require('morgan');
const express = require('express');
const { cacheClient } = require('./cache_client');
const { ExchangeError } = require('./errors');

const app = express();

app.use(logger('dev'));

app.use('/api', require('../modules/price_quote')({ cacheClient }));
app.use('/api', require('../modules/healthcheck'));

// capture 404
app.use((req, res, next) => {
  next(new ExchangeError({ status: 404 }));
});

// capture exceptions
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err);
  next(err);
});

module.exports = app;
