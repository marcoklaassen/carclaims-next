import * as Yup from 'yup';

export type FormType = 'a' | 'b';

// =============================================================================
// DAMAGE PARTS OPTIONS
// =============================================================================

export const AVAILABLE_DAMAGE_PARTS = [
  'Motorhaube',
  'Dach',
  'Kofferraum/Heckklappe',
  'Kühlergrill',
  'Linke Fahrzeugseite',
  'Rechte Fahrzeugseite',
  'Vorderer Stoßfänger',
  'Hintere Stoßfänger',
  'Fahrertür (vorne links)',
  'Beifahrertür (vorne rechts)',
  'Hintere linke Tür',
  'Hintere rechte Tür',
  'Vorderrad links',
  'Vorderrad rechts',
  'Hinterrad links',
  'Hinterrad rechts',
  'Windschutzscheibe',
  'Heckscheibe',
  'Seitenscheibe (vorne links)',
  'Seitenscheibe (vorne rechts)',
  'Seitenscheibe (hinten links)',
  'Seitenscheibe (hinten rechts)',
  'Linker Außenspiegel',
  'Rechter Außenspiegel',
  'Frontscheinwerfer links',
  'Frontscheinwerfer rechs',
  'Heckscheinwerfer links',
  'Heckscheinwerfer rechts',
  'Griffschalen (vorne links)',
  'Griffschalen (vorne rechts)',
  'Griffschalen (hinten links)',
  'Griffschalen (hinten rechts)',
  'Schweller links',
  'Schweller rechts'
];

// =============================================================================
// FIELD MAPPINGS
// =============================================================================

export const PERSONAL_INFO_FIELDS = {
  a: {
    salutation: 'insuranceHolderSalutation',
    name: 'insuranceHolderName',
    surName: 'insuranceHolderSurName',
    streetName: 'insuranceHolderStreetName',
    houseNumber: 'insuranceHolderHouseNumber',
    postalCode: 'insuranceHolderPostalCode',
    city: 'insuranceHolderCity',
    telephone: 'insuranceHolderTelephone',
    email: 'insuranceHolderEmail',
  },
  b: {
    salutation: 'otherInsuranceHolderSalutation',
    name: 'otherInsuranceHolderName',
    surName: 'otherInsuranceHolderSurName',
    streetName: 'otherInsuranceHolderStreetName',
    houseNumber: 'otherInsuranceHolderHouseNumber',
    postalCode: 'otherInsuranceHolderPostalCode',
    city: 'otherInsuranceHolderCity',
    telephone: 'otherInsuranceHolderTelephone',
    email: 'otherInsuranceHolderEmail',
  },
} as const;

export const VEHICLE_INFO_FIELDS = {
  a: {
    vatDeduction: 'vatDeduction',
    carBrand: 'carBrand',
    carModel: 'carModel',
    licensePlate: 'licensePlate',
    insuranceCompany: 'insuranceCompany',
    insuranceNumber: 'insuranceNumber',
    chassisNumber: 'chassisNumber',
    odometerReading: 'odometerReading',
    greenCardNumber: 'greenCardNumber',
    validDateGreenCard: 'validDateGreenCard',
    allRiskInsurance: 'allRiskInsurance',
  },
  b: {
    vatDeduction: 'otherVatDeduction',
    carBrand: 'otherCarBrand',
    carModel: 'otherCarModel',
    licensePlate: 'otherLicensePlate',
    insuranceCompany: 'otherInsuranceCompany',
    insuranceNumber: 'otherInsuranceNumber',
    chassisNumber: 'otherChassisNumber',
    odometerReading: 'otherOdometerReading',
    greenCardNumber: 'otherGreenCardNumber',
    validDateGreenCard: 'otherValidDateGreenCard',
    allRiskInsurance: 'otherAllRiskInsurance',
  },
} as const;

