const Validator = require('fastest-validator');
const { ExchangeError } = require('../../../services/errors');

const v = new Validator();

const schema = {
  required_currency_code: {
    type: 'string',
    pattern: /^[A-Z]+$/,
    length: 3,
  },
  paying_currency_code: {
    type: 'string',
    pattern: /^[A-Z]+$/,
    length: 3,
  },
  amount: {
    empty: false,
    type: 'string',
    pattern: /^(\d)*$/,
  },
};

module.exports = (req, res, next) => {
  // validQueryParams can be <boolean: true> or <array: [{ field: string, ... }]>
  const validQueryParams = v.validate(req.query, schema);

  switch (typeof validQueryParams) {
    case 'boolean':
      next();
      break;
    default:
      next(new ExchangeError({
        status: 403,
        message: `Malformed values for: ${validQueryParams.map(({ field }) => field)}`,
      }));
  }
};
