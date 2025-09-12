describe('CarClaims - Geolocation Erfolg', () => {
  const testData = {
    accidentLocation: {
      streetName: 'Musterstraße',
      houseNumber: '123',
      postalCode: '12345',
      city: 'Berlin',
      details: 'Vor dem Haupteingang'
    }
  }

  beforeEach(() => {
    cy.intercept('GET', '/api/osm-reverse?lat=*&lon=*', {
      statusCode: 200,
      body: {
        place_id: 123456,
        osm_type: 'way',
        lat: '52.520008',
        lon: '13.404954',
        display_name: 'Musterstraße 123, 12345 Berlin, Deutschland',
        address: {
          house_number: testData.accidentLocation.houseNumber,
          road: testData.accidentLocation.streetName,
          neighbourhood: 'Mitte',
          suburb: 'Mitte',
          town: testData.accidentLocation.city,
          borough: 'Mitte',
          postcode: testData.accidentLocation.postalCode,
          country: 'Deutschland',
          country_code: 'de'
        },
        boundingbox: ['52.5199', '52.5201', '13.4048', '13.4050']
      }
    }).as('getAddress')
  })

  it('sollte Geolocation-Feature korrekt funktionieren', () => {
    // Mock geolocation API BEVOR die Seite geladen wird
    cy.visit('/accidentlocation', {
      onBeforeLoad: (win) => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((success) => {
          console.log('Geolocation getCurrentPosition called')

          // Simulate successful geolocation response
          success({
            coords: {
              latitude: 52.520008,
              longitude: 13.404954,
              accuracy: 10,
              altitude: null,
              altitudeAccuracy: null,
              heading: null,
              speed: null
            },
            timestamp: Date.now()
          })
        }).as('geolocationStub')
      }
    })

    cy.get('[name="geoloactionBtn"]').should('be.visible')
    cy.get('[name="geoloactionBtn"]').click()

    // Verify that geolocation was called
    cy.get('@geolocationStub').should('have.been.called')

    cy.wait('@getAddress')

    // Wait for the fields to be populated
    cy.get('[name="address"]').should('have.value', `${testData.accidentLocation.streetName} ${testData.accidentLocation.houseNumber}`, { timeout: 10000 })
    cy.get('[name="accidentPostalCode"]').should('have.value', testData.accidentLocation.postalCode)
    cy.get('[name="accidentCity"]').should('have.value', testData.accidentLocation.city)

    // Verify button is re-enabled after loading
    cy.get('[name="geoloactionBtn"]').should('not.be.disabled')
  })
})