export const DRIVER_INFO_FIELDS = {
  a: {
    isInsuredDriver: 'isInsuredDriver',
    salutation: 'driverSalutation',
    name: 'driverName',
    surName: 'driverSurName',
    streetName: 'driverStreetName',
    houseNumber: 'driverHouseNumber',
    postalCode: 'driverPostalCode',
    city: 'driverCity',
    telephone: 'driverTelephone',
    email: 'driverEmail',
    driverLicense: 'driverDriverLicense',
    licenseIssuingAuthority: 'driverLicenseIssuingAuthority',
  },
  b: {
    isInsuredDriver: 'otherIsInsuredDriver',
    salutation: 'otherDriverSalutation',
    name: 'otherDriverName',
    surName: 'otherDriverSurName',
    streetName: 'otherDriverStreetName',
    houseNumber: 'otherDriverHouseNumber',
    postalCode: 'otherDriverPostalCode',
    city: 'otherDriverCity',
    telephone: 'otherDriverTelephone',
    email: 'otherDriverEmail',
    driverLicense: 'otherDriverDriverLicense',
    licenseIssuingAuthority: 'otherDriverLicenseIssuingAuthority',
  },
} as const;

export const DAMAGE_LOCATION_FIELDS = {
  a: {
    damagedParts: 'driverDamagedParts',
  },
  b: {
    damagedParts: 'otherDriverDamagedParts',
  },
} as const;

export const DAMAGE_DESCRIPTION_FIELDS = {
  a: {
    damageDescription: 'damageDescription',
    additionalComments: 'additionalComments',
    vehicleOperational: 'vehicleOperational',
    damageType: 'damageType',
    fileUploads: 'driverFileUploads',
  },
  b: {
    damageDescription: 'otherDamageDescription',
    additionalComments: 'otherAdditionalComments',
    vehicleOperational: 'otherVehicleOperational',
    damageType: 'otherDamageType',
    fileUploads: 'otherDriverFileUploads',
  },
} as const;

// =============================================================================
// NAVIGATION ROUTES
// =============================================================================

export const FORM_ROUTES = {
  personalInfo: {
    a: '/frida-carclaims/vehicleinfo/a',
    b: '/frida-carclaims/vehicleinfo/b',
  },
  vehicleInfo: {
    a: '/frida-carclaims/driverinfo/a',
    b: '/frida-carclaims/driverinfo/b',
  },
  driverInfo: {
    a: '/frida-carclaims/damagelocation/a',
    b: '/frida-carclaims/damagelocation/b',
  },
  damageLocation: {
    a: '/frida-carclaims/damagedescription/a',
    b: '/frida-carclaims/damagedescription/b',
  },
  damageDescription: {
    a: '/frida-carclaims/personalinfo/b',
    b: '/frida-carclaims/injuredpersons',
  },
} as const;

// =============================================================================
// VALIDATION SCHEMAS
// =============================================================================

