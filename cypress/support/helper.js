/**
 * Contains Helper commands
 */

// Click next button
Cypress.Commands.add('clickNext', () => {
  cy.get('.next-button').should('be.visible').click()
})

// Wait for page load
Cypress.Commands.add('waitForPageLoad', (expectedPath) => {
  cy.url().should('include', expectedPath)
  cy.get('.form-content').should('be.visible')
})

// Select damage location
Cypress.Commands.add('selectDamageLocation', (damagedParts) => {
  damagedParts.forEach(part => {
    cy.get('.MuiSelect-select').click()
    cy.get('[role="listbox"]').contains(part).click()
  })
})
