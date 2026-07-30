'use client';

import { usePathname } from 'next/navigation';
import { useGlobalFormStore } from '@/types/state';
import ExpandableFab from './ExpandableFab';
import AssistantBottomSheet from './AssistantBottomSheet';
import { useAssistantLoop } from '@/hooks/useAssistantLoop';

const PATHNAME_TO_STEP_KEY: Record<string, string> = {
  '/accidentinfo': 'accident-info',
  '/accidentlocation': 'accident-location',
  '/personalinfo/a': 'personal-info-a',
  '/vehicleinfo/a': 'vehicle-info-a',
  '/driverinfo/a': 'driver-info-a',
  '/damagelocation/a': 'damage-location-a',
  '/damagedescription/a': 'damage-description-a',
  '/personalinfo/b': 'personal-info-b',
  '/vehicleinfo/b': 'vehicle-info-b',
  '/driverinfo/b': 'driver-info-b',
  '/damagelocation/b': 'damage-location-b',
  '/damagedescription/b': 'damage-description-b',
  '/injuredpersons': 'injured-persons',
  '/miscellaneousdamages': 'miscellaneous-damages',
  '/witnesses': 'witnesses',
};

export default function LayoutVoiceButton() {
  const pathname = usePathname();
  const language = useGlobalFormStore((s) => s.form.language);
  const { startAssistant, stopAssistant } = useAssistantLoop();

  if (pathname === '/disclaimer') return null;

  const stepKey = pathname ? PATHNAME_TO_STEP_KEY[pathname] : undefined;

  return (
    <>
      <ExpandableFab
        startAssistant={startAssistant}
        stopAssistant={stopAssistant}
        language={language}
        stepKey={stepKey}
      />
      <AssistantBottomSheet stopAssistant={stopAssistant} />
    </>
  );
}
