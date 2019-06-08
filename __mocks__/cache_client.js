jest.mock('../services/cache_client', () => ({
  cacheClient: {
    get: jest.fn(),
    set: jest.fn(),
  },
  closeCacheClient: jest.fn(),
}));
