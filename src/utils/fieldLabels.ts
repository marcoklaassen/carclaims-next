export const FIELD_LABELS: Record<string, string> = {
  accidentDate: 'Unfalldatum',
  accidentTime: 'Unfallzeit',
  accidentStreetName: 'Unfallstraße',
  accidentHouseNumber: 'Hausnummer (Unfallort)',
  accidentPostalCode: 'Postleitzahl (Unfallort)',
  accidentCity: 'Stadt (Unfallort)',
  accidentDetails: 'Unfallhergang',
  accidentReportNumber: 'Aktenzeichen',
  hasInjured: 'Verletzte Personen',
  injuredCount: 'Anzahl Verletzter',
  miscellaneousDamages: 'Sonstige Schäden',
  miscellaneousDamageDescription: 'Beschreibung sonstiger Schäden',
  hasWitnesses: 'Zeugen vorhanden',
  witnessesCount: 'Anzahl Zeugen',
  witnesses: 'Zeugendaten',
  // Party A — insurance holder
  insuranceHolderSalutation: 'Anrede (Versicherungsnehmer)',
  insuranceHolderTitle: 'Titel (Versicherungsnehmer)',
  insuranceHolderName: 'Vorname (Versicherungsnehmer)',
  insuranceHolderSurName: 'Nachname (Versicherungsnehmer)',
  insuranceHolderStreetName: 'Straße (Versicherungsnehmer)',
  insuranceHolderHouseNumber: 'Hausnummer (Versicherungsnehmer)',
  insuranceHolderPostalCode: 'Postleitzahl (Versicherungsnehmer)',
  insuranceHolderCity: 'Ort (Versicherungsnehmer)',
  insuranceHolderTelephone: 'Telefon (Versicherungsnehmer)',
  insuranceHolderEmail: 'E-Mail (Versicherungsnehmer)',
  vatDeduction: 'Vorsteuerabzug',
  allRiskInsurance: 'Vollkaskoversicherung',
  carBrand: 'Fahrzeugmarke',
  carModel: 'Fahrzeugmodell',
  licensePlate: 'Kennzeichen',
  insuranceCompany: 'Versicherungsgesellschaft',
  insuranceNumber: 'Versicherungsnummer',
  chassisNumber: 'Fahrgestellnummer',
  odometerReading: 'Kilometerstand',
  greenCardNumber: 'Grüne-Karte-Nummer',
  validDateGreenCard: 'Gültigkeitsdatum Grüne Karte',
  isInsuredDriver: 'Fahrer ist Versicherungsnehmer',
  // Party A — driver
  driverSalutation: 'Anrede (Fahrer)',
  driverName: 'Vorname (Fahrer)',
  driverSurName: 'Nachname (Fahrer)',
  driverStreetName: 'Straße (Fahrer)',
  driverHouseNumber: 'Hausnummer (Fahrer)',
  driverPostalCode: 'Postleitzahl (Fahrer)',
  driverCity: 'Ort (Fahrer)',
  driverTelephone: 'Telefon (Fahrer)',
  driverEmail: 'E-Mail (Fahrer)',
  driverDriverLicense: 'Führerscheinnummer',
  driverLicenseIssuingAuthority: 'Ausstellungsbehörde Führerschein',
  driverDamagedParts: 'Beschädigte Teile',
  damageDescription: 'Schadensbeschreibung',
  additionalComments: 'Zusätzliche Anmerkungen',
  vehicleOperational: 'Fahrtauglich',
  damageType: 'Schadensart',
  // Party B — insurance holder
  otherInsuranceHolderSalutation: 'Anrede (Versicherungsnehmer B)',
  otherInsuranceHolderTitle: 'Titel (Versicherungsnehmer B)',
  otherInsuranceHolderName: 'Vorname (Versicherungsnehmer B)',
  otherInsuranceHolderSurName: 'Nachname (Versicherungsnehmer B)',
  otherInsuranceHolderStreetName: 'Straße (Versicherungsnehmer B)',
  otherInsuranceHolderHouseNumber: 'Hausnummer (Versicherungsnehmer B)',
  otherInsuranceHolderPostalCode: 'Postleitzahl (Versicherungsnehmer B)',
  otherInsuranceHolderCity: 'Ort (Versicherungsnehmer B)',
  otherInsuranceHolderTelephone: 'Telefon (Versicherungsnehmer B)',
  otherInsuranceHolderEmail: 'E-Mail (Versicherungsnehmer B)',
  otherVatDeduction: 'Vorsteuerabzug (B)',
  otherAllRiskInsurance: 'Vollkaskoversicherung (B)',
  otherCarBrand: 'Fahrzeugmarke (B)',
  otherCarModel: 'Fahrzeugmodell (B)',
  otherLicensePlate: 'Kennzeichen (B)',
  otherInsuranceCompany: 'Versicherungsgesellschaft (B)',
  otherInsuranceNumber: 'Versicherungsnummer (B)',
  otherChassisNumber: 'Fahrgestellnummer (B)',
  otherOdometerReading: 'Kilometerstand (B)',
  otherGreenCardNumber: 'Grüne-Karte-Nummer (B)',
  otherValidDateGreenCard: 'Gültigkeitsdatum Grüne Karte (B)',
  otherIsInsuredDriver: 'Fahrer ist Versicherungsnehmer (B)',
  // Party B — driver
  otherDriverSalutation: 'Anrede (Fahrer B)',
  otherDriverName: 'Vorname (Fahrer B)',
  otherDriverSurName: 'Nachname (Fahrer B)',
  otherDriverStreetName: 'Straße (Fahrer B)',
  otherDriverHouseNumber: 'Hausnummer (Fahrer B)',
  otherDriverPostalCode: 'Postleitzahl (Fahrer B)',
  otherDriverCity: 'Ort (Fahrer B)',
  otherDriverTelephone: 'Telefon (Fahrer B)',
  otherDriverEmail: 'E-Mail (Fahrer B)',
  otherDriverDriverLicense: 'Führerscheinnummer (B)',
  otherDriverLicenseIssuingAuthority: 'Ausstellungsbehörde Führerschein (B)',
  otherDriverDamagedParts: 'Beschädigte Teile (B)',
  otherDamageDescription: 'Schadensbeschreibung (B)',
  otherAdditionalComments: 'Zusätzliche Anmerkungen (B)',
  otherVehicleOperational: 'Fahrtauglich (B)',
  otherDamageType: 'Schadensart (B)',
};

