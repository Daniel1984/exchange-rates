const express = require('express');
const { getQuoteMiddleware } = require('./middleware');

const router = express.Router();

module.exports = ({ cacheClient }) => {
  router.get('/quote', getQuoteMiddleware(cacheClient));

  return router;
};
