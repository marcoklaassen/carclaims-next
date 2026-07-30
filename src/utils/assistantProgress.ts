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
      'accidentDate',
      'accidentTime',
      'accidentStreetName',
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
      'licensePlate',
      'carBrand',
      'insuranceCompany',
    ],
  },
  {
    id: 'driver-a',
    label: 'Fahrer / Schaden A',
    fields: [
      'damageDescription',
      'damageType',
      'driverDamagedParts',
      'vehicleOperational',
    ],
  },
  {
    id: 'holder-b',
    label: 'Unfallgegner',
    fields: [
      'otherInsuranceHolderName',
      'otherInsuranceHolderSurName',
      'otherLicensePlate',
      'otherCarBrand',
    ],
  },
  {
    id: 'driver-b',
    label: 'Fahrer / Schaden B',
    fields: [
      'otherDamageDescription',
      'otherDamageType',
      'otherDriverDamagedParts',
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
