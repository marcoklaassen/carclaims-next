'use client';

import React, { useState, useEffect } from 'react';
import { Box, Fab, Zoom } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useAssistantStore } from '@/stores/assistantStore';
import AssistantButton from './AssistantButton';
import { PhotoInputButton } from './PhotoInputButton';
import { VoiceInputButton } from './VoiceInputButton';

interface ExpandableFabProps {
  startAssistant: () => void;
  stopAssistant: () => void;
  language?: string;
  stepKey?: string;
}

export default function ExpandableFab({
  startAssistant,
  stopAssistant,
  language,
  stepKey,
}: ExpandableFabProps) {
  const [expanded, setExpanded] = useState(false);
  const isAssistantActive = useAssistantStore((s) => s.isActive);

  // Auto-collapse when assistant becomes active
  useEffect(() => {
    if (isAssistantActive) {
      setExpanded(false);
    }
  }, [isAssistantActive]);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
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
      {/* Action FABs - appear above toggle when expanded */}
      <Zoom in={expanded} timeout={300} style={{ transitionDelay: expanded ? '150ms' : '0ms' }}>
        <Box>
          <AssistantButton
            startAssistant={startAssistant}
            stopAssistant={stopAssistant}
          />
        </Box>
      </Zoom>

      <Zoom in={expanded} timeout={300} style={{ transitionDelay: expanded ? '75ms' : '0ms' }}>
        <Box>
          <PhotoInputButton stepKey={stepKey} />
        </Box>
      </Zoom>

      <Zoom in={expanded} timeout={300} style={{ transitionDelay: expanded ? '0ms' : '0ms' }}>
        <Box>
          <VoiceInputButton language={language} stepKey={stepKey} />
        </Box>
      </Zoom>

      {/* Toggle FAB - hidden when assistant is active */}
      {!isAssistantActive && (
        <Fab
          color="default"
          onClick={handleToggle}
          aria-label={expanded ? 'Menü schließen' : 'Menü öffnen'}
          size="medium"
          sx={{
            bgcolor: 'grey.700',
            '&:hover': { bgcolor: 'grey.800' },
            color: 'white',
          }}
        >
          {expanded ? <CloseIcon /> : <MenuIcon />}
        </Fab>
      )}

      {/* When assistant is active, show only the assistant button */}
      {isAssistantActive && (
        <AssistantButton
          startAssistant={startAssistant}
          stopAssistant={stopAssistant}
        />
      )}
    </Box>
  );
}
