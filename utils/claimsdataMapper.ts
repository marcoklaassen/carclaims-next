import { GlobalFormState } from '../types/state';
import {
  Claimsdata,
  Claimsdetails,
  Person,
  Policyholder,
  VehicleDriver,
  Witness,
  ClaimsdataHasVehicleDamageEnum,
  ClaimsdataInjuredPersonEnum,
  ClaimsdataWitnessExistsEnum,
  ClaimsdetailsLanguageEnum,
  PersonFormOfAddressEnum,
  PolicyholderInputTaxDeductionEnum,
  PolicyholderComprehensiveInsuranceEnum,
  VehicleDriverVehicleDrivingAbilityEnum,
  VehicleDriverDamageCausedByEnum,
  VehicleDriverDriverDamagedpartsGraphicEnum,
  VehicleDriverDamagedCarImagesInner
} from '../openapi/generated';
import dayjs, { Dayjs } from 'dayjs';

/**
 * DTO Mapper für die Konvertierung von GlobalFormState zu Claimsdata (OAS)
 */
export class ClaimsdataMapper {

  /**
   * Mappt GlobalFormState zu Claimsdata-Objekt
   */
  static mapToClaimsdata(globalForm: GlobalFormState): Claimsdata {

    return {
      claimsDetails: this.mapToClaimsdetails(globalForm),
      hasVehicleDamage: this.mapToHasVehicleDamageEnum(globalForm.miscellaneousDamages),
      vehicleDamageDescription: globalForm.miscellaneousDamageDescription || undefined,
      injuredPerson: this.mapToInjuredPersonEnum(globalForm.hasInjured),
      injuredPersonNumber: globalForm.injuredCount?.toString() || undefined,
      witnessExists: this.mapToWitnessExistsEnum(globalForm.hasWitnesses),
      witnessCount: globalForm.witnessesCount?.toString() || undefined,
      witness: this.mapToWitnesses(globalForm.witnesses || []),
      vehicleDriver: this.mapToVehicleDriver(globalForm, 'A'),
      otherVehicleDriver: this.mapToVehicleDriver(globalForm, 'B'),
      policyholder: this.mapToPolicyholder(globalForm, 'A'),
      otherPolicyholder: this.mapToPolicyholder(globalForm, 'B')
    };
  }

  /**
   * Mappt zu Claimsdetails
   */
  private static mapToClaimsdetails(globalForm: GlobalFormState): Claimsdetails {
    console.log('📦 Mapping GlobalFormState to Claimsdata:',this.mapToLanguageEnum(globalForm.language));
    return {
      language: this.mapToLanguageEnum(globalForm.language),
      accidentDate: this.mapDayjsToDate(globalForm.accidentDate),
      accidentTime: this.mapDayjsToTimeString(globalForm.accidentTime),
      accidentPostalCode: globalForm.accidentPostalCode || undefined,
      accidentCity: globalForm.accidentCity || undefined,
      accidentStreetName: globalForm.accidentStreetName || undefined,
      accidentStreetNumber: globalForm.accidentHouseNumber || undefined,
      accidentDescription: globalForm.accidentDetails || undefined,
      accidentPoliceNumber: globalForm.accidentReportNumber || undefined
    };
  }

  /**
   * Mappt zu Person-Objekt
   */
  private static mapToPerson(
    salutation?: string,
    name?: string,
    surName?: string,
    streetName?: string,
    houseNumber?: string,
    postalCode?: string,
    city?: string,
    telephone?: string,
    email?: string
  ): Person {
    return {
      formOfAddress: this.mapSalutationToEnum(salutation),
      lastName: name || undefined,
      firstName: surName || undefined,
      postalCode: postalCode || undefined,
      city: city || undefined,
      streetName: streetName || undefined,
      streetNumber: houseNumber || undefined,
      phoneNumber: telephone || undefined,
      emailAddress: email || undefined
    };
  }