// Gemeinsame Validierungsregeln
const VALIDATION_RULES = {
  name: Yup.string()
    .min(2, 'Vorname muss mindestens 2 Zeichen lang sein')
    .max(50, 'Vorname darf maximal 50 Zeichen lang sein')
    .required('Vorname ist erforderlich'),

  surName: Yup.string()
    .min(2, 'Nachname muss mindestens 2 Zeichen lang sein')
    .max(50, 'Nachname darf maximal 50 Zeichen lang sein')
    .required('Nachname ist erforderlich'),

  streetName: Yup.string()
    .min(3, 'Straßenname muss mindestens 3 Zeichen lang sein')
    .required('Straßenname ist erforderlich'),

  houseNumber: Yup.string().required('Hausnummer ist erforderlich'),

  postalCode: Yup.string()
    .matches(/^\d{5}$/, 'PLZ muss genau 5 Ziffern enthalten')
    .required('PLZ ist erforderlich'),

  city: Yup.string()
    .min(2, 'Ort muss mindestens 2 Zeichen lang sein')
    .required('Ort ist erforderlich'),

  telephone: Yup.string()
    .matches(/^[\d\s\-\+\(\)\/]+$/, 'Ungültiges Telefonnummer-Format')
    .min(10, 'Telefonnummer muss mindestens 10 Zeichen lang sein'),

  email: Yup.string().email('Ungültige E-Mail-Adresse').required('E-Mail-Adresse ist erforderlich'),

  // Vehicle validation rules
  carBrand: Yup.string()
    .min(2, 'Automarke muss mindestens 2 Zeichen lang sein')
    .required('Automarke ist erforderlich'),

  carModel: Yup.string()
    .min(1, 'Automodell muss mindestens 1 Zeichen lang sein')
    .required('Automodell ist erforderlich'),

  licensePlate: Yup.string()
    .matches(/^[A-Z0-9\-\s]+$/i, 'Ungültiges Kennzeichen-Format')
    .required('Kennzeichen ist erforderlich'),

  insuranceCompany: Yup.string()
    .min(3, 'Versicherungsgesellschaft muss mindestens 3 Zeichen lang sein')
    .required('Versicherungsgesellschaft ist erforderlich'),

  insuranceNumber: Yup.string()
    .min(5, 'Versicherungsnummer muss mindestens 5 Zeichen lang sein')
    .required('Versicherungsnummer ist erforderlich'),

  chassisNumber: Yup.string()
    .min(10, 'Fahrgestellnummer muss mindestens 10 Zeichen lang sein')
    .required('Fahrgestellnummer ist erforderlich'),

  odometerReading: Yup.number()
    .positive('KM-Stand muss eine positive Zahl sein')
    .integer('KM-Stand muss eine ganze Zahl sein')
    .min(0, 'KM-Stand kann nicht negativ sein')
    .max(999999, 'KM-Stand scheint unrealistisch hoch')
    .required('KM-Stand ist erforderlich'),

  greenCardNumber: Yup.string().min(5, 'Grüne Karte Nummer muss mindestens 5 Zeichen lang sein'),

  validDateGreenCard: Yup.date().min(new Date(), 'Grüne Karte muss in der Zukunft gültig sein'),

  allRiskInsurance: Yup.boolean().required('Bitte wählen Sie eine Option aus'),

  // Driver validation rules
  isInsuredDriver: Yup.boolean().required('Bitte wählen Sie eine Option aus'),

  driverLicense: Yup.string()
    .min(5, 'Führerscheinnummer muss mindestens 5 Zeichen lang sein')
    .required('Führerscheinnummer ist erforderlich'),

  licenseIssuingAuthority: Yup.string()
    .min(3, 'Zulassungsbehörde muss mindestens 3 Zeichen lang sein')
    .required('Zulassungsbehörde ist erforderlich'),

  // Damage Description rules
  damageDescription: Yup.string().min(
    10,
    'Schadensbeschreibung muss mindestens 10 Zeichen lang sein',
  ),

  additionalComments: Yup.string().max(
    500,
    'Zusätzliche Bemerkungen dürfen maximal 500 Zeichen lang sein',
  ),

  damageType: Yup.string()
    .oneOf(
      [
        'Auffahren',
        'Rangieren/ Parken',
        'Missachtung der Vorfahrt',
        'Abbiegen',
        'Abkommen von der Fahrbahn',
        'Überholvorgang',
        'Spurwechsel',
        'Sonstiges',
      ],
      'Bitte wählen Sie eine gültige Schadensart aus',
    )
    .required('Schadensart ist erforderlich'),

  // Damage Location rules
  damagedParts: Yup.array()
    .of(Yup.string().oneOf(AVAILABLE_DAMAGE_PARTS, 'Bitte wählen Sie gültige Fahrzeugteile aus'))
    .min(1, 'Bitte wählen Sie mindestens ein beschädigtes Fahrzeugteil aus')
    .required('Beschädigte Fahrzeugteile sind erforderlich'),

  // Miscellaneous Damages rules
  miscellaneousDamageDescription: Yup.string().when('miscellaneousDamages', {
    is: true,
    then: (schema) =>
      schema
        .required('Beschreibung ist erforderlich wenn andere Sachschäden vorhanden sind')
        .min(10, 'Beschreibung muss mindestens 10 Zeichen lang sein'),
    otherwise: (schema) => schema.notRequired(),
  }),
};

// Schema-Generierung für accidentlocation
export const createAccidentLocationValidationSchema = () => {
  return Yup.object().shape({
    accidentStreetName: VALIDATION_RULES.streetName,
    accidentHouseNumber: VALIDATION_RULES.houseNumber,
    accidentCity: VALIDATION_RULES.city,
    accidentPostalCode: VALIDATION_RULES.postalCode,
  });
};

