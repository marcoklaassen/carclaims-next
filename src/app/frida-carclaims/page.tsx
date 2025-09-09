'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyJwt } from '@/utils/jwtVerifier';
import { useGlobalFormStore } from '@/types/state';
import { Suspense } from 'react'

function TokenProcessor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');
  const setGlobalForm = useGlobalFormStore(state => state.setGlobalForm);

  useEffect(() => {
    async function processToken() {
      if (token) {
        try {
          // console.log('Attempting to verify token:', token.substring(0, 20) + '...');
          const decodedData = await verifyJwt(token);

          if (decodedData && typeof decodedData === 'object') {
            // console.log('JWT verified successfully:', decodedData);

            const formData = {
              insuranceNumber: decodedData.policyNumber ? String(decodedData.policyNumber) : '',
              insuranceHolderSalutation: decodedData.formOfAddress || '',
              insuranceHolderTitle: decodedData.title || '',
              insuranceHolderName: decodedData.firstName || '',
              insuranceHolderSurName: decodedData.lastName || '',
              insuranceHolderPostalCode: decodedData.postalCode || '',
              insuranceHolderCity: decodedData.city || '',
              insuranceHolderStreetName: decodedData.streetName || '',
              insuranceHolderHouseNumber: decodedData.houseNumber || '',
              insuranceHolderTelephone: decodedData.telephone || '',
              insuranceHolderEmail: decodedData.emailAddress || '',
              insuranceCompany: decodedData.insuranceCompany || '',
              chassisNumber: decodedData.chassisNumber || '',
              licensePlate: decodedData.licensePlate || '',
              carBrand: decodedData.carBrand || '',
              carModel: decodedData.carModel || ''
            };

            setGlobalForm(formData);
            console.log('Form data from JWT stored in global state');
          } else {
            console.error('Token konnte nicht verifiziert werden. Keine Daten gespeichert.');
          }
        } catch (err) {
          // console.error('Error processing JWT:', err);
          console.error('Error processing JWT: ', err);
        }
      } else {
        console.log('No token provided in URL');
      }

      // Always redirect to disclaimer page, regardless of token status
      router.push('/frida-carclaims/disclaimer');
    }

    processToken();
  }, [token, router, setGlobalForm]);

  return null;
}

export default function FridaCarClaimsPage() {
  return (
    <Suspense fallback={<div>Lade...</div>}>
      <TokenProcessor />
    </Suspense>
  );
}