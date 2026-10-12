'use client';

import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Alert from '@mui/material/Alert';
import { keyframes } from '@mui/material/styles';
import { useAssistantStore } from '@/stores/assistantStore';
import { useGlobalFormStore, serializeForm } from '@/types/state';
import { submitPhoto } from '@/api/photoApi';
import { computeChangedFields, generateFilledSummary } from '@/utils/fieldLabels';

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

interface AssistantBottomSheetProps {
  stopAssistant: () => void;
  pauseAssistant: () => void;
  resumeAssistant: () => void;
  continueAfterPhoto: () => void;
  skipPhoto: () => void;
}

export default function AssistantBottomSheet({
  stopAssistant,
  pauseAssistant,
  resumeAssistant,
  continueAfterPhoto,
  skipPhoto,
}: AssistantBottomSheetProps) {
  const {
    isActive,
    isPaused,
    phase,
    messages,
    error,
    setError,
    setPhotoRecommendation,
    addMessage,
  } = useAssistantStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const globalForm = useGlobalFormStore((s) => s.form);
  const setGlobalForm = useGlobalFormStore((s) => s.setGlobalForm);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePhotoCapture = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = '';
    setIsUploading(true);

    const beforeSerialized = serializeForm(globalForm);

    try {
      const result = await submitPhoto(file, {
        currentState: globalForm as Record<string, unknown>,
      });

      const userText = result.imageDescription ?? 'Foto hochgeladen';
      addMessage({ role: 'user', text: userText });

      const afterSerialized = result.claimsData as Record<string, unknown>;
      const changedFields = computeChangedFields(beforeSerialized, afterSerialized);
      const summary = generateFilledSummary(changedFields);
      if (summary) {
        addMessage({ role: 'assistant', type: 'action', text: summary });
      }

      setGlobalForm(result.claimsData);
      setPhotoRecommendation(null);

      if (phase === 'photo-prompt') {
        continueAfterPhoto();
      }
    } catch {
      setError('Foto konnte nicht verarbeitet werden');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Drawer
      anchor="bottom"
      open={isActive}
      variant="persistent"
      sx={{
        '& .MuiDrawer-paper': {
          height: '42vh',
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {(phase === 'listening' || isPaused) && (
            <IconButton
              onClick={isPaused ? resumeAssistant : pauseAssistant}
              size="small"
              aria-label={isPaused ? 'Fortsetzen' : 'Pausieren'}
            >
              {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
            </IconButton>
          )}
          <IconButton onClick={stopAssistant} size="small" aria-label="Assistent beenden">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Chat messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {messages.length === 0 && (
          <Typography variant="caption" color="text.disabled" sx={{ textAlign: 'center', mt: 2 }}>
            Konversation startet...
          </Typography>
        )}

        {messages.map((msg, i) => {
          const isUser = msg.role === 'user';
          const isAction = msg.role === 'assistant' && msg.type === 'action';

          return (
            <Box
              key={i}
              sx={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
              }}
            >
              <Box
                sx={{
                  maxWidth: '82%',
                  px: 1.5,
                  py: 0.75,
                  borderRadius: isUser
                    ? '16px 16px 4px 16px'
                    : '16px 16px 16px 4px',
                  bgcolor: isUser
                    ? 'primary.main'
                    : isAction
                      ? 'grey.300'
                      : 'grey.400',
                  color: isUser
                    ? 'primary.contrastText'
                    : 'text.primary',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    ...(isAction && { fontStyle: 'italic', fontWeight: 300 }),
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            </Box>
          );
        })}

        <div ref={chatEndRef} />
      </Box>

      {/* Error alert */}
      {error && (
        <Box sx={{ px: 2, pb: 1, flexShrink: 0 }}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Box>
      )}

      {/* Photo capture button */}
      {phase === 'photo-prompt' ? (
        <Box
          sx={{
            px: 2,
            pb: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            flexShrink: 0,
          }}
        >
          <Fab
            size="medium"
            onClick={() => !isUploading && fileInputRef.current?.click()}
            disabled={isUploading}
            aria-label="Foto aufnehmen"
            color="secondary"
          >
            {isUploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <CameraAltIcon />
            )}
          </Fab>
          <Button
            variant="text"
            size="small"
            onClick={skipPhoto}
            sx={{ textTransform: 'none' }}
          >
            Weiter ohne Foto
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            onChange={handlePhotoCapture}
          />
        </Box>
      ) : (
        <Box sx={{ flexShrink: 0 }}>
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

      {/* Status bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          py: 1,
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
        {phase === 'listening' && !isPaused && (
          <>
            <MicIcon
              fontSize="small"
              sx={{ color: '#ee0000', animation: `${pulse} 1s infinite` }}
            />
            <Typography variant="caption" color="text.secondary">
              Hoert zu...
            </Typography>
          </>
        )}
        {isPaused && (
          <>
            <PauseIcon fontSize="small" sx={{ color: 'text.disabled' }} />
            <Typography variant="caption" color="text.disabled">
              Pausiert
            </Typography>
          </>
        )}
        {phase === 'processing' && (
          <>
            <CircularProgress size={14} />
            <Typography variant="caption" color="text.secondary">
              Verarbeitet...
            </Typography>
          </>
        )}
        {phase === 'photo-prompt' && !isUploading && (
          <Typography variant="caption" color="text.secondary">
            Warte auf Foto...
          </Typography>
        )}
        {isUploading && (
          <>
            <CircularProgress size={14} />
            <Typography variant="caption" color="text.secondary">
              Foto wird analysiert...
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
