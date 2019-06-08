const { ExchangeError } = require('../../../services/errors');

module.exports = function maybeGetRecordFromCache(cacheClient) {
  return function gettingRecordFromCache(req, res, next) {
    const cacheKey = req.query.required_currency_code;

    cacheClient.get(cacheKey, (err, cachedCurrencyPrices) => {
      if (err != null) {
        next(new ExchangeError());
        return;
      }

      if (cachedCurrencyPrices !== null) {
        res.locals.cachedCurrencyPrices = JSON.parse(cachedCurrencyPrices);
      }

      next();
    });
  };
};
