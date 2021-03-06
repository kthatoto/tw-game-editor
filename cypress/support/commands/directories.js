Cypress.Commands.add('createDirectory', (type, directoryName, expectedMessage) => {
  cy.visitMapResources(type)
  cy.get(`.${type}`).contains('フォルダ作成').click()
  cy.wait(100)
  cy.get(`.${type} .dialog.-directoryCreate input.el-input__inner`).type(directoryName)
  cy.get(`.${type}`).contains('.dialog.-directoryCreate button.el-button', '作成').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('editDirectory', (type, beforeDirectoryName, directoryName, expectedMessage) => {
  cy.visitMapResources(type)
  cy.get(`.${type}`).contains(beforeDirectoryName).dblclick()
  cy.wait(100)
  cy.get(`.${type} .dialog.-directoryEdit input.el-input__inner`).clear().type(directoryName)
  cy.get(`.${type}`).contains('.dialog.-directoryEdit button.el-button', '更新').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('deleteDirectory', (type, directoryName, expectedMessage) => {
  cy.visitMapResources(type)
  cy.get(`.${type}`).contains('.resources__item', directoryName).find('svg').rightclick({ multiple: true })
  cy.wait(100)
  cy.get(`.${type}`).contains('.dialog.-objectDelete button.el-button', '削除').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})
