// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const cypressNuxt = require('cypress-nuxt');

module.exports = (on, config) => {
  return cypressNuxt.plugin().then(function (webpackPreProcessor) {
    on("file:preprocessor", webpackPreProcessor);

    return config;
  });
};
