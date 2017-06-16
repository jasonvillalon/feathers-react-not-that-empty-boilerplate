
/* eslint no-useless-escape: 0, quotes: 0 */

const path = require('path');
const defer = require('config/defer').deferConfig;

const root = process.cwd();

module.exports = {
  isProduction: defer(finalConfig => finalConfig.NODE_ENV === 'production'),
  // devserver, development or production. validated on server start up
  NODE_ENV: process.env.NODE_ENV,
  // npm debug
  DEBUG: undefined,
  server: {
    // host name e.g. localhost
    host: undefined,
    // port number for server
    port: undefined,
    // root folder with assets. Webpack bundles are written to ./dist
    publicPath: path.join(root, 'public'), // also some hard coding in server/app, webpack
  },
  logs: {
    // log level for the file. from highest: 'error', 'warn', 'info', 'verbose', 'debug', 'silly'
    logLevel: undefined,
    // folder where logs are saved
    path: undefined,
    // log file names
    fileName: 'server.log',
    // log level for the console
    logConsoleLevel: undefined,
  },
  host: 'localhost',
  port: 3030,
  public: '../public/',
  paginate: {
    default: 10,
    max: 50,
  },
  authentication: {
    secret: 'f2ac9c6bd208d84ef577d66f369931bd6114fade055157cbb96d9fd7ffb36c7ff7f2f9d3494cd7ad80625381ffe835974659c92b164cb297667851aa8dc999204c235ce8ae204c5995e932da2b562d3b0ac093e33008f68ead53cd7c1849ae4853a5968fd2c2f0ae8ffcb9902c3cfcd2a77f9f69c97ba27ea77130329d86e4cfd7cfabb5ce8427db287b4fce307ca33d022a2368dd98a449805e26fc0a9c425431e52a80d7f182b1e593fd0959f4d55fa16f494c855e1a8a58f05586558390ad22722a5b343656eb7a7fa8aa8ccfff79674435e76a21298b948e422011a5069945f745b180752016c58903b3a99f697fc939e2c1610026ee435a81b33c4f345c',
    strategies: [
      'jwt',
      'local',
    ],
    path: '/authentication',
    service: 'users',
    jwt: {
      header: {
        type: 'access',
      },
      audience: 'https://yourdomain.com',
      subject: 'anonymous',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
    local: {
      entity: 'user',
      service: 'users',
      usernameField: 'email',
      passwordField: 'password',
    },
    google: {
      clientID: 'your google client id',
      clientSecret: 'your google client secret',
      successRedirect: '/',
      scope: [
        'profile openid email',
      ],
    },
    facebook: {
      clientID: 'your facebook client id',
      clientSecret: 'your facebook client secret',
      successRedirect: '/',
      scope: [
        'public_profile',
        'email',
      ],
      profileFields: [
        'id',
        'displayName',
        'first_name',
        'last_name',
        'email',
        'gender',
        'profileUrl',
        'birthday',
        'picture',
        'permissions',
      ],
    },
    github: {
      clientID: 'your github client id',
      clientSecret: 'your github client secret',
      successRedirect: '/',
    },
    cookie: {
      enabled: true,
      name: 'feathers-jwt',
      httpOnly: false,
      secure: false,
    },
  },
  postgres: 'postgres://postgres:@localhost:5433/feathers_react',
  clientConfig: defer(finalConfig => ({
    client: {
      defaultRoute: finalConfig.client.defaultRoute,
    },
  })),
  client: {
    // Name of app
    appName: 'FeathersReactApp',
    // Route for app's root.
    // Used by Express middleware, React-Router config, and app when redirecting.
    defaultRoute: '/',
  },
};
