describe('CarClaims - Geolocation Fehler', () => {
  it('sollte Geolocation-Fehler korrekt behandeln', () => {
    cy.visit('/frida-carclaims/accidentlocation')

    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((success, error) => {
        setTimeout(() => {
          error({
            code: 1,
            message: 'User denied the request for Geolocation.'
          })
        }, 100)
      })
    })

    cy.get('[name="geoloactionBtn"]').click()

    // Verify fields remain empty
    cy.get('[name="address"]').should('have.value', '')
    cy.get('[name="accidentPostalCode"]').should('have.value', '')
    cy.get('[name="accidentCity"]').should('have.value', '')

    // Verify button is re-enabled after error
    cy.get('[name="geoloactionBtn"]').should('not.be.disabled')
  })
})
