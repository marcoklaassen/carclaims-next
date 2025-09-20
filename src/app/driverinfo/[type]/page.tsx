'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { FormType } from '@/config/formConfig';
import UnifiedDriverInfoPage from '../../../components/UnifiedDriverInfoPage';

export default function DriverInfoPage() {
  const params = useParams();
  const type = params?.type as string;

  if (type !== 'a' && type !== 'b') {
    notFound();
  }

  const formType: FormType = type as FormType;

  return <UnifiedDriverInfoPage formType={formType} />;
}
