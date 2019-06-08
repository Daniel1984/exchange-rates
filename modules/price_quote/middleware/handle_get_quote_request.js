const Big = require('big.js');

module.exports = function handleGetQuoteRequest(req, res) {
  const { paying_currency_code, amount } = req.query; // eslint-disable-line
  const { cachedCurrencyPrices } = res.locals;

  const bigDecimalAmount = Big(amount).times(cachedCurrencyPrices[paying_currency_code]);

  res
    .status(200)
    .json({
      paying_currency_code,
      amount: bigDecimalAmount,
    });
};
