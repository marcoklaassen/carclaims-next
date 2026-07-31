export interface ProgressSection {
  id: string;
  label: string;
  fields: string[];
}

export const PROGRESS_SECTIONS: ProgressSection[] = [
  {
    id: 'accident',
    label: 'Unfalldaten',
    fields: [
      'language',
      'accidentDate',
      'accidentTime',
      'accidentStreetName',
      'accidentPostalCode',
      'accidentCity',
      'accidentDetails',
    ],
  },
  {
    id: 'holder-a',
    label: 'Versicherungsnehmer',
    fields: [
      'insuranceHolderName',
      'insuranceHolderSurName',
      'insuranceHolderStreetName',
      'insuranceHolderCity',
      'insuranceHolderEmail',
      'carBrand',
      'licensePlate',
      'insuranceCompany',
      'insuranceNumber',
    ],
  },
  {
    id: 'driver-a',
    label: 'Fahrer / Schaden A',
    fields: [
      'driverDamagedParts',
      'damageDescription',
      'damageType',
      'vehicleOperational',
    ],
  },
  {
    id: 'holder-b',
    label: 'Unfallgegner',
    fields: [
      'otherInsuranceHolderName',
      'otherInsuranceHolderSurName',
      'otherInsuranceHolderStreetName',
      'otherInsuranceHolderCity',
      'otherCarBrand',
      'otherLicensePlate',
      'otherInsuranceCompany',
    ],
  },
  {
    id: 'driver-b',
    label: 'Fahrer / Schaden B',
    fields: [
      'otherDriverDamagedParts',
      'otherDamageDescription',
      'otherDamageType',
      'otherVehicleOperational',
    ],
  },
  {
    id: 'injured',
    label: 'Verletzte',
    fields: ['hasInjured'],
  },
  {
    id: 'misc',
    label: 'Sachschaeden',
    fields: ['miscellaneousDamages'],
  },
  {
    id: 'witnesses',
    label: 'Zeugen',
    fields: ['hasWitnesses'],
  },
];

export function computeSectionProgress(
  form: Record<string, unknown>,
): { section: ProgressSection; filled: number; total: number }[] {
  return PROGRESS_SECTIONS.map((section) => {
    const filled = section.fields.filter((f) => {
      const val = form[f as keyof typeof form];
      if (val === null || val === undefined || val === '') return false;
      if (Array.isArray(val) && val.length === 0) return false;
      return true;
    }).length;
    return { section, filled, total: section.fields.length };
  });
}
