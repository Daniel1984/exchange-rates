const redis = require('redis');

const {
  REDIS_PORT,
  REDIS_HOST,
} = process.env;

const cacheClient = redis.createClient(`redis://${REDIS_HOST}:${REDIS_PORT}`);

cacheClient.on('error', (err) => {
  console.log(`Cache cacheClient Error ${err}`);
});

function closeCacheClient() {
  cacheClient.quit();
}

module.exports = {
  cacheClient,
  closeCacheClient,
};
