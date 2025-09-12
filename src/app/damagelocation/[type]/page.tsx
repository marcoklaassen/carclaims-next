'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { FormType } from '@/config/formConfig';
import UnifiedDamageLocationPage from '../../../components/UnifiedDamageLocationPage';

export default function DamageLocationPage() {
  const params = useParams();
  const type = params?.type as string;

  if (type !== 'a' && type !== 'b') {
    notFound();
  }

  const formType: FormType = type as FormType;

  return <UnifiedDamageLocationPage formType={formType} />;
}
