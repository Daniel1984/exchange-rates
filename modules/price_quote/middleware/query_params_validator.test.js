const queryParamsValidarot = require('./query_params_validator');
const { ExchangeError } = require('../../../services/errors');

describe('queryParamsValidarot', () => {
  it('should call next callback with no arguments', () => {
    const nextSpy = jest.fn();
    const reqMock = {
      query: {
        required_currency_code: 'EUR',
        paying_currency_code: 'USD',
        amount: '100',
      },
    };

    queryParamsValidarot(reqMock, {}, nextSpy);
    expect(nextSpy.mock.calls[0][0]).toBeUndefined();
  });

  it('should call next callback with required_currency_code error', () => {
    const nextSpy = jest.fn();
    const reqMock = {
      query: {
        required_currency_code: 'd',
        paying_currency_code: 'USD',
        amount: '100',
      },
    };

    queryParamsValidarot(reqMock, {}, nextSpy);
    expect(nextSpy).toHaveBeenNthCalledWith(1, new ExchangeError({
      status: 403,
      message: 'Malformed values for: required_currency_code',
    }));
  });

  it('should call next callback with paying_currency_code error', () => {
    const nextSpy = jest.fn();
    const reqMock = {
      query: {
        required_currency_code: 'EUR',
        paying_currency_code: '123',
        amount: '50',
      },
    };

    queryParamsValidarot(reqMock, {}, nextSpy);
    expect(nextSpy).toHaveBeenNthCalledWith(1, new ExchangeError({
      status: 403,
      message: 'Malformed values for: paying_currency_code',
    }));
  });

  it('should call next callback with amount error', () => {
    const nextSpy = jest.fn();
    const reqMock = {
      query: {
        required_currency_code: 'EUR',
        paying_currency_code: 'USD',
        amount: 'ddf',
      },
    };

    queryParamsValidarot(reqMock, {}, nextSpy);
    expect(nextSpy).toHaveBeenNthCalledWith(1, new ExchangeError({
      status: 403,
      message: 'Malformed values for: amount',
    }));
  });

  it('should call next callback with required_currency_code, paying_currency_code and amount error', () => {
    const nextSpy = jest.fn();
    const reqMock = {
      query: {
        required_currency_code: '',
        paying_currency_code: '',
        amount: '',
      },
    };

    queryParamsValidarot(reqMock, {}, nextSpy);
    expect(nextSpy).toHaveBeenNthCalledWith(1, new ExchangeError({
      status: 403,
      message: 'Malformed values for: required_currency_code,paying_currency_code,amount',
    }));
  });
});
