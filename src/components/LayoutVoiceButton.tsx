'use client';

import { usePathname } from 'next/navigation';
import { useGlobalFormStore } from '@/types/state';
import { VoiceInputButton } from './VoiceInputButton';

const PATHNAME_TO_STEP_KEY: Record<string, string> = {
  '/accidentinfo': 'carclaimsDetails',
  '/accidentlocation': 'carclaimsDetails',
  '/personalinfo/a': 'insurance-holder-a',
  '/vehicleinfo/a': 'insurance-holder-a',
  '/driverinfo/a': 'driver-a',
  '/damagelocation/a': 'driver-a',
  '/damagedescription/a': 'driver-a',
  '/personalinfo/b': 'insurance-holder-b',
  '/vehicleinfo/b': 'insurance-holder-b',
  '/driverinfo/b': 'driver-b',
  '/damagelocation/b': 'driver-b',
  '/damagedescription/b': 'driver-b',
  '/injuredpersons': 'injuredDetails',
  '/miscellaneousdamages': 'miscellaneousDamages',
  '/witnesses': 'witness',
};

export default function LayoutVoiceButton() {
  const pathname = usePathname();
  const language = useGlobalFormStore((s) => s.form.language);

  if (pathname === '/disclaimer') return null;

  const stepKey = pathname ? PATHNAME_TO_STEP_KEY[pathname] : undefined;

  return <VoiceInputButton language={language} stepKey={stepKey} />;
}
