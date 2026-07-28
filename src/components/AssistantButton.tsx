'use client';

import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import StopIcon from '@mui/icons-material/Stop';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import { useAssistantStore } from '@/stores/assistantStore';
import { useAssistantLoop } from '@/hooks/useAssistantLoop';

export default function AssistantButton() {
  const isActive = useAssistantStore((s) => s.isActive);
  const phase = useAssistantStore((s) => s.phase);
  const { startAssistant, stopAssistant } = useAssistantLoop();

  const isLoading = phase === 'processing';

  const handleClick = () => {
    if (isActive) {
      stopAssistant();
    } else {
      startAssistant();
    }
  };

  return (
    <Fab
      color={isActive ? 'error' : 'primary'}
      onClick={handleClick}
      disabled={isLoading}
      aria-label={isActive ? 'Assistent stoppen' : 'Assistent starten'}
      size="medium"
    >
      {isLoading ? (
        <CircularProgress size={24} color="inherit" />
      ) : isActive ? (
        <StopIcon />
      ) : (
        <HeadsetMicIcon />
      )}
    </Fab>
  );
}
