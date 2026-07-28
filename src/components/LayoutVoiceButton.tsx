'use client';

import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useGlobalFormStore } from '@/types/state';
import { VoiceInputButton } from './VoiceInputButton';
import { PhotoInputButton } from './PhotoInputButton';
import AssistantButton from './AssistantButton';
import AssistantBottomSheet from './AssistantBottomSheet';
import { useAssistantStore } from '@/stores/assistantStore';
import { useAssistantLoop } from '@/hooks/useAssistantLoop';

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
  const isAssistantActive = useAssistantStore((s) => s.isActive);
  const { startAssistant, stopAssistant } = useAssistantLoop();

  if (pathname === '/disclaimer') return null;

  const stepKey = pathname ? PATHNAME_TO_STEP_KEY[pathname] : undefined;

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
          zIndex: 1300,
        }}
      >
        <AssistantButton
          startAssistant={startAssistant}
          stopAssistant={stopAssistant}
        />
        {!isAssistantActive && (
          <>
            <PhotoInputButton stepKey={stepKey} />
            <VoiceInputButton language={language} stepKey={stepKey} />
          </>
        )}
      </Box>
      <AssistantBottomSheet stopAssistant={stopAssistant} />
    </>
  );
}
