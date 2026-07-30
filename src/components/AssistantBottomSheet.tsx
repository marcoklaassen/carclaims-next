'use client';

import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Alert from '@mui/material/Alert';
import { keyframes } from '@mui/material/styles';
import { useAssistantStore } from '@/stores/assistantStore';
import { useGlobalFormStore } from '@/types/state';
import { submitPhoto } from '@/api/photoApi';
import { computeSectionProgress } from '@/utils/assistantProgress';

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

interface AssistantBottomSheetProps {
  stopAssistant: () => void;
  continueAfterPhoto: () => void;
  skipPhoto: () => void;
}

export default function AssistantBottomSheet({
  stopAssistant,
  continueAfterPhoto,
  skipPhoto,
}: AssistantBottomSheetProps) {
  const {
    isActive,
    phase,
    currentQuestion,
    photoRecommendation,
    error,
    setError,
    setPhotoRecommendation,
  } = useAssistantStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const globalForm = useGlobalFormStore((s) => s.form);
  const setGlobalForm = useGlobalFormStore((s) => s.setGlobalForm);

  const progressData = computeSectionProgress(
    globalForm as Record<string, unknown>,
  );

  const handlePhotoCapture = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = '';
    setIsUploading(true);
    try {
      const result = await submitPhoto(file, {
        currentState: globalForm as Record<string, unknown>,
      });
      setGlobalForm(result);
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

      {/* Progress sections */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 2,
        }}
      >
        {progressData.map(({ section, filled, total }) => (
          <Box
            key={section.id}
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}
          >
            {filled === total ? (
              <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main' }} />
            ) : (
              <Box sx={{ width: 18, height: 18 }} />
            )}
            <Typography
              variant="body2"
              sx={{
                minWidth: 140,
                color: filled === total ? 'success.main' : 'text.secondary',
              }}
            >
              {section.label}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(filled / total) * 100}
              sx={{ flex: 1, height: 6, borderRadius: 3 }}
            />
          </Box>
        ))}
      </Box>

      {/* Current question */}
      {currentQuestion && (
        <Box sx={{ px: 2, py: 1.5, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
            {currentQuestion}
          </Typography>
        </Box>
      )}

      {/* Error alert */}
      {error && (
        <Box sx={{ px: 2, pb: 1 }}>
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
            pb: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Fab
            size="large"
            color="secondary"
            onClick={() => !isUploading && fileInputRef.current?.click()}
            disabled={isUploading}
            aria-label="Foto aufnehmen"
          >
            {isUploading ? (
              <CircularProgress size={28} color="inherit" />
            ) : (
              <CameraAltIcon fontSize="large" />
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
        photoRecommendation && (
          <Box
            sx={{
              px: 2,
              pb: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Fab
              size="small"
              color="secondary"
              onClick={() => !isUploading && fileInputRef.current?.click()}
              disabled={isUploading}
              aria-label="Foto aufnehmen"
            >
              {isUploading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <CameraAltIcon />
              )}
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
        )
      )}

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
        {phase === 'photo-prompt' && !isUploading && (
          <Typography variant="caption" color="text.secondary">
            Warte auf Foto...
          </Typography>
        )}
        {isUploading && (
          <>
            <CircularProgress size={16} />
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