  /**
   * Mappt zu Policyholder
   */
  private static mapToPolicyholder(globalForm: GlobalFormState, type: 'A' | 'B'): Policyholder {
    const isOther = type === 'B';

    const personalInfo = this.mapToPerson(
      isOther ? globalForm.otherInsuranceHolderSalutation : globalForm.insuranceHolderSalutation,
      isOther ? globalForm.otherInsuranceHolderName : globalForm.insuranceHolderName,
      isOther ? globalForm.otherInsuranceHolderSurName : globalForm.insuranceHolderSurName,
      isOther ? globalForm.otherInsuranceHolderStreetName : globalForm.insuranceHolderStreetName,
      isOther ? globalForm.otherInsuranceHolderHouseNumber : globalForm.insuranceHolderHouseNumber,
      isOther ? globalForm.otherInsuranceHolderPostalCode : globalForm.insuranceHolderPostalCode,
      isOther ? globalForm.otherInsuranceHolderCity : globalForm.insuranceHolderCity,
      isOther ? globalForm.otherInsuranceHolderTelephone : globalForm.insuranceHolderTelephone,
      isOther ? globalForm.otherInsuranceHolderEmail : globalForm.insuranceHolderEmail
    );

    return {
      personalInformation: personalInfo,
      inputTaxDeduction: this.mapToInputTaxDeductionEnum(
        isOther ? globalForm.otherVatDeduction : globalForm.vatDeduction
      ),
      vehicleMake: isOther ? globalForm.otherCarBrand : globalForm.carBrand,
      vehicleType: isOther ? globalForm.otherCarModel : globalForm.carModel,
      vehicleReg: isOther ? globalForm.otherLicensePlate : globalForm.licensePlate,
      insuranceCompany: isOther ? globalForm.otherInsuranceCompany : globalForm.insuranceCompany,
      policyNumber: isOther ? globalForm.otherInsuranceNumber : globalForm.insuranceNumber,
      vin: isOther ? globalForm.otherChassisNumber : globalForm.chassisNumber,
      currentMileage: this.parseNumberFromString(
        isOther ? globalForm.otherOdometerReading : globalForm.odometerReading
      ),
      greencardNumber: isOther ? globalForm.otherGreenCardNumber : globalForm.greenCardNumber,
      greencardExpirydate: this.mapDayjsToDate(
        isOther ? globalForm.otherValidDateGreenCard : globalForm.validDateGreenCard
      ),
      comprehensiveInsurance: this.mapToComprehensiveInsuranceEnum(
        isOther ? globalForm.otherAllRiskInsurance : globalForm.allRiskInsurance
      )
    };
  }

  /**
   * Mappt zu VehicleDriver
   */
  private static mapToVehicleDriver(globalForm: GlobalFormState, type: 'A' | 'B'): VehicleDriver {
    const isOther = type === 'B';

    const personalInfo = this.mapToPerson(
      isOther ? globalForm.otherDriverSalutation : globalForm.driverSalutation,
      isOther ? globalForm.otherDriverName : globalForm.driverName,
      isOther ? globalForm.otherDriverSurName : globalForm.driverSurName,
      isOther ? globalForm.otherDriverStreetName : globalForm.driverStreetName,
      isOther ? globalForm.otherDriverHouseNumber : globalForm.driverHouseNumber,
      isOther ? globalForm.otherDriverPostalCode : globalForm.driverPostalCode,
      isOther ? globalForm.otherDriverCity : globalForm.driverCity,
      isOther ? globalForm.otherDriverTelephone : globalForm.driverTelephone,
      isOther ? globalForm.otherDriverEmail : globalForm.driverEmail
    );

    return {
      personalInformation: personalInfo,
      driverLicensenumber: isOther ? globalForm.otherDriverDriverLicense : globalForm.driverDriverLicense,
      licenseIssuedBy: isOther ? globalForm.otherDriverLicenseIssuingAuthority : globalForm.driverLicenseIssuingAuthority,
      damagedCarImages: this.mapFileUploadsToImages(
        isOther ? globalForm.otherDriverFileUploads : globalForm.driverFileUploads
      ),
      driverDamagedpartsGraphic: this.mapToDamagedPartsEnum(
        isOther ? globalForm.otherDriverDamagedParts : globalForm.driverDamagedParts
      ),
      driverVisibleDamage: isOther ? globalForm.otherDamageDescription : globalForm.damageDescription,
      driverComments: isOther ? globalForm.otherAdditionalComments : globalForm.additionalComments,
      vehicleDrivingAbility: this.mapToVehicleDrivingAbilityEnum(
        isOther ? globalForm.otherVehicleOperational : globalForm.vehicleOperational
      ),
      damageCausedBy: this.mapToDamageCausedByEnum(
        isOther ? globalForm.otherDamageType : globalForm.damageType
      )
    };
  }

