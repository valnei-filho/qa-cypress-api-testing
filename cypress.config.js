const { defineConfig } = require('cypress');

module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',

  e2e: {

    baseUrl: 'https://restful-booker.herokuapp.com',

    setupNodeEvents(on, config) {

      require('cypress-mochawesome-reporter/plugin')(on);

      return config;

    },

  },

});