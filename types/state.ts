import { Dayjs } from 'dayjs';
import { create } from 'zustand';

export const MAXFILES = 5;

export interface GlobalFormState {
  language?: string;
  accidentDate?: Dayjs | null;
  accidentTime?: Dayjs | null;
  accidentStreetName?: string;
  accidentPostalCode?: string;
  accidentCity?: string;
  accidentHouseNumber?: string;
  accidentDetails?: string;
  accidentReportNumber?: string;
  hasInjured?: boolean;
  injuredCount?: number;
  injuredLastName?: string;
  injuredSurName?: string;
  injuredStreetName?: string;
  injuredHouseNumber?: string;
  injuredPostalCode?: string;
  injuredCity?: string;
  miscellaneousDamages?: boolean;
  miscellaneousDamageDescription?: string;
  hasWitnesses?: boolean | string | null;
  witnessesCount?: number;
  witnesses?: WitnessDetails[];
  witnessSalutation?: string;
  witnessLastName?: string;
  witnessSurName?: string;
  witnessStreetName?: string;
  witnessHouseNumber?: string;
  witnessPostalCode?: string;
  witnessCity?: string;
  witnessEmail?: string;
  witnessTelephone?: string;
  isInsuredDriver?: 'true' | 'false' | string;
  insuranceHolderSalutation?: string;
  insuranceHolderName?: string;
  insuranceHolderSurName?: string;
  insuranceHolderStreetName?: string;
  insuranceHolderHouseNumber?: string;
  insuranceHolderPostalCode?: string;
  insuranceHolderCity?: string;
  insuranceHolderTelephone?: string;
  insuranceHolderEmail?: string;
  otherIsInsuredDriver?: 'true' | 'false' | string;
  otherInsuranceHolderSalutation?: string;
  otherInsuranceHolderName?: string;
  otherInsuranceHolderSurName?: string;
  otherInsuranceHolderStreetName?: string;
  otherInsuranceHolderHouseNumber?: string;
  otherInsuranceHolderPostalCode?: string;
  otherinsuranceHolderCity?: string;
  otherInsuranceHolderTelephone?: string;
  otherInsuranceHolderEmail?: string;
  allRiskInsurance?: boolean | string | '0' | '1';
  otherVatDeduction?: boolean | string | '0' | '1';
  otherCarBrand?: string;
  otherCarModel?: string;
  otherLicensePlate?: string;
  otherInsuranceCompany?: string;
  otherinsuranceNumber?: string;
  otherChassisNumber?: string;
  otherOdometerReading?: string;
  otherGreenCardNumber?: string;
  otherValidDateGreenCard?: Dayjs | null;
  otherAllRiskInsurance?: boolean | string | '0' | '1';
  vatDeduction?: boolean | string | '0' | '1';
  carBrand?: string;
  carModel?: string;
  licensePlate?: string;
  insuranceCompany?: string;
  insuranceNumber?: string;
  chassisNumber?: string;
  odometerReading?: string;
  greenCardNumber?: string;
  validDateGreenCard?: Dayjs | null;
  driverSalutation?: string;
  driverHolderName?: string;
  driverHolderSurName?: string;
  driverHolderStreetName?: string;
  driverHolderHouseNumber?: string;
  driverHolderPostalCode?: string;
  driverHolderCity?: string;
  driverHolderTelephone?: string;
  driverHolderDriverLicense?: string;
  driverLicenseIssuingAuthority?: string;
  driverHolderFileUploads?: (File & { path?: string })[] | null;
  driverHolderDamagedParts?: string[];
  additionalComments?: string;
  damageDescription?: string;
  vehicleOperational?: '';
  damageType?: string;
  otherDriverSalutation?: string;
  otherDriverHolderName?: string;
  otherDriverHolderSurName?: string;
  otherDriverHolderStreetName?: string;
  otherDriverHolderHouseNumber?: string;
  otherDriverHolderPostalCode?: string;
  otherDriverHolderCity?: string;
  otherDriverHolderTelephone?: string;
  otherDriverHolderDriverLicense?: string;
  otherDriverLicenseIssuingAuthority?: string;
  otherDriverHolderFileUploads?: (File & { path?: string })[] | null;
  otherDriverHolderDamagedParts?: string[];
  otherAdditionalComments?: string;
  otherDamageDescription?: string;
  otherVehicleOperational?: '';
  otherdamageType?: string;
}

export interface CarclaimsDetailsState {
  language?: string;
  accidentDate?: Dayjs;
  accidentTime?: Dayjs;
  accidentStreetName?: string;
  accidentPostalCode?: string;
  accidentCity?: string;
  accidentHouseNumber?: string;
  accidentDetails?: string;
  accidentReportNumber?: string;
}

