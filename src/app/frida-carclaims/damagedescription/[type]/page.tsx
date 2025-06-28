'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { FormType } from '@/config/formConfig';
import UnifiedDamageDescriptionPage from '../../../../components/UnifiedDamageDescriptionPage';

export default function DamageDescriptionPage() {
  const params = useParams();
  const type = params?.type as string;

  if (type !== 'a' && type !== 'b') {
    notFound();
  }

  console.log('DamageDescriptionPage type:', type);

  const formType: FormType = type as FormType;

  return <UnifiedDamageDescriptionPage formType={formType} />;
}