  /**
   * Mappt zu Witnesses Array
   */
  private static mapToWitnesses(witnesses: Array<{
    salutation?: string;
    name?: string;
    surName?: string;
    streetName?: string;
    houseNumber?: string;
    postalCode?: string;
    city?: string;
    telephone?: string;
    email?: string;
  }>): Witness[] {
    return witnesses.map(witness => ({
      personalInformation: this.mapToPerson(
        witness.salutation,
        witness.name,
        witness.surName,
        witness.streetName,
        witness.houseNumber,
        witness.postalCode,
        witness.city,
        witness.telephone,
        witness.email
      )
    }));
  }

  /**
   * Enum-Mapping-Methoden
   */

  private static mapToHasVehicleDamageEnum(value: boolean | string | null | undefined): ClaimsdataHasVehicleDamageEnum {
    if (value === true || value === 'true' || value === '1') {
      return ClaimsdataHasVehicleDamageEnum.True;
    }
    if (value === false || value === 'false' || value === '0') {
      return ClaimsdataHasVehicleDamageEnum.False;
    }
    return ClaimsdataHasVehicleDamageEnum.NotSpecified;
  }

  private static mapToInjuredPersonEnum(value: boolean | string | null | undefined): ClaimsdataInjuredPersonEnum {
    if (value === true || value === 'true' || value === '1') {
      return ClaimsdataInjuredPersonEnum.True;
    }
    if (value === false || value === 'false' || value === '0') {
      return ClaimsdataInjuredPersonEnum.False;
    }
    return ClaimsdataInjuredPersonEnum.NotSpecified;
  }

  private static mapToWitnessExistsEnum(value: boolean | string | null | undefined): ClaimsdataWitnessExistsEnum {
    if (value === true || value === 'true' || value === '1') {
      return ClaimsdataWitnessExistsEnum.True;
    }
    if (value === false || value === 'false' || value === '0') {
      return ClaimsdataWitnessExistsEnum.False;
    }
    return ClaimsdataWitnessExistsEnum.NotSpecified;
  }

  private static mapToInputTaxDeductionEnum(value: boolean | string | null | undefined): PolicyholderInputTaxDeductionEnum {
    if (value === true || value === 'true' || value === '1') {
      return PolicyholderInputTaxDeductionEnum.True;
    }
    if (value === false || value === 'false' || value === '0') {
      return PolicyholderInputTaxDeductionEnum.False;
    }
    return PolicyholderInputTaxDeductionEnum.NotSpecified;
  }

  private static mapToComprehensiveInsuranceEnum(value: boolean | string | null | undefined): PolicyholderComprehensiveInsuranceEnum {
    if (value === true || value === 'true' || value === '1') {
      return PolicyholderComprehensiveInsuranceEnum.True;
    }
    if (value === false || value === 'false' || value === '0') {
      return PolicyholderComprehensiveInsuranceEnum.False;
    }
    return PolicyholderComprehensiveInsuranceEnum.NotSpecified;
  }

  private static mapToVehicleDrivingAbilityEnum(value: string | undefined): VehicleDriverVehicleDrivingAbilityEnum {
    if (value === 'true' || value === '1') {
      return VehicleDriverVehicleDrivingAbilityEnum.True;
    }
    if (value === 'false' || value === '0') {
      return VehicleDriverVehicleDrivingAbilityEnum.False;
    }
    return VehicleDriverVehicleDrivingAbilityEnum.NotSpecified;
  }

