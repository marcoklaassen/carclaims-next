'use client';

import { useParams } from 'next/navigation';
import { FormType } from '@/config/formConfig';
import UnifiedPersonalInfoPage from '../../../../components/UnifiedPersonalInfoPage';
import { notFound } from 'next/navigation';

export default function PersonalInfoPage() {
  const params = useParams();
  const type = params?.type as string;

  if (type !== 'a' && type !== 'b') {
    notFound();
  }

  console.log('PersonalInfoPage type:', type);

  const formType: FormType = type as FormType;

  return <UnifiedPersonalInfoPage formType={formType} />;
}
