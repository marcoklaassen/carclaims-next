import { useCallback, useState } from 'react';
import { I_OSMAddressDetails } from '../types';

const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation wird von diesem Browser nicht unterstützt'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export function useGetAddress() {
  const [error, setError] = useState<Error | GeolocationPositionError | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAddress = useCallback(async (): Promise<I_OSMAddressDetails | null> => {
    setLoading(true);
    setError(undefined);

    try {
      // Geolocation abrufen
      const position = await getCurrentPosition();
      const { latitude: lat, longitude: lng } = position.coords;

      // Anfrage an Backend senden
      const url = `/api/osm-reverse?lat=${lat}&lon=${lng}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addressData: I_OSMAddressDetails = await response.json();
      setLoading(false);
      return addressData;
    } catch (err) {
      console.error('Fehler beim Abrufen der Adresse:', err);
      setError(err as Error | GeolocationPositionError);
      setLoading(false);
      return null;
    }
  }, []);

  return { getAddress, error, loading };
}