// Dynamische Schema-Generierung für Personal Info
export const createPersonalInfoValidationSchema = (formType: FormType) => {
  const fields = PERSONAL_INFO_FIELDS[formType];

  return Yup.object().shape({
    [fields.name]: VALIDATION_RULES.name,
    [fields.surName]: VALIDATION_RULES.surName,
    [fields.streetName]: VALIDATION_RULES.streetName,
    [fields.houseNumber]: VALIDATION_RULES.houseNumber,
    [fields.postalCode]: VALIDATION_RULES.postalCode,
    [fields.city]: VALIDATION_RULES.city,
    [fields.telephone]: VALIDATION_RULES.telephone,
    [fields.email]: VALIDATION_RULES.email,
  });
};

// Dynamische Schema-Generierung für Vehicle Info
export const createVehicleInfoValidationSchema = (formType: FormType) => {
  const fields = VEHICLE_INFO_FIELDS[formType];

  return Yup.object().shape({
    [fields.carBrand]: VALIDATION_RULES.carBrand,
    [fields.carModel]: VALIDATION_RULES.carModel,
    [fields.licensePlate]: VALIDATION_RULES.licensePlate,
    [fields.insuranceCompany]: VALIDATION_RULES.insuranceCompany,
    [fields.insuranceNumber]: VALIDATION_RULES.insuranceNumber,
    [fields.chassisNumber]: VALIDATION_RULES.chassisNumber,
    [fields.odometerReading]: VALIDATION_RULES.odometerReading,
    [fields.greenCardNumber]: VALIDATION_RULES.greenCardNumber,
    // [fields.validDateGreenCard]: VALIDATION_RULES.validDateGreenCard,
    [fields.allRiskInsurance]: VALIDATION_RULES.allRiskInsurance,
  });
};

// Dynamische Schema-Generierung für Driver Info
export const createDriverInfoValidationSchema = (formType: FormType) => {
  const fields = DRIVER_INFO_FIELDS[formType];

  return Yup.object().shape({
    [fields.isInsuredDriver]: VALIDATION_RULES.isInsuredDriver,
    [fields.name]: VALIDATION_RULES.name,
    [fields.surName]: VALIDATION_RULES.surName,
    [fields.streetName]: VALIDATION_RULES.streetName,
    [fields.houseNumber]: VALIDATION_RULES.houseNumber,
    [fields.postalCode]: VALIDATION_RULES.postalCode,
    [fields.city]: VALIDATION_RULES.city,
    [fields.telephone]: VALIDATION_RULES.telephone,
    [fields.email]: VALIDATION_RULES.email,
    [fields.driverLicense]: VALIDATION_RULES.driverLicense,
    [fields.licenseIssuingAuthority]: VALIDATION_RULES.licenseIssuingAuthority,
  });
};

// Dynamische Schema-Generierung für Damage Location
export const createDamageLocationValidationSchema = (formType: FormType) => {
  const fields = DAMAGE_LOCATION_FIELDS[formType];

  return Yup.object().shape({
    [fields.damagedParts]: VALIDATION_RULES.damagedParts,
  });
};

// Dynamische Schema-Generierung für Damage Description
export const createDamageDescriptionValidationSchema = (formType: FormType) => {
  const fields = DAMAGE_DESCRIPTION_FIELDS[formType];

  return Yup.object().shape({
    [fields.damageDescription]: VALIDATION_RULES.damageDescription,
    [fields.additionalComments]: VALIDATION_RULES.additionalComments,
    [fields.damageType]: VALIDATION_RULES.damageType,
  });
};

// Schema für Miscellaneous Damages
export const createMiscellaneousDamagesValidationSchema = () => {
  return Yup.object().shape({
    miscellaneousDamageDescription: VALIDATION_RULES.miscellaneousDamageDescription,
  });
};

// =============================================================================
// LABELS & TRANSLATIONS
// =============================================================================

