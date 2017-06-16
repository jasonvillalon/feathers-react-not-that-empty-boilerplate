require('babel-polyfill');

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Feathers-React',
    description: 'Empty Boiler Plate',
    head: {
      titleTemplate: 'Feathers-React: %s',
      meta: [
        { name: 'description', content: 'Boiler Plate' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Feathers-React' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Feathers-React' },
        { property: 'og:description', content: 'Boiler Plate' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@y0h' },
        { property: 'og:creator', content: '@y0h' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' },
      ],
    },
  },
}, environment);
