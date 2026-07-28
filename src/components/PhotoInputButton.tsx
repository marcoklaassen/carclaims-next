'use client';

import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  CircularProgress,
  Fab,
  Snackbar,
  Tooltip,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { submitPhoto } from '@/api/photoApi';
import { useGlobalFormStore } from '@/types/state';

export type PhotoInputButtonProps = {
  stepKey?: string;
};

export function PhotoInputButton({ stepKey }: PhotoInputButtonProps) {
  const globalForm = useGlobalFormStore((s) => s.form);
  const setGlobalForm = useGlobalFormStore((s) => s.setGlobalForm);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const showMessage = useCallback(
    (message: string, severity: 'success' | 'error') => {
      setSnackbar({ open: true, message, severity });
    },
    []
  );

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Reset input so the same file can be selected again
      event.target.value = '';

      setIsSubmitting(true);
      try {
        const response = await submitPhoto(file, {
          currentState: globalForm as Record<string, unknown>,
          stepKey,
        });
        setGlobalForm(response);
        showMessage('Angaben übernommen', 'success');
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Fotoanalyse fehlgeschlagen';
        showMessage(message, 'error');
      } finally {
        setIsSubmitting(false);
      }
    },
    [globalForm, stepKey, setGlobalForm, showMessage]
  );

  const handleCameraClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (isSubmitting) return;
      fileInputRef.current?.click();
    },
    [isSubmitting]
  );

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <Tooltip title="Foto aufnehmen">
        <Fab
          type="button"
          color="secondary"
          aria-label="Foto aufnehmen"
          onClick={handleCameraClick}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <CameraAltIcon />
          )}
        </Fab>
      </Tooltip>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
