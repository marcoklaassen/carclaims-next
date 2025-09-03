describe('CarClaims - Komplette Schadensmeldung E2E', () => {
  const testData = {
    // Accident Info
    accidentInfo: {
      language: 'Deutsch',
      accidentReportNumber: 'SCH-2025-001234',
      accidentDate: '15.01.2025',
      accidentTime: '14:30'
    },

    // Accident Location
    accidentLocation: {
      streetName: 'Musterstraße',
      houseNumber: '123',
      postalCode: '12345',
      city: 'Berlin',
      details: 'Vor dem Haupteingang'
    },

    // Versicherungsnehmer (Party A)
    insuranceHolder: {
      salutation: 'Divers',
      name: 'Max',
      surName: 'Mustermann',
      streetName: 'Teststraße',
      houseNumber: '456',
      postalCode: '10115',
      city: 'Berlin',
      telephone: '+49 30 12345678',
      email: 'max.mustermann@test.de'
    },

    // Vehicle Info A
    vehicleA: {
      vatDeduction: 'false',
      carBrand: 'BMW',
      carModel: 'X3',
      licensePlate: 'B-MW 1234',
      insuranceCompany: 'HDI AG',
      insuranceNumber: 'ALZ123456789',
      chassisNumber: 'WBXPC9C50DD012345',
      odometerReading: '45000',
      greenCardNumber: 'GC123456',
      allRiskInsurance: 'true'
    },

    // Driver Info A
    driverA: {
      isInsuredDriver: 'true',
      driverLicense: 'B1234567890',
      licenseIssuingAuthority: 'Stadt Berlin'
    },

    // Damage Location A
    damagedPartsA: ['Vorderer Stoßfänger', 'Fahrertür (vorne links)', 'Kotflügel rechts'],

    // Damage Description A
    damageDescriptionA: {
      damageDescription: 'Deutliche Kratzer und Dellen an der vorderen Stoßstange. Der Kotflügel ist eingedrückt.',
      additionalComments: 'Fahrzeug war zum Unfallzeitpunkt ordnungsgemäß geparkt.',
      vehicleOperational: 'true',
      damageType: 'Rangieren/ Parken'
    },

    // Unfallbeteiligte (Party B)
    otherParty: {
      salutation: 'Frau',
      name: 'Anna',
      surName: 'Schmidt',
      streetName: 'Beispielweg',
      houseNumber: '789',
      postalCode: '10117',
      city: 'Berlin',
      telephone: '+49 30 87654321',
      email: 'anna.schmidt@test.de'
    },

    // Vehicle Info B
    vehicleB: {
      vatDeduction: 'false',
      carBrand: 'Mercedes',
      carModel: 'C-Klasse',
      licensePlate: 'B-MB 5678',
      insuranceCompany: 'HUK-COBURG',
      insuranceNumber: 'HUK987654321',
      chassisNumber: 'WDD2050321A123456',
      odometerReading: '32000',
      greenCardNumber: 'GC654321',
      allRiskInsurance: 'false'
    },

    // Driver Info B
    driverB: {
      isInsuredDriver: 'false',
      driverSalutation: 'Herr',
      driverName: 'Peter',
      driverSurName: 'Müller',
      driverStreetName: 'Fahrerstraße',
      driverHouseNumber: '101',
      driverPostalCode: '10119',
      driverCity: 'Berlin',
      driverTelephone: '+49 30 11111111',
      driverEmail: 'peter.mueller@test.de',
      driverLicense: 'B0987654321',
      licenseIssuingAuthority: 'Stadt Berlin'
    },

    // Damage Location B
    damagedPartsB: ['Hinterer Stoßfänger', 'Schweller rechts'],

    // Damage Description B
    damageDescriptionB: {
      damageDescription: 'Stoßstange hinten ist stark beschädigt. Kennzeichen ist verbogen.',
      additionalComments: 'Rücklichter sind noch funktionsfähig.',
      vehicleOperational: 'true',
      damageType: 'Rangieren/ Parken'
    },

    // Injured Persons
    injuredPersons: 'true',
    injuredCount: 2,

    // Witnesses
    witnesses: {
      hasWitnesses: 'true',
      witnessesCount: 2,
      witnesses: [{
        salutation: 'Frau',
        name: 'Lisa',
        surName: 'Wagner',
        streetName: 'Zeugenstraße',
        houseNumber: '22',
        postalCode: '10120',
        city: 'Berlin',
        telephone: '+49 30 22222222',
        email: 'lisa.wagner@test.de'
      }, {
        salutation: 'Herr',
        name: 'Thomas',
        surName: 'Becker',
        streetName: 'Beobachterweg',
        houseNumber: '15',
        postalCode: '10125',
        city: 'Berlin',
        telephone: '+49 30 33333333',
        email: 'thomas.becker@test.de'
      }]
    },

    // Miscellaneous Damages
    miscellaneousDamages: {
      hasMiscellaneousDamages: 'true',
      description: 'Straßenlaterne wurde durch den Unfall beschädigt.'
    }
  }

  beforeEach(() => {
    cy.intercept('POST', '**/claimsdata/ALZ123456789', {
      statusCode: 201,
      body: {
        success: true,
        id: 'claim-123',
        policyholder: {
          policyNumber: 'ALZ123456789',
          personalInformation: {
            firstName: 'Max',
            lastName: 'Mustermann'
          }
        }
      }
    }).as('submitClaim')
  })

  it('sollte eine komplette Schadensmeldung erfolgreich durchlaufen', () => {
    // 1. START: Disclaimer Page
    cy.visit('/frida-carclaims/disclaimer')
    cy.get('h3').should('contain', 'Belehrung')
    cy.clickNext()

    // 2. ACCIDENT INFO
    cy.waitForPageLoad('/accidentinfo')
    cy.fillAccidentInfo(testData.accidentInfo)
    cy.clickNext()

    // 3. ACCIDENT LOCATION
    cy.waitForPageLoad('/accidentlocation')
    cy.get('[name="address"]').type(`${testData.accidentLocation.streetName} ${testData.accidentLocation.houseNumber}`)
    cy.get('[name="accidentPostalCode"]').type(testData.accidentLocation.postalCode)
    cy.get('[name="accidentCity"]').type(testData.accidentLocation.city)
    cy.get('[name="accidentDetails"]').type(testData.accidentLocation.details)
    cy.clickNext()

    // 4. PERSONAL INFO A (Versicherungsnehmer)
    cy.waitForPageLoad('/personalinfo/a')
    cy.fillPersonalInfo('a', testData.insuranceHolder)
    cy.clickNext()

    // 5. VEHICLE INFO A
    cy.waitForPageLoad('/vehicleinfo/a')
    cy.fillVehicleInfo('a', testData.vehicleA)
    cy.clickNext()

    // 6. DRIVER INFO A
    cy.waitForPageLoad('/driverinfo/a')
    cy.fillDriverInfo('a', testData.driverA)
    cy.clickNext()

    // 7. DAMAGE LOCATION A
    cy.waitForPageLoad('/damagelocation/a')
    cy.selectDamageLocation(testData.damagedPartsA)
    cy.clickNext()

    // 8. DAMAGE DESCRIPTION A
    cy.waitForPageLoad('/damagedescription/a')
    cy.fillDamageDescription('a', testData.damageDescriptionA)
    cy.clickNext()

    // 9. PERSONAL INFO B (Unfallbeteiligte)
    cy.waitForPageLoad('/personalinfo/b')
    cy.fillPersonalInfo('b', testData.otherParty)
    cy.clickNext()

    // 10. VEHICLE INFO B
    cy.waitForPageLoad('/vehicleinfo/b')
    cy.fillVehicleInfo('b', testData.vehicleB)
    cy.clickNext()

    // 11. DRIVER INFO B
    cy.waitForPageLoad('/driverinfo/b')
    cy.fillDriverInfo('b', testData.driverB)
    cy.clickNext()

    // 12. DAMAGE LOCATION B
    cy.waitForPageLoad('/damagelocation/b')
    cy.selectDamageLocation(testData.damagedPartsB)
    cy.clickNext()

    // 13. DAMAGE DESCRIPTION B
    cy.waitForPageLoad('/damagedescription/b')
    cy.fillDamageDescription('b', testData.damageDescriptionB)
    cy.clickNext()

    // 14. INJURED PERSONS
    cy.waitForPageLoad('/injuredpersons')
    cy.fillInjuredPersons(testData)
    cy.clickNext()

    // 15. MISCELLANEOUS DAMAGES
    cy.waitForPageLoad('/miscellaneousdamages')
    cy.get('[name="miscellaneousDamages"]').parent().find(`[value="${testData.miscellaneousDamages.hasMiscellaneousDamages}"]`).click()

    if (testData.miscellaneousDamages.hasMiscellaneousDamages === 'true') {
      cy.get('[name="miscellaneousDamageDescription"]').type(testData.miscellaneousDamages.description)
    }
    cy.clickNext()

    // 16. WITNESSES
    cy.waitForPageLoad('/witnesses')
    cy.fillWitnesses(testData)

    cy.clickNext()

    // 17. SUMMARY PAGE
    cy.waitForPageLoad('/summary')
    cy.contains('Zusammenfassung').should('be.visible')
    cy.contains('Allgemein').should('be.visible')

    // Accordion-Kacheln aufklappen
    cy.contains('Angaben zum Unfallort').click()
    cy.contains('Angaben zum Versicherungsnehmer').click()
    cy.contains('Angaben zum Fahrer (Versicherungsnehmer)').click()
    cy.contains('Angaben zum Fahrzeug (Versicherungsnehmer)').click()
    cy.contains('Angaben zu Zeugen').click()


    // Beispielwerte prüfen
    cy.contains(testData.accidentInfo.accidentReportNumber).should('be.visible')
    cy.contains(testData.insuranceHolder.name).should('be.visible')
    cy.contains(testData.vehicleA.carBrand).should('be.visible')
    cy.contains(testData.witnesses.witnesses[0].name).should('be.visible')

    // Absenden
    cy.contains('Bestätigen und weiter').should('be.visible')
    cy.get('button').contains('Bestätigen und weiter').click()

    // 18. SUBMIT CLAIM AND NAVIGATE TO SUCCESS PAGE
    cy.wait('@submitClaim').then((interception) => {
      expect(interception.response.statusCode).to.eq(201)
      expect(interception.request.url).to.include('/claimsdata/ALZ123456789')
    })

    // 19. SUCCESS PAGE
    cy.waitForPageLoad('/success')

    cy.url().should('include', '/success')

    // Verify success page content
    cy.contains('Ihre Daten wurden erfolgreich übermittelt!').should('be.visible')
    cy.contains('Datenübertragung abgeschlossen').should('be.visible')
    cy.contains('Sie erhalten in den nächsten 24 Stunden eine separate Bestätigung').should('be.visible')

    // Verify next steps list
    cy.contains('Was passiert als Nächstes:').should('be.visible')
    cy.contains('Wir prüfen Ihre übermittelten Daten').should('be.visible')
    cy.contains('Sie erhalten eine E-Mail-Bestätigung mit allen Details').should('be.visible')
    cy.contains('Bei Rückfragen kontaktieren wir Sie direkt').should('be.visible')
    cy.contains('Ihre Daten stehen in Ihrer Wallet zur Verfügung').should('be.visible')

    // Verify important notice
    cy.contains('Wichtiger Hinweis').should('be.visible')
    cy.contains('Bitte bewahren Sie die E-Mail-Bestätigung gut auf').should('be.visible')

    // Verify buttons are present
    cy.contains('Zurück zur Startseite').should('be.visible')
    cy.contains('Weiter zur Wallet').should('be.visible')

    // Test "Zurück zur Startseite" button
    // cy.contains('Zurück zur Startseite').click()
    // cy.url().should('include', '/frida-carclaims')
    cy.pause();
    cy.log('✅ Komplette Schadensmeldung erfolgreich durchlaufen!')
  })
})
