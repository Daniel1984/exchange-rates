class ExchangeError extends Error {
  constructor(err = {}, ...args) {
    super(...args);
    this.status = err.status || 500;
    this.message = err.message || 'Oops. Something went wrong. Please try again later.';
    Error.captureStackTrace(this, ExchangeError);
  }
}

module.exports = {
  ExchangeError,
};
