// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
  cy.server({
    onAnyRequest: (route, proxy) => {
      proxy.xhr.setRequestHeader('cypress', 'true')
    }
  })

  cy.request({
    method: 'DELETE',
    url: 'http://localhost:3000/api/cypress/clean',
    headers: {
      cypress: true
    }
  })
  cy.visit('http://localhost:3000/')
})