export function computeChangedFields(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
): string[] {
  const changed: string[] = [];

  for (const [key, afterVal] of Object.entries(after)) {
    if (!(key in FIELD_LABELS)) continue;
    if (afterVal === null || afterVal === undefined || afterVal === '') continue;

    const beforeVal = before[key];

    if (Array.isArray(afterVal)) {
      const afterJson = JSON.stringify(afterVal);
      const beforeJson = Array.isArray(beforeVal) ? JSON.stringify(beforeVal) : '[]';
      if (afterJson !== beforeJson && (afterVal as unknown[]).length > 0) {
        changed.push(key);
      }
    } else {
      const afterStr = String(afterVal);
      const beforeStr = beforeVal != null && beforeVal !== '' ? String(beforeVal) : '';
      if (beforeStr === '' && afterStr !== '') {
        changed.push(key);
      }
    }
  }

  return changed;
}

export function generateFilledSummary(changedFields: string[]): string {
  const labels = changedFields.map((f) => FIELD_LABELS[f]).filter(Boolean);
  if (labels.length === 0) return '';
  if (labels.length === 1) return `Ich habe ${labels[0]} ausgefüllt.`;
  const last = labels[labels.length - 1];
  const rest = labels.slice(0, -1);
  return `Ich habe ${rest.join(', ')} und ${last} ausgefüllt.`;
}
