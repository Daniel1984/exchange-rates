require('dotenv').config();

const app = require('./services/app');
const { closeCacheClient } = require('./services/cache_client');

const {
  PORT,
  HOST,
  SERVICE_NAME,
} = process.env;

// start server
const server = app.listen(PORT, HOST, () => {
  console.log('%s listening at http://%s:%s', SERVICE_NAME, HOST, PORT);
});

// gracefully handle various process termination scenarios
['SIGHUP', 'SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    console.info(`${signal} signal received. Closing http server.`);

    server.close(() => {
      closeCacheClient();
      process.exit(0);
    });
  });
});