export interface InjuredPeopleFormState {
  hasInjured?: boolean;
  injuredCount?: number;
}

export interface MiscellaneousDamagesFormState {
  miscellaneousDamages?: boolean | string | null;
  miscellaneousDamageDescription?: string;
}

export interface InsuranceHolderFormState {
  insuranceHolderSalutation?: string;
  insuranceHolderName?: string;
  insuranceHolderSurName?: string;
  insuranceHolderStreetName?: string;
  insuranceHolderHouseNumber?: string;
  insuranceHolderPostalCode?: string;
  insuranceHolderCity?: string;
  insuranceHolderTelephone?: string;
  insuranceHolderEmail?: string;
  vatDeduction?: boolean | string | '0' | '1';
  carBrand?: string;
  carModel?: string;
  licensePlate?: string;
  insuranceCompany?: string;
  insuranceNumber?: string;
  chassisNumber?: string;
  odometerReading?: string;
  greenCardNumber?: string;
  validDateGreenCard?: Dayjs | null;
  allRiskInsurance?: boolean | string | '0' | '1';
}

export interface OtherInsuranceHolderFormState {
  otherInsuranceHolderSalutation?: string;
  otherInsuranceHolderName?: string;
  otherInsuranceHolderSurName?: string;
  otherInsuranceHolderStreetName?: string;
  otherInsuranceHolderHouseNumber?: string;
  otherInsuranceHolderPostalCode?: string;
  otherinsuranceHolderCity?: string;
  otherInsuranceHolderTelephone?: string;
  otherInsuranceHolderEmail?: string;
  allRiskInsurance?: boolean | string | '0' | '1';
  otherVatDeduction?: boolean | string | '0' | '1';
  otherCarBrand?: string;
  otherCarModel?: string;
  otherLicensePlate?: string;
  otherInsuranceCompany?: string;
  otherinsuranceNumber?: string;
  otherChassisNumber?: string;
  otherOdometerReading?: string;
  otherGreenCardNumber?: string;
  otherValidDateGreenCard?: Dayjs | null;
  otherAllRiskInsurance?: boolean | string | '0' | '1';
}

export interface DriverOfInsuranceHolderFormState {
  isInsuredDriver?: 'true' | 'false' | string;
  driverSalutation?: string;
  driverHolderName?: string;
  driverHolderSurName?: string;
  driverHolderStreetName?: string;
  driverHolderHouseNumber?: string;
  driverHolderPostalCode?: string;
  driverHolderCity?: string;
  driverHolderTelephone?: string;
  driverHolderDriverLicense?: string;
  driverLicenseIssuingAuthority?: string;
  driverHolderFileUploads?: (File & { path?: string })[] | null;
  driverHolderDamagedParts?: string[];
  additionalComments?: string;
  damageDescription?: string;
  vehicleOperational?: '';
  damageType?: string;
}

export interface DriverOfOtherInsuranceHolderFormState {
  otherIsInsuredDriver?: 'true' | 'false' | string;
  otherDriverSalutation?: string;
  otherDriverHolderName?: string;
  otherDriverHolderSurName?: string;
  otherDriverHolderStreetName?: string;
  otherDriverHolderHouseNumber?: string;
  otherDriverHolderPostalCode?: string;
  otherDriverHolderCity?: string;
  otherDriverHolderTelephone?: string;
  otherDriverHolderDriverLicense?: string;
  otherDriverLicenseIssuingAuthority?: string;
  otherDriverHolderFileUploads?: (File & { path?: string }[]) | null;
  otherDriverHolderDamagedParts?: string[];
  otherAdditionalComments?: string;
  otherDamageDescription?: string;
  otherVehicleOperational?: '' | '';
  otherdamageType?: string;
}

export interface WitnessesFormState {
  hasWitnesses?: boolean | string | null;
  witnessesCount?: number;
  witnesses?: WitnessDetails[];
}

export interface WitnessDetails {
  salutation?: string;
  name?: string;
  surName?: string;
  streetName?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;
  telephone?: string;
  email?: string;
}

type FormStore = {
  form: GlobalFormState;
  setGlobalForm: (values: Partial<GlobalFormState>) => void;
  resetGlobalForm: () => void;
};

export const useGlobalFormStore = create<FormStore>(set => ({
  form: {
  },
  setGlobalForm: values =>
    set(state => ({
      form: { ...state.form, ...values },
    })),
  resetGlobalForm: () => set({
    form: {
    }
  }),
}));
