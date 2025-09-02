import { ClaimsdataMapper } from './claimsdataMapper';
import { useGlobalFormStore } from '../types/state';
import { ClaimsApi, Claimsdata } from '../openapi/generated';

/**
 * Service für die Verwendung des ClaimsdataMapper
 */
export class ClaimsSubmissionService {

  /**
   * Sendet die Claims-Daten an die API
   */
  static async submitClaims(): Promise<{ success: boolean; data?: unknown }> {
    try {

      const globalForm = useGlobalFormStore.getState().form;

      const claimsdata = ClaimsdataMapper.mapToClaimsdata(globalForm);

      console.log('📤 Übermittle Claims-Daten:', claimsdata);

      // Policennummer aus den Daten extrahieren
      const policyNumber = claimsdata.policyholder.policyNumber;

      if (!policyNumber) {
        throw new Error('❌ Policennummer ist erforderlich für die Claims-Übermittlung. Bitte fülle die Versicherungsdaten vollständig aus.');
      }

      const api = new ClaimsApi();
      const response = await api.createClaimByPID({
        policyNumber: policyNumber,
        claimsdata: claimsdata
      });

      console.log('✅ Claims erfolgreich übermittelt:', response);

      return { success: true, data: response };

    } catch (error) {
      console.error('❌ Fehler beim Übermitteln der Claims:', error
      );

      throw error;
    }
  }

  /**
   * Validiert das Claimsdata-Objekt vor der Übermittlung
   */
  private static validateClaimsdata(claimsdata: Claimsdata): void {

    if (!claimsdata.policyholder) {
      throw new Error('Policyholder A ist erforderlich');
    }

    if (!claimsdata.otherPolicyholder) {
      throw new Error('Policyholder B ist erforderlich');
    }


    if (!claimsdata.policyholder.policyNumber) {
      throw new Error('Policennummer ist erforderlich. Bitte fülle die Versicherungsdaten aus.');
    }

    if (!claimsdata.policyholder.personalInformation?.lastName) {
      throw new Error('Name des Versicherungsnehmers A ist erforderlich');
    }

    if (!claimsdata.otherPolicyholder.personalInformation?.lastName) {
      throw new Error('Name des Versicherungsnehmers B ist erforderlich');
    }

    console.log('✅ Claimsdata-Validierung erfolgreich');
  }

  /**
   * Überprüft, ob alle erforderlichen Daten für die Claims-Übermittlung vorhanden sind
   */
  static checkRequiredData(): { isReady: boolean; missingFields: string[] } {
    const globalForm = useGlobalFormStore.getState().form;
    const claimsdata = ClaimsdataMapper.mapToClaimsdata(globalForm);

    const missingFields: string[] = [];

    if (!claimsdata.policyholder.policyNumber) {
      missingFields.push('Policennummer von Versicherungsnehmer');
    }

    if (!claimsdata.policyholder.personalInformation?.lastName) {
      missingFields.push('Name von Versicherungsnehmer');
    }

    if (!claimsdata.otherPolicyholder.personalInformation?.lastName) {
      missingFields.push('Name des Geschädigten');
    }

    if (!claimsdata.claimsDetails?.accidentDate) {
      missingFields.push('Unfalldatum');
    }

    const isReady = missingFields.length === 0;

    console.log('📋 Claims-Bereitschaftsprüfung:', {
      isReady,
      missingFields,
      policyNumber: claimsdata.policyholder.policyNumber,
      apiUrl: `/claimsdata/${claimsdata.policyholder.policyNumber || 'MISSING'}`
    });

    return { isReady, missingFields };
  }
}