  private static mapToDamageCausedByEnum(value: string | undefined): VehicleDriverDamageCausedByEnum | undefined {
    if (!value) return undefined;

    // Map the damage type to the correct enum value
    const mappings: Record<string, VehicleDriverDamageCausedByEnum> = {
      'Auffahren': VehicleDriverDamageCausedByEnum.Auffahren,
      'Rangieren/Parken': VehicleDriverDamageCausedByEnum.RangierenParken,
      'Missachtung der Vorfahrt': VehicleDriverDamageCausedByEnum.MissachtungDerVorfahrt,
      'Abbiegen': VehicleDriverDamageCausedByEnum.Abbiegen,
      'Abkommen von der Fahrbahn': VehicleDriverDamageCausedByEnum.AbkommenVonDerFahrbahn,
      'Überholvorgang': VehicleDriverDamageCausedByEnum.Berholvorgang,
      'Spurwechsel': VehicleDriverDamageCausedByEnum.Spurwechsel,
      'Sonstiges': VehicleDriverDamageCausedByEnum.Sonstiges
    };

    return mappings[value] || VehicleDriverDamageCausedByEnum.Sonstiges;
  }

  private static mapToDamagedPartsEnum(parts: string[] | undefined): VehicleDriverDriverDamagedpartsGraphicEnum[] | undefined {
    if (!parts || parts.length === 0) return undefined;

    const mappings: Record<string, VehicleDriverDriverDamagedpartsGraphicEnum> = {
      'Motorhaube': VehicleDriverDriverDamagedpartsGraphicEnum.Motorhaube,
      'Dach': VehicleDriverDriverDamagedpartsGraphicEnum.Dach,
      'Kofferraum/Heckklappe': VehicleDriverDriverDamagedpartsGraphicEnum.KofferraumHeckklappe,
      'Kühlergrill': VehicleDriverDriverDamagedpartsGraphicEnum.Khlergrill,
      'Linke Fahrzeugseite': VehicleDriverDriverDamagedpartsGraphicEnum.LinkeFahrzeugseite,
      'Rechte Fahrzeugseite': VehicleDriverDriverDamagedpartsGraphicEnum.RechteFahrzeugseite,
      'Vorderer Stoßfänger': VehicleDriverDriverDamagedpartsGraphicEnum.VordererStofnger,
      'Hinterer Stoßfänger': VehicleDriverDriverDamagedpartsGraphicEnum.HintererStofnger,
      'Fahrertür (vorne links)': VehicleDriverDriverDamagedpartsGraphicEnum.FahrertrVorneLinks,
      'Beifahrertür (vorne rechts)': VehicleDriverDriverDamagedpartsGraphicEnum.BeifahrertrVorneRechts,
      'Hintere linke Tür': VehicleDriverDriverDamagedpartsGraphicEnum.HintereLinkeTr,
      'Hintere rechte Tür': VehicleDriverDriverDamagedpartsGraphicEnum.HintereRechteTr,
      'Vorderrad links': VehicleDriverDriverDamagedpartsGraphicEnum.VorderradLinks,
      'Vorderrad rechts': VehicleDriverDriverDamagedpartsGraphicEnum.VorderradRechts,
      'Hinterrad links': VehicleDriverDriverDamagedpartsGraphicEnum.HinterradLinks,
      'Hinterrad rechts': VehicleDriverDriverDamagedpartsGraphicEnum.HinterradRechts,
      'Windschutzscheibe': VehicleDriverDriverDamagedpartsGraphicEnum.Windschutzscheibe,
      'Heckscheibe': VehicleDriverDriverDamagedpartsGraphicEnum.Heckscheibe,
      'Seitenscheibe (vorne links)': VehicleDriverDriverDamagedpartsGraphicEnum.SeitenscheibeVorneLinks,
      'Seitenscheibe (vorne rechts)': VehicleDriverDriverDamagedpartsGraphicEnum.SeitenscheibeVorneRechts,
      'Seitenscheibe (hinten links)': VehicleDriverDriverDamagedpartsGraphicEnum.SeitenscheibeHintenLinks,
      'Seitenscheibe (hinten rechts)': VehicleDriverDriverDamagedpartsGraphicEnum.SeitenscheibeHintenRechts,
      'Linker Außenspiegel': VehicleDriverDriverDamagedpartsGraphicEnum.LinkerAuenspiegel,
      'Rechter Außenspiegel': VehicleDriverDriverDamagedpartsGraphicEnum.RechterAuenspiegel,
      'Frontscheinwerfer links': VehicleDriverDriverDamagedpartsGraphicEnum.FrontscheinwerferLinks,
      'Frontscheinwerfer rechs': VehicleDriverDriverDamagedpartsGraphicEnum.FrontscheinwerferRechts,
      'Heckscheinwerfer links': VehicleDriverDriverDamagedpartsGraphicEnum.HeckscheinwerferLinks,
      'Heckscheinwerfer rechts': VehicleDriverDriverDamagedpartsGraphicEnum.HeckscheinwerferRechts,
      'Griffschalen (vorne links)': VehicleDriverDriverDamagedpartsGraphicEnum.GriffschalenVorneLinks,
      'Griffschalen (vorne rechts)': VehicleDriverDriverDamagedpartsGraphicEnum.GriffschalenVorneRechts,
      'Griffschalen (hinten links)': VehicleDriverDriverDamagedpartsGraphicEnum.GriffschalenHintenLinks,
      'Griffschalen (hinten rechts)': VehicleDriverDriverDamagedpartsGraphicEnum.GriffschalenHintenRechts,
      'Schweller links': VehicleDriverDriverDamagedpartsGraphicEnum.SchwellerLinks,
      'Schweller rechts': VehicleDriverDriverDamagedpartsGraphicEnum.SchwellerRechts
    };

    return parts.map(part => mappings[part] || VehicleDriverDriverDamagedpartsGraphicEnum.Motorhaube);
  }

