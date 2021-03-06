import 'cypress-file-upload'
import './commands/images'
import './commands/tiles'
import './commands/flags'
import './commands/directories'

Cypress.Commands.add('backToHome', (type) => {
  cy.get(`.${type} .resources__header .nav .home-icon`).first().click()
})

Cypress.Commands.add('goDirectory', (type, directory) => {
  cy.get(`.${type}`).contains('.resources__item', directory).find('svg').dblclick()
})

Cypress.Commands.add('goDirectories', (type, directories) => {
  directories.forEach(directory => cy.goDirectory(type, directory))
})

Cypress.Commands.add('visitMapResources', (type) => {
  cy.url().then(url => {
    if (!url.startsWith(`http://localhost:3000/map/${type}`)) {
      cy.visit(`http://localhost:3000/map/${type}`)
    }
  })
})