export const FORM_LABELS = {
  personalInfo: {
    title: {
      a: 'Persönliche Daten - Versicherungsnehmer',
      b: 'Persönliche Daten - Unfallbeteiligte:r',
    },
    salutation: 'Anrede:',
    name: 'Vorname:',
    surName: 'Name:',
    streetAndNumber: 'Straße, Hausnummer:',
    postalCode: 'PLZ:',
    city: 'Ort:',
    telephone: 'Telefon:',
    email: 'E-Mail-Adresse:',
  },
  vehicleInfo: {
    title: {
      a: 'Fahrzeuginformationen - Versicherungsnehmer',
      b: 'Fahrzeuginformationen - Unfallbeteiligte:r',
    },
    vatDeduction: 'Besteht Berechtigung zum Vorsteuerabzug?',
    carBrand: 'Automarke (z.B. Audi, Mercedes Benz etc.):',
    carModel: 'Automodell (z.B. A4, CLA etc.):',
    licensePlate: 'Amtliches Kennzeichen (z.B. BGJ9854):',
    insuranceCompany: 'Name der Versicherungsgesellschaft:',
    insuranceNumber: 'Versicherungsscheinnummer (ID-Nr. der Versicherung):',
    chassisNumber: 'Fahrgestellnummer (Fahrzeugzulassung):',
    odometerReading: 'Aktueller KM-Stand (Siehe Tachometer des Autos):',
    greenCardNumber: 'Nummer der Grünen Karte des Versicherers:',
    validDateGreenCard: 'Grüne Karte gültig bis:',
    allRiskInsurance: 'Besteht eine Vollkaskoversicherung?',
  },
  driverInfo: {
    title: {
      a: 'Fahrerinformationen - Versicherungsnehmer',
      b: 'Fahrerinformationen - Unfallbeteiligte:r',
    },
    isInsuredDriver: {
      a: 'Ist der Versicherungsnehmer auch der Fahrlenker gewesen?',
      b: 'Ist der Geschädigte auch der Fahrlenker gewesen?',
    },
    salutation: 'Anrede:',
    name: 'Vorname:',
    surName: 'Name:',
    streetAndNumber: 'Straße, Hausnummer:',
    postalCode: 'PLZ:',
    city: 'Ort:',
    telephone: 'Telefon:',
    email: 'E-Mail-Adresse:',
    driverLicense: 'Führerscheinnummer:',
    licenseIssuingAuthority: 'Zulassungsbehörde:',
  },
  damageLocation: {
    title: {
      a: 'Unfallstelle markieren - Fahrzeug des Versicherungsnehmers',
      b: 'Unfallstelle markieren - Fahrzeug des Geschädigten',
    },
    instruction: 'Markieren Sie die Unfallstelle',
    infoText:
      'Wählen Sie die jeweiligen Stellen auf der Grafik per Klick aus. Wenn Sie erneut auf die Stelle klicken, heben Sie Ihre Auswahl wieder auf.',
    addMoreDamage: 'Weitere Schadensstellen hinzufügen',
    carImageInstruction:
      'Klicken Sie auf die entsprechenden Bereiche am Fahrzeug, um Schäden zu markieren',
  },
  damageDescription: {
    title: {
      a: 'Schadensbeschreibung - Fahrzeug des Versicherungsnehmers',
      b: 'Schadensbeschreibung - Fahrzeug des Geschädigten',
    },
    damageDescription: 'Beschreiben Sie sichtbare Schäden am Fahrzeug:',
    additionalComments: 'Weitere Bemerkungen:',
    vehicleOperational: 'Ist das Fahrzeug vom Beschädigten fahrbereit?',
    damageType: 'Wie kam es zu dem Fahrzeugschaden?',
    fileUploads: 'Dateien hochladen:',
    uploadInstructions: 'Ziehen Sie Dateien hierher oder klicken Sie, um Dateien auszuwählen',
    maxFiles: 'Maximal 5 Dateien erlaubt',
    attachFiles: 'Anhänge hinzufügen',
    maxFilesReached: 'Maximale Anzahl erreicht',
    deleteAttachment: 'Anhang löschen',
    acceptedFormats: 'Akzeptierte Bildformate: .JPG, .JPEG, .PNG',
    documentInfo:
      'Sie können auch nützliche Dokumente wie Führerschein und Personalausweis hochladen.',
  },
  common: {
    selectPlaceholder: 'Bitte auswählen',
    fillPlaceholder: 'Bitte ausfüllen',
    datePlaceholder: 'Datum auswählen',
    nextButton: 'Weiter',
    yes: 'Ja',
    no: 'Nein',
    salutations: {
      mr: 'Herr',
      mrs: 'Frau',
      divers: 'Divers'
    },
  },
} as const;