  /**
   * Hilfsmethoden für die Datenkonvertierung
   */

  private static mapDayjsToDate(dayjsDate?: Dayjs | null): Date | undefined {
    if (!dayjsDate || !dayjs.isDayjs(dayjsDate)) return undefined;
    return dayjsDate.toDate();
  }

  private static mapDayjsToTimeString(dayjsTime?: Dayjs | null): string | undefined {
    if (!dayjsTime || !dayjs.isDayjs(dayjsTime)) return undefined;
    return dayjsTime.format('HH:mm:ss');
  }

  private static mapSalutationToEnum(salutation?: string): PersonFormOfAddressEnum | undefined {
    switch (salutation) {
      case 'Herr':
        return PersonFormOfAddressEnum.Herr;
      case 'Frau':
        return PersonFormOfAddressEnum.Frau;
      case 'Divers':
        return PersonFormOfAddressEnum.Divers;
      default:
        return PersonFormOfAddressEnum.NotSpecified;
    }
  }

  private static parseNumberFromString(value?: string): number | undefined {
    if (!value) return undefined;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? undefined : parsed;
  }

  private static mapFileUploadsToImages(files?: (File & { path?: string })[] | null): VehicleDriverDamagedCarImagesInner[] | undefined {
    if (!files || files.length === 0) return undefined;

    return files.map(file => ({
      file: this.fileToBase64String(file),
      path: file.path || file.name
    }));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static fileToBase64String(_file: File): string {
    // Placeholder
    return 'iVBORw0KGgoAAAANSUhEUgAAAAUA'; // Placeholder Base64
  }

  private static mapToLanguageEnum(language?: string): ClaimsdetailsLanguageEnum {
    switch (language?.toUpperCase()) {
      case 'DEUTSCH':
        return ClaimsdetailsLanguageEnum.De;
      case 'ENGLISH':
        return ClaimsdetailsLanguageEnum.En;
      case 'FRANZÖSISCH':
        return ClaimsdetailsLanguageEnum.Fr;
      case 'SPANISCH':
        return ClaimsdetailsLanguageEnum.Es;
      case 'ITALIENISCH':
        return ClaimsdetailsLanguageEnum.It;
      case 'NIEDERLÄNDISCH':
        return ClaimsdetailsLanguageEnum.Nl;
      case 'POLNISCH':
        return ClaimsdetailsLanguageEnum.Pl;
      default:
        return ClaimsdetailsLanguageEnum.De;
    }
  }
}
