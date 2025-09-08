/**
 * Contains Steps commands - Main form filling operations
 */

Cypress.Commands.add('fillAccidentInfo', (data) => {
  cy.log('**=== Unfallinformationen ===**')

  cy.get('[name="language"]').parent().find('.MuiSelect-select').click()
  cy.get('[role="listbox"]').contains(data.language).click()

  // Accident report number
  cy.get('[name="accidentReportNumber"]').clear().type(data.accidentReportNumber)
})


Cypress.Commands.add('fillPersonalInfo', (formType, data) => {
  cy.log('**=== Persönliche Informationen ===**')

  cy.getSectionFields(formType, 'personalInfo').then((fields) => {
    cy.get(`[name="${fields.salutation}"]`).parent().find('.MuiSelect-select').click()
    cy.get('[role="listbox"]').contains(data.salutation).click()

    if (data.title) {
      cy.get(`[name="${fields.title}"]`).parent().find('.MuiSelect-select').click()
      cy.get('[role="listbox"]').contains(data.title).click()
    }

    cy.get(`[name="${fields.name}"]`).clear().type(data.name)
    cy.get(`[name="${fields.surName}"]`).clear().type(data.surName)
    cy.get(`[name="address"]`).clear().type(`${data.streetName} ${data.houseNumber}`)
    cy.get(`[name="${fields.postalCode}"]`).clear().type(data.postalCode)
    cy.get(`[name="${fields.city}"]`).clear().type(data.city)
    cy.get(`[name="${fields.telephone}"]`).clear().type(data.telephone)
    cy.get(`[name="${fields.email}"]`).clear().type(data.email)
  })
})

// Fill vehicle info
Cypress.Commands.add('fillVehicleInfo', (formType, data) => {
  cy.log('**=== Fahrzeugdaten ===**')

  cy.getSectionFields(formType, 'vehicleInfo').then((fields) => {
    // VAT Deduction - RadioGroup
    cy.get(`[name="${fields.vatDeduction}"]`).parent().find(`[value="${data.vatDeduction}"]`).click()

    cy.get(`[name="${fields.carBrand}"]`).clear().type(data.carBrand)
    cy.get(`[name="${fields.carModel}"]`).clear().type(data.carModel)
    cy.get(`[name="${fields.licensePlate}"]`).clear().type(data.licensePlate)
    cy.get(`[name="${fields.insuranceCompany}"]`).clear().type(data.insuranceCompany)
    cy.get(`[name="${fields.insuranceNumber}"]`).clear().type(data.insuranceNumber)
    cy.get(`[name="${fields.chassisNumber}"]`).clear().type(data.chassisNumber)
    cy.get(`[name="${fields.odometerReading}"]`).clear().type(data.odometerReading)
    cy.get(`[name="${fields.greenCardNumber}"]`).clear().type(data.greenCardNumber)

    // All Risk Insurance - RadioGroup
    cy.get(`[name="${fields.allRiskInsurance}"]`).parent().find(`[value="${data.allRiskInsurance}"]`).click()
  })
})

// Fill driver info
Cypress.Commands.add('fillDriverInfo', (formType, data) => {
  cy.log('**=== Fahrerdaten ===**')

  cy.getSectionFields(formType, 'driverInfo').then((fields) => {
    cy.get(`[name="${fields.isInsuredDriver}"]`).parent().find(`[value="${data.isInsuredDriver}"]`).click()

    if (data.isInsuredDriver === 'false') {
      // Driver salutation
      cy.get(`[name="${fields.salutation}"]`).parent().find('.MuiSelect-select').click()
      cy.get('[role="listbox"]').contains(data.driverSalutation).click()

      cy.get(`[name="${fields.name}"]`).clear().type(data.driverName)
      cy.get(`[name="${fields.surName}"]`).clear().type(data.driverSurName)

      cy.get(`[name="address"]`).clear().type(`${data.driverStreetName} ${data.driverHouseNumber}`)
      cy.get(`[name="${fields.postalCode}"]`).clear().type(data.driverPostalCode)
      cy.get(`[name="${fields.city}"]`).clear().type(data.driverCity)
      cy.get(`[name="${fields.telephone}"]`).clear().type(data.driverTelephone)
      cy.get(`[name="${fields.email}"]`).clear().type(data.driverEmail)
    }

    // Driver license fields
    cy.get(`[name="${fields.driverLicense}"]`).clear().type(data.driverLicense)
    cy.get(`[name="${fields.licenseIssuingAuthority}"]`).clear().type(data.licenseIssuingAuthority)
  })
})

