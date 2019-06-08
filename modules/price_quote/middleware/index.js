const queryParamsValidarot = require('./query_params_validator');
const maybeGetRecordFromCache = require('./maybe_get_record_from_cache');
const maybeGetRecordFromApiAndCacheIt = require('./maybe_get_record_from_api_and_cache_it');
const handleGetQuoteRequest = require('./handle_get_quote_request');

/*
 * The idea behind it is to construct a chain of midleware needed to satisfy certain
 * requests while keeping it modular and easy to add/remove another middleware. At
 * the same time router should only know that there's getQuoteMiddleware and
 * shouldn't know anything about inner workings of it.
 */

module.exports = {
  getQuoteMiddleware: cacheClient => ([
    queryParamsValidarot,
    maybeGetRecordFromCache(cacheClient),
    maybeGetRecordFromApiAndCacheIt(cacheClient),
    handleGetQuoteRequest,
  ]),
};
