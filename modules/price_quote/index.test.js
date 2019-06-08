const request = require('supertest');
const app = require('../../services/app');
const { cacheClient } = require('../../services/cache_client');

describe('/api/quote?required_currency_code=EUR&amount=100&paying_currency_code=ILS', () => {
  it('should return 200', () => {
    cacheClient.get.mockImplementation((key, cb) => {
      cb(null, JSON.stringify({ ILS: 4.05269 }));
    });

    return request(app)
      .get('/api/quote?required_currency_code=EUR&amount=100&paying_currency_code=ILS')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('should return correct response payload', async () => {
    cacheClient.get.mockImplementation((key, cb) => {
      cb(null, JSON.stringify({ ILS: 4.05269 }));
    });

    const { body } = await request(app)
      .get('/api/quote?required_currency_code=EUR&amount=100&paying_currency_code=ILS');

    expect(body).toEqual({
      paying_currency_code: 'ILS',
      amount: '405.269',
    });
  });
});

describe('GET: /api/quote', () => {
  it('should return 403', () => {
    cacheClient.get.mockImplementation((key, cb) => {
      cb(null, null);
    });

    return request(app)
      .get('/api/quote')
      .expect('Content-Type', /json/)
      .expect(403);
  });
});
