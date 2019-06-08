const axios = require('axios');
const { ExchangeError } = require('../../../services/errors');

const { FIXER_API_KEY } = process.env;

module.exports = function maybeGetRecordFromApiAndCacheIt(cacheClient) {
  return async function maybeGettingRecordFromApiAndCachingIt(req, res, next) {
    if (res.locals.cachedCurrencyPrices) {
      // data was found in cache so no need to make request to external api
      next();
      return;
    }

    try {
      // data not found in cache, making external api call
      const currencyCode = req.query.required_currency_code;
      const { data } = await axios.get(`http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}&base=${currencyCode}`);

      if (!data.success) {
        next(new ExchangeError());
        return;
      }

      cacheClient.set(currencyCode, JSON.stringify(data.rates), 'EX', 10);
      res.locals.cachedCurrencyPrices = data.rates;
      next();
    } catch (err) {
      next(new ExchangeError());
    }
  };
};