// Fill injured persons form
Cypress.Commands.add('fillInjuredPersons', (data) => {
  cy.log('**=== Verletzte Personen ===**')

  cy.get('[name="hasInjured"]').parent().find(`[value="${data.injuredPersons}"]`).click()

  if (data.injuredPersons === 'true') {
    // Wait for the number input container to appear
    cy.get('.number-input-container').should('be.visible')

    cy.get('[name="injuredCount"]').then(($input) => {
      const currentValue = parseInt($input.val()) || 0
      const targetValue = data.injuredCount
      const clicksNeeded = targetValue - currentValue

      if (clicksNeeded > 0) {
        for (let i = 0; i < clicksNeeded; i++) {
          cy.get('.number-btn').last().click()
        }
      }
    })

    // Verify the count is correct
    cy.get('[name="injuredCount"]').should('have.value', data.injuredCount.toString())
  }
})

// Fill witnesses form
Cypress.Commands.add('fillWitnesses', (data) => {
  cy.log('**=== Zeugen ===**')

  const hasWitnessesValue = data.witnesses.hasWitnesses === 'true' // Convert string to boolean comparison
  cy.get('[name="hasWitnesses"]').parent().find(`[value="${hasWitnessesValue}"]`).click()

  if (data.witnesses.hasWitnesses === 'true') {
    // Wait for the number input container to appear
    cy.get('.number-input-container').should('be.visible')

    cy.get('[name="witnessesCount"]').then(($input) => {
      const currentValue = parseInt($input.val()) || 0
      const targetValue = data.witnesses.witnessesCount
      const clicksNeeded = targetValue - currentValue

      if (clicksNeeded > 0) {
        for (let i = 0; i < clicksNeeded; i++) {
          cy.get('.number-btn').last().click()
        }
      }
    })

    // Verify the count is correct
    cy.get('[name="witnessesCount"]').should('have.value', data.witnesses.witnessesCount.toString())

    // Fill witness data for each witness
    data.witnesses.witnesses.forEach((witness, index) => {
      // Salutation dropdown
      cy.get(`[name="witnesses[${index}].salutation"]`).parent().find('.MuiSelect-select').click()
      cy.get('[role="listbox"]').contains(witness.salutation).click()

      // Title dropdown (if title is provided)
      if (witness.title) {
        cy.get(`[name="witnesses[${index}].title"]`).parent().find('.MuiSelect-select').click()
        cy.get('[role="listbox"]').contains(witness.title).click()
      }

      // Fill witness personal data
      cy.get(`[name="witnesses[${index}].name"]`).type(witness.name)
      cy.get(`[name="witnesses[${index}].surName"]`).type(witness.surName)

      cy.get('[name="address"]').eq(index).type(`${witness.streetName} ${witness.houseNumber}`)

      cy.get(`[name="witnesses[${index}].postalCode"]`).type(witness.postalCode)
      cy.get(`[name="witnesses[${index}].city"]`).type(witness.city)
      cy.get(`[name="witnesses[${index}].telephone"]`).type(witness.telephone)
      cy.get(`[name="witnesses[${index}].email"]`).type(witness.email)
    })
  }
})

// Fill damage description
Cypress.Commands.add('fillDamageDescription', (formType, data) => {
  cy.log('**=== Schadensbeschreibung ===**')

  cy.getSectionFields(formType, 'damageDescription').then((fields) => {
    cy.get(`[name="${fields.damageDescription}"]`).clear().type(data.damageDescription)
    cy.get(`[name="${fields.additionalComments}"]`).clear().type(data.additionalComments)

    // Vehicle operational
    cy.get(`[name="${fields.vehicleOperational}"]`).parent().find(`[value="${data.vehicleOperational}"]`).click()

    // Damage type
    cy.get(`[name="${fields.damageType}"]`).parent().find('.MuiSelect-select').click()
    cy.get('[role="listbox"]').contains(data.damageType).click()
  })
})
