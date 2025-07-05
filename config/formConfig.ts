import * as Yup from 'yup';

export type FormType = 'a' | 'b';

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
    insuranceNumber: 'otherinsuranceNumber',
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
    damageType: 'otherdamageType',
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
  salutation: Yup.string()
    .oneOf(['Herr', 'Frau'], 'Bitte wählen Sie eine gültige Anrede aus')
    .required('Anrede ist erforderlich'),

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
    .min(10, 'Telefonnummer muss mindestens 10 Zeichen lang sein')
    .required('Telefonnummer ist erforderlich'),

  email: Yup.string()
    .email('Ungültige E-Mail-Adresse')
    .required('E-Mail-Adresse ist erforderlich'),

  // Vehicle validation rules
  vatDeduction: Yup.boolean().required('Bitte wählen Sie eine Option aus'),

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

  greenCardNumber: Yup.string()
    .min(5, 'Grüne Karte Nummer muss mindestens 5 Zeichen lang sein')
    .required('Grüne Karte Nummer ist erforderlich'),

  validDateGreenCard: Yup.date()
    .min(new Date(), 'Grüne Karte muss in der Zukunft gültig sein')
    .required('Gültigkeitsdatum ist erforderlich'),

  allRiskInsurance: Yup.boolean().required('Bitte wählen Sie eine Option aus'),

  // Driver validation rules
  isInsuredDriver: Yup.boolean().required('Bitte wählen Sie eine Option aus'),

  driverLicense: Yup.string()
    .min(5, 'Führerscheinnummer muss mindestens 5 Zeichen lang sein')
    .required('Führerscheinnummer ist erforderlich'),

  licenseIssuingAuthority: Yup.string()
    .min(3, 'Zulassungsbehörde muss mindestens 3 Zeichen lang sein')
    .required('Zulassungsbehörde ist erforderlich'),
};

// Dynamische Schema-Generierung für Personal Info
export const createPersonalInfoValidationSchema = (formType: FormType) => {
  const fields = PERSONAL_INFO_FIELDS[formType];

  return Yup.object().shape({
    [fields.salutation]: VALIDATION_RULES.salutation,
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
    [fields.vatDeduction]: VALIDATION_RULES.vatDeduction,
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
    [fields.salutation]: VALIDATION_RULES.salutation,
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

// =============================================================================
// LABELS & TRANSLATIONS
// =============================================================================

export const FORM_LABELS = {
  personalInfo: {
    title: {
      a: 'Persönliche Daten - Versicherungsnehmer A',
      b: 'Persönliche Daten - Versicherungsnehmer B',
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
      a: 'Fahrzeuginformationen - Versicherungsnehmer A',
      b: 'Fahrzeuginformationen - Versicherungsnehmer B',
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
      a: 'Fahrerinformationen - Versicherungsnehmer A',
      b: 'Fahrerinformationen - Versicherungsnehmer B',
    },
    isInsuredDriver: {
      a: 'Ist der Versicherungsnehmer A auch der Fahrlenker gewesen?',
      b: 'Ist der Versicherungsnehmer B auch der Fahrlenker gewesen?',
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
      a: 'Unfallstelle markieren - Fahrzeug A',
      b: 'Unfallstelle markieren - Fahrzeug B',
    },
    instruction: 'Markieren Sie die Unfallstelle',
    infoText: 'Wählen Sie die jeweiligen Stellen auf der Grafik per Klick aus. Wenn Sie erneut auf die Stelle klicken, heben Sie Ihre Auswahl wieder auf.',
    addMoreDamage: 'Weitere Schadensstellen hinzufügen',
    carImageInstruction: 'Klicken Sie auf die entsprechenden Bereiche am Fahrzeug, um Schäden zu markieren',
  },
  damageDescription: {
    title: {
      a: 'Schadensbeschreibung - Fahrzeug A',
      b: 'Schadensbeschreibung - Fahrzeug B',
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
    documentInfo: 'Sie können auch nützliche Dokumente wie Führerschein und Personalausweis hochladen.',
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
    },
  },
} as const;
