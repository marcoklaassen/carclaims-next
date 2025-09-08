'use client';

import { useParams } from 'next/navigation';
import { FormType } from '@/config/formConfig';
import UnifiedVehicleInfoPage from '../../../../components/UnifiedVehicleInfoPage';
import { notFound } from 'next/navigation';

export default function VehicleInfoPage() {
  const params = useParams();
  const type = params?.type as string;

  if (type !== 'a' && type !== 'b') {
    notFound();
  }

  const formType: FormType = type as FormType;

  return <UnifiedVehicleInfoPage formType={formType} />;
}