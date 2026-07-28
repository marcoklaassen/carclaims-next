'use client';

import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Alert from '@mui/material/Alert';
import { keyframes } from '@mui/material/styles';
import { useAssistantStore } from '@/stores/assistantStore';
import { useAssistantLoop } from '@/hooks/useAssistantLoop';
import { useGlobalFormStore } from '@/types/state';
import { submitPhoto } from '@/api/photoApi';

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

export default function AssistantBottomSheet() {
  const {
    isActive,
    phase,
    messages,
    photoRecommendation,
    error,
    setError,
    setPhotoRecommendation,
  } = useAssistantStore();
  const { stopAssistant } = useAssistantLoop();
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const globalForm = useGlobalFormStore((s) => s.form);
  const setGlobalForm = useGlobalFormStore((s) => s.setGlobalForm);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePhotoCapture = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = '';
    try {
      const result = await submitPhoto(file, {
        currentState: globalForm as Record<string, unknown>,
      });
      setGlobalForm(result);
      setPhotoRecommendation(null);
    } catch {
      setError('Foto konnte nicht verarbeitet werden');
    }
  };

  return (
    <Drawer
      anchor="bottom"
      open={isActive}
      variant="persistent"
      sx={{
        '& .MuiDrawer-paper': {
          height: '40vh',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          borderBottom: 1,
          borderColor: 'divider',
          flexShrink: 0,
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          Assistent
        </Typography>
        <IconButton onClick={stopAssistant} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Conversation area */}
      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              alignSelf: msg.role === 'assistant' ? 'flex-start' : 'flex-end',
              maxWidth: '80%',
              px: 1.5,
              py: 1,
              borderRadius: 2,
              bgcolor:
                msg.role === 'assistant'
                  ? 'grey.100'
                  : 'primary.main',
              color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary',
            }}
          >
            <Typography variant="body2">{msg.text}</Typography>
          </Box>
        ))}

        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}

        {photoRecommendation && (
          <Box sx={{ alignSelf: 'center', mt: 1 }}>
            <Fab
              size="small"
              color="secondary"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Foto aufnehmen"
            >
              <CameraAltIcon />
            </Fab>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              onChange={handlePhotoCapture}
            />
          </Box>
        )}
      </Box>

      {/* Status bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          py: 1.5,
          borderTop: 1,
          borderColor: 'divider',
          flexShrink: 0,
        }}
      >
        {phase === 'speaking' && (
          <>
            <VolumeUpIcon
              fontSize="small"
              color="primary"
              sx={{ animation: `${pulse} 1.5s infinite` }}
            />
            <Typography variant="caption" color="text.secondary">
              Spricht...
            </Typography>
          </>
        )}
        {phase === 'listening' && (
          <>
            <MicIcon
              fontSize="small"
              color="error"
              sx={{ animation: `${pulse} 1s infinite` }}
            />
            <Typography variant="caption" color="text.secondary">
              Hoert zu...
            </Typography>
          </>
        )}
        {phase === 'processing' && (
          <>
            <CircularProgress size={16} />
            <Typography variant="caption" color="text.secondary">
              Verarbeitet...
            </Typography>
          </>
        )}
        {phase === 'done' && (
          <Typography variant="caption" color="success.main">
            Abgeschlossen
          </Typography>
        )}
      </Box>
    </Drawer>
  );
}
