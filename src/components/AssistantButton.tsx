'use client';

import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import StopIcon from '@mui/icons-material/Stop';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import { useAssistantStore } from '@/stores/assistantStore';

interface AssistantButtonProps {
  startAssistant: () => void;
  stopAssistant: () => void;
}

export default function AssistantButton({
  startAssistant,
  stopAssistant,
}: AssistantButtonProps) {
  const isActive = useAssistantStore((s) => s.isActive);
  const phase = useAssistantStore((s) => s.phase);

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
