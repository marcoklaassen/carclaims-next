describe('JWT Entry Test - Navigation bis Vehicle Info', () => {
  const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb2xpY3lOdW1iZXIiOiJWLTEyMy00NTYtNzg5LTAiLCJmb3JtT2ZBZGRyZXNzIjoiSGVyciIsInRpdGxlIjoiUHJvZi4iLCJsYXN0TmFtZSI6Ik11c3Rlcm1hbm4iLCJmaXJzdE5hbWUiOiJGcmlkYSIsInBvc3RhbENvZGUiOiIxMjM0NSIsImNpdHkiOiJCZXJsaW4iLCJzdHJlZXROYW1lIjoiVGVzdHN0cmHDn2UiLCJob3VzZU51bWJlciI6IjM0NSIsInRlbGVwaG9uZSI6Iis0OSAwMSAyMzQ1Njc4OSIsImVtYWlsQWRkcmVzcyI6ImZyaWRhLm11c3Rlcm1hbm5AZXhhbXBsZS5jb20iLCJpbnN1cmFuY2VDb21wYW55IjoiSERJIiwiY2hhc3Npc051bWJlciI6IldWV1paWjFKWjNXMzg2NzUyIiwibGljZW5zZVBsYXRlIjoiTS1BQiAxMjMiLCJjYXJCcmFuZCI6IlZvbGtzd2FnZW4iLCJjYXJNb2RlbCI6IkdvbGYiLCJpYXQiOjE3NjA5NjM3NzV9.9hNc8zmaowJ3zrX9zECzjC2BMGj7cYw8xtCD2FBZ58o';

  const jwtData = {
    policyNumber: 'V-123-456-789-0',
    formOfAddress: 'Herr',
    title: 'Prof.',
    lastName: 'Mustermann',
    firstName: 'Frida',
    postalCode: '12345',
    city: 'Berlin',
    streetName: 'Teststraße',
    houseNumber: '345',
    telephone: '+49 01 23456789',
    emailAddress: 'frida.mustermann@example.com',
    insuranceCompany: 'HDI',
    chassisNumber: 'WVWZZZ1JZ3W386752',
    licensePlate: 'M-AB 123',
    carBrand: 'Volkswagen',
    carModel: 'Golf'
  };

  // Test Data für die Schritte vor Personal Info (nicht im JWT enthalten)
  const testData = {
    accidentInfo: {
      language: 'Deutsch',
      accidentReportNumber: 'SCH-2025-001234',
      accidentDate: '15.01.2025',
      accidentTime: '14:30'
    },
    accidentLocation: {
      streetName: 'Unfallstraße',
      houseNumber: '99',
      postalCode: '10115',
      city: 'Berlin',
      details: 'Kreuzung vor Ampel'
    }
  };

  beforeEach(() => {
    // Intercept für mögliche API-Aufrufe
    cy.intercept('POST', '**/api/verify-token', {
      statusCode: 200,
      body: {
        success: true,
        data: jwtData
      }
    }).as('verifyToken');
  });

  it('sollte mit JWT Token bis Vehicle Info navigieren und vorausgefüllte Felder prüfen', () => {
    // 1. START: Disclaimer Page mit JWT Token
    cy.visit(`/?token=${testToken}`);
    cy.get('h1').should('contain', 'Belehrung');
    cy.clickNext();

    // 2. ACCIDENT INFO
    cy.waitForPageLoad('/accidentinfo');

    // Fülle Accident Info aus (nicht im JWT enthalten)
    cy.fillAccidentInfo(testData.accidentInfo);
    cy.clickNext();

    // 3. ACCIDENT LOCATION
    cy.waitForPageLoad('/accidentlocation');

    // Fülle Accident Location aus (nicht im JWT enthalten)
    cy.get('[name="address"]').type(`${testData.accidentLocation.streetName} ${testData.accidentLocation.houseNumber}`);
    cy.get('[name="accidentPostalCode"]').type(testData.accidentLocation.postalCode);
    cy.get('[name="accidentCity"]').type(testData.accidentLocation.city);
    cy.get('[name="accidentDetails"]').type(testData.accidentLocation.details);
    cy.clickNext();

    // 4. PERSONAL INFO A (Versicherungsnehmer) - JWT Daten sollten vorausgefüllt sein
    cy.waitForPageLoad('/personalinfo/a');

    // *** ÜBERPRÜFUNG DER JWT VORAUSGEFÜLLTEN PERSONAL INFO FELDER ***
    cy.log('**=== Überprüfung JWT Personal Info Felder ===**');

    // Überprüfe Anrede
    cy.get('[name="insuranceHolderSalutation"]').should('exist');
    cy.get('[name="insuranceHolderSalutation"]').parent().should('contain.text', jwtData.formOfAddress);

    // Überprüfe Titel
    cy.get('[name="insuranceHolderTitle"]').should('exist');
    cy.get('[name="insuranceHolderTitle"]').parent().should('contain.text', jwtData.title);

    // Überprüfe Vorname
    cy.get('[name="insuranceHolderName"]').should('have.value', jwtData.firstName);

    // Überprüfe Nachname
    cy.get('[name="insuranceHolderSurName"]').should('have.value', jwtData.lastName);

    // Überprüfe Adresse (kombiniert)
    cy.get('[name="address"]').should('have.value', `${jwtData.streetName} ${jwtData.houseNumber}`);

    // Überprüfe PLZ
    cy.get('[name="insuranceHolderPostalCode"]').should('have.value', jwtData.postalCode);

    // Überprüfe Stadt
    cy.get('[name="insuranceHolderCity"]').should('have.value', jwtData.city);

    // Überprüfe Telefon
    cy.get('[name="insuranceHolderTelephone"]').should('have.value', jwtData.telephone);

    // Überprüfe E-Mail
    cy.get('[name="insuranceHolderEmail"]').should('have.value', jwtData.emailAddress);

    cy.log('**=== Personal Info Felder erfolgreich geprüft ===**');
    cy.clickNext();

    // 5. VEHICLE INFO A - JWT Daten sollten vorausgefüllt sein
    cy.waitForPageLoad('/vehicleinfo/a');

    // *** ÜBERPRÜFUNG DER JWT VORAUSGEFÜLLTEN VEHICLE INFO FELDER ***
    cy.log('**=== Überprüfung JWT Vehicle Info Felder ===**');

    // Überprüfe Fahrzeugmarke
    cy.get('[name="carBrand"]').should('exist');
    cy.get('[name="carBrand"]').should('have.value', jwtData.carBrand);
    cy.log(`✓ Fahrzeugmarke: ${jwtData.carBrand}`);

    // Überprüfe Fahrzeugmodell
    cy.get('[name="carModel"]').should('have.value', jwtData.carModel);
    cy.log(`✓ Fahrzeugmodell: ${jwtData.carModel}`);

    // Überprüfe Kennzeichen
    cy.get('[name="licensePlate"]').should('have.value', jwtData.licensePlate);
    cy.log(`✓ Kennzeichen: ${jwtData.licensePlate}`);

    // Überprüfe Versicherungsgesellschaft
    cy.get('[name="insuranceCompany"]').should('have.value', jwtData.insuranceCompany);
    cy.log(`✓ Versicherungsgesellschaft: ${jwtData.insuranceCompany}`);

    // Überprüfe Versicherungsnummer (Policy Number)
    cy.get('[name="insuranceNumber"]').should('have.value', jwtData.policyNumber);
    cy.log(`✓ Versicherungsnummer: ${jwtData.policyNumber}`);

    // Überprüfe Fahrgestellnummer
    cy.get('[name="chassisNumber"]').should('have.value', jwtData.chassisNumber);
    cy.log(`✓ Fahrgestellnummer: ${jwtData.chassisNumber}`);

  });
});