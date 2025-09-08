export interface JwtPayload {
  policyNumber: string;
  formOfAddress: string;
  title: string;
  lastName: string;
  firstName: string;
  postalCode: string;
  city: string;
  streetName: string;
  houseNumber: string;
  telephone: string;
  emailAddress: string;
  insuranceCompany: string;
  chassisNumber: string;
  licensePlate: string;
  carBrand: string;
  carModel: string;
  iat?: number;
}

/**
 * Verifiziert ein JWT Token über einen Server-API-Endpoint
 */
export async function verifyJwt(token: string): Promise<JwtPayload | null> {
  if (!token) {
    console.error('Kein Token übermittelt');
    return null;
  }

  const cleanedToken = token.trim();

  try {
    console.log('Sende Token zur serverseitigen Verifizierung...');

    const response = await fetch('/api/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: cleanedToken }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      //   console.log("Token erfolgreich verifiziert:", result.data);
      return result.data as JwtPayload;
    } else {
      console.error('Token-Verifizierung fehlgeschlagen:', result.message);
      return null;
    }
  } catch (error) {
    console.error('Fehler beim Verifizieren des Tokens:', error);
    return null;
  }
}
