describe('CarClaims - Validierung', () => {
  it('sollte Validierungsfehler korrekt anzeigen', () => {
    // Test validation on empty forms
    cy.visit('/frida-carclaims/accidentlocation')
    cy.clickNext()

    // Should show validation errors
    cy.get('.MuiFormHelperText-root.Mui-error').should('be.visible')
    cy.contains('erforderlich').should('be.visible')
  })
})
