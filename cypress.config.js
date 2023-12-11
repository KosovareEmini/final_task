const { defineConfig } = require("cypress");

module.exports = {
    // projectId: "q5q4r8",
    // recordKey: '4d55089d-a771-41a9-b003-4b381b148ae9',
    e2e: {
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
      "supportFile": false,
    },
    // other configuration options
  };