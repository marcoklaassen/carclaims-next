import { InsuranceHolderFormState, OtherInsuranceHolderFormState, DriverOfInsuranceHolderFormState, GlobalFormState } from '@/types/state';
import { FormType, PERSONAL_INFO_FIELDS, VEHICLE_INFO_FIELDS, DRIVER_INFO_FIELDS, DAMAGE_LOCATION_FIELDS, DAMAGE_DESCRIPTION_FIELDS } from '@/config/formConfig';
import dayjs from 'dayjs';
import 'dayjs/locale/de';

// Configure dayjs to use German locale
dayjs.locale('de');

type AllFormState = InsuranceHolderFormState & OtherInsuranceHolderFormState & DriverOfInsuranceHolderFormState & GlobalFormState;

export function createPersonalInfoValues(
  globalForm: Partial<AllFormState>,
  formType: FormType
) {
  const fields = PERSONAL_INFO_FIELDS[formType];

  if (formType === 'a') {
    return {
      [fields.salutation]: globalForm.insuranceHolderSalutation || '',
      [fields.name]: globalForm.insuranceHolderName || '',
      [fields.surName]: globalForm.insuranceHolderSurName || '',
      [fields.streetName]: globalForm.insuranceHolderStreetName || '',
      [fields.houseNumber]: globalForm.insuranceHolderHouseNumber || '',
      [fields.postalCode]: globalForm.insuranceHolderPostalCode || '',
      [fields.city]: globalForm.insuranceHolderCity || '',
      [fields.telephone]: globalForm.insuranceHolderTelephone || '',
      [fields.email]: globalForm.insuranceHolderEmail || '',
    };
  } else {
    return {
      [fields.salutation]: globalForm.otherInsuranceHolderSalutation || '',
      [fields.name]: globalForm.otherInsuranceHolderName || '',
      [fields.surName]: globalForm.otherInsuranceHolderSurName || '',
      [fields.streetName]: globalForm.otherInsuranceHolderStreetName || '',
      [fields.houseNumber]: globalForm.otherInsuranceHolderHouseNumber || '',
      [fields.postalCode]: globalForm.otherInsuranceHolderPostalCode || '',
      [fields.city]: globalForm.otherinsuranceHolderCity || '',
      [fields.telephone]: globalForm.otherInsuranceHolderTelephone || '',
      [fields.email]: globalForm.otherInsuranceHolderEmail || '',
    };
  }
}

export function createVehicleInfoValues(
  globalForm: Partial<AllFormState>,
  formType: FormType
) {
  const fields = VEHICLE_INFO_FIELDS[formType];

  if (formType === 'a') {
    return {
      [fields.vatDeduction]: globalForm.vatDeduction || '',
      [fields.carBrand]: globalForm.carBrand || '',
      [fields.carModel]: globalForm.carModel || '',
      [fields.licensePlate]: globalForm.licensePlate || '',
      [fields.insuranceCompany]: globalForm.insuranceCompany || '',
      [fields.insuranceNumber]: globalForm.insuranceNumber || '',
      [fields.chassisNumber]: globalForm.chassisNumber || '',
      [fields.odometerReading]: globalForm.odometerReading || '',
      [fields.greenCardNumber]: globalForm.greenCardNumber || '',
      [fields.validDateGreenCard]: globalForm.validDateGreenCard || dayjs(),
      [fields.allRiskInsurance]: globalForm.allRiskInsurance || '',
    };
  } else {
    return {
      [fields.vatDeduction]: globalForm.otherVatDeduction || '',
      [fields.carBrand]: globalForm.otherCarBrand || '',
      [fields.carModel]: globalForm.otherCarModel || '',
      [fields.licensePlate]: globalForm.otherLicensePlate || '',
      [fields.insuranceCompany]: globalForm.otherInsuranceCompany || '',
      [fields.insuranceNumber]: globalForm.otherinsuranceNumber || '',
      [fields.chassisNumber]: globalForm.otherChassisNumber || '',
      [fields.odometerReading]: globalForm.otherOdometerReading || '',
      [fields.greenCardNumber]: globalForm.otherGreenCardNumber || '',
      [fields.validDateGreenCard]: globalForm.otherValidDateGreenCard || dayjs(),
      [fields.allRiskInsurance]: globalForm.otherAllRiskInsurance || '',
    };
  }
}

export function createDriverInfoValues(
  globalForm: Partial<AllFormState>,
  formType: FormType
) {
  const fields = DRIVER_INFO_FIELDS[formType];

  if (formType === 'a') {
    return {
      [fields.isInsuredDriver]: globalForm.isInsuredDriver || '',
      [fields.salutation]: globalForm.driverSalutation || '',
      [fields.name]: globalForm.driverName || '',
      [fields.surName]: globalForm.driverSurName || '',
      [fields.streetName]: globalForm.driverStreetName || '',
      [fields.houseNumber]: globalForm.driverHouseNumber || '',
      [fields.postalCode]: globalForm.driverPostalCode || '',
      [fields.city]: globalForm.driverCity || '',
      [fields.telephone]: globalForm.driverTelephone || '',
      [fields.email]: globalForm.driverEmail || '',
      [fields.driverLicense]: globalForm.driverDriverLicense || '',
      [fields.licenseIssuingAuthority]: globalForm.driverLicenseIssuingAuthority || '',
    };
  } else {
    return {
      [fields.isInsuredDriver]: globalForm.otherIsInsuredDriver || '',
      [fields.salutation]: globalForm.otherDriverSalutation || '',
      [fields.name]: globalForm.otherDriverName || '',
      [fields.surName]: globalForm.otherDriverSurName || '',
      [fields.streetName]: globalForm.otherDriverStreetName || '',
      [fields.houseNumber]: globalForm.otherDriverHouseNumber || '',
      [fields.postalCode]: globalForm.otherDriverPostalCode || '',
      [fields.city]: globalForm.otherDriverCity || '',
      [fields.telephone]: globalForm.otherDriverTelephone || '',
      [fields.email]: globalForm.otherDriverEmail || '',
      [fields.driverLicense]: globalForm.otherDriverDriverLicense || '',
      [fields.licenseIssuingAuthority]: globalForm.otherDriverLicenseIssuingAuthority || '',
    };
  }
}

export function createDamageLocationValues(
  globalForm: Partial<AllFormState>,
  formType: FormType
) {
  const fields = DAMAGE_LOCATION_FIELDS[formType];

  if (formType === 'a') {
    return {
      [fields.damagedParts]: globalForm.driverDamagedParts || [],
    };
  } else {
    return {
      [fields.damagedParts]: globalForm.otherDriverDamagedParts || [],
    };
  }
}

export function createDamageDescriptionValues(
  globalForm: Partial<AllFormState>,
  formType: FormType
) {
  const fields = DAMAGE_DESCRIPTION_FIELDS[formType];

  if (formType === 'a') {
    return {
      [fields.damageDescription]: globalForm.damageDescription || '',
      [fields.additionalComments]: globalForm.additionalComments || '',
      [fields.vehicleOperational]: globalForm.vehicleOperational || '',
      [fields.damageType]: globalForm.damageType || '',
      [fields.fileUploads]: globalForm.driverFileUploads || [],
    };
  } else {
    return {
      [fields.damageDescription]: globalForm.otherDamageDescription || '',
      [fields.additionalComments]: globalForm.otherAdditionalComments || '',
      [fields.vehicleOperational]: globalForm.otherVehicleOperational || '',
      [fields.damageType]: globalForm.otherdamageType || '',
      [fields.fileUploads]: globalForm.otherDriverFileUploads || [],
    };
  }
}

