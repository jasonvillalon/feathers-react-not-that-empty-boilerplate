
/* eslint no-console: 0, no-param-reassign: 0 */
const config = require('config');

const debug = require('debug')('service:index');

const users = require('./users/users.service.js');

const tryHook = require('./hooks/tryHook');

const logger = require('../utils/loggerProduction');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  const auth = require('feathers-authentication').hooks;
  console.log(auth);
  app.configure(users);

  // get client config file
  app.use('/config', {
    get() {
      return Promise.resolve(config.clientConfig);
    },
  });

  // create log entry
  app.use('/logs', {
    before: {
      create: [
        // tryHook(auth.authenticate('jwt')),
        // tryHook(auth.service.user.populateUser()),
      ],
    },
    create({ level, msg, payload }, params) {
      const paramsUser = params.user;

      if (paramsUser && (paramsUser.email || paramsUser.username)) {
        payload.user = payload.user || {};

        if (paramsUser.email) {
          payload.user.email = paramsUser.email;
        }
        if (paramsUser.username) {
          payload.user.username = paramsUser.username;
        }
      }

      if (!payload.tags) {
        payload.tags = 'client';
      }

      logger[level](msg, payload);

      // Note: Redux's action.payload will contain undefined instead of null
      return Promise.resolve(null);
    },
  });

  debug('Config complete');
};
