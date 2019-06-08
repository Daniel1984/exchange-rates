[![Build Status](https://travis-ci.org/Daniel1984/exchange-rates.svg?branch=master)](https://travis-ci.org/Daniel1984/exchange-rates)

### Setup
1. make sure you have `redis` up and running
2. install dependencies `npm i`
3. add your `FIXER_API_KEY` in `.env` file
4. start server `npm start`
5. run tests `npm test` (tests are run on Travis upon push to remote)
6. run linting `npm run lint` (also run as precommit hook and on Travis)

### Configuration
For simplicity of local env development, all `env` variables are located in `.env` file so for example if your `redis` server is running on different port then change it there.

