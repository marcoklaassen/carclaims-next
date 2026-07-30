'use client';

import { useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssistantStore } from '../stores/assistantStore';
import { useGlobalFormStore } from '../../types/state';
import {
  submitAssistantTurn,
  type AssistantTurnResponse,
} from '../api/assistantApi';

export function useAssistantLoop() {
  const router = useRouter();
  const globalForm = useGlobalFormStore((s) => s.form);
  const setGlobalForm = useGlobalFormStore((s) => s.setGlobalForm);

  const {
    conversationHistory,
    error,
    setActive,
    setPhase,
    addMessage,
    addHistoryEntry,
    setCurrentQuestion,
    setPhotoRecommendation,
    setError,
    reset,
  } = useAssistantStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vadRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isActiveRef = useRef<boolean>(false);
  const previousStepKeyRef = useRef<string | null>(null);
  const previousQuestionRef = useRef<string | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const globalFormRef = useRef(globalForm);
  const conversationHistoryRef = useRef(conversationHistory);

  useEffect(() => {
    globalFormRef.current = globalForm;
  }, [globalForm]);

  useEffect(() => {
    conversationHistoryRef.current = conversationHistory;
  }, [conversationHistory]);

  const playAudio = useCallback(
    (audioUrl: string): Promise<void> =>
      new Promise((resolve, reject) => {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.onended = () => {
          audioRef.current = null;
          resolve();
        };
        audio.onerror = () => {
          audioRef.current = null;
          reject(new Error('Audio playback failed'));
        };
        audio.play().catch(reject);
      }),
    [],
  );

  const stopVad = useCallback(() => {
    if (vadRef.current) {
      vadRef.current.pause();
      vadRef.current.destroy();
      vadRef.current = null;
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const handleSpeechEnd = useCallback(
    async (audioData: Float32Array) => {
      if (!isActiveRef.current) {
        return null;
      }

      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }

      setPhase('processing');
      stopVad();

      try {
        const { utils } = await import('@ricky0123/vad-web');
        const wavBuffer = utils.encodeWAV(audioData);
        const blob = new Blob([wavBuffer], { type: 'audio/wav' });

        const response = await submitAssistantTurn(blob, {
          currentState: globalFormRef.current,
          conversationHistory: conversationHistoryRef.current,
          previousStepKey: previousStepKeyRef.current || undefined,
          previousQuestion: previousQuestionRef.current || undefined,
        });

        if (response.transcript) {
          addMessage({ role: 'user', text: response.transcript });
          if (previousQuestionRef.current && previousStepKeyRef.current) {
            addHistoryEntry({
              question: previousQuestionRef.current,
              answer: response.transcript,
              stepKey: previousStepKeyRef.current,
            });
          }
        }

        // Handle response will be called after this
        return response;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Verbindung fehlgeschlagen',
        );
        setPhase('idle');
        return null;
      }
    },
    [setPhase, stopVad, addMessage, addHistoryEntry, setError],
  );

  const startListening = useCallback(async () => {
    setPhase('listening');
    setError(null);

    try {
      const vadModule = await import('@ricky0123/vad-web');
      const vad = await vadModule.MicVAD.new({
        baseAssetPath: '/',
        onnxWASMBasePath: '/',
        ortConfig: (ort) => {
          ort.env.wasm.numThreads = 1;
          ort.env.wasm.proxy = false;
        },
        onSpeechEnd: async (audio: Float32Array) => {
          const response = await handleSpeechEnd(audio);
          if (response) {
            await handleTurnResponseRef.current(response);
          }
        },
        onSpeechStart: () => {
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
        },
      });
      vadRef.current = vad;
      vad.start();

      silenceTimerRef.current = setTimeout(() => {
        addMessage({
          role: 'assistant',
          text: 'Ich hoere Sie gerade nicht. Moechten Sie fortfahren?',
        });
      }, 30000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`VAD init failed: ${msg}`);
      setPhase('idle');
    }
  }, [setPhase, setError, handleSpeechEnd, addMessage]);

  const handleTurnResponseRef = useRef<(response: AssistantTurnResponse) => Promise<void>>(async () => {});

  const handleTurnResponse = useCallback(
    async (response: AssistantTurnResponse) => {
      if (!isActiveRef.current) {
        return;
      }

      if (response.claimsData) {
        setGlobalForm(response.claimsData);
      }

      if (response.navigateTo) {
        router.push(response.navigateTo);
      }

      setPhotoRecommendation(response.photoRecommendation);

      if (response.done) {
        setPhase('done');
        if (response.question) {
          addMessage({ role: 'assistant', text: response.question });
        }
        if (response.audioUrl) {
          await playAudio(response.audioUrl).catch(() => {});
        }
        stopVad();
        return;
      }

      if (response.question) {
        setCurrentQuestion(response.question);
        addMessage({ role: 'assistant', text: response.question });
        previousStepKeyRef.current = response.stepKey;
        previousQuestionRef.current = response.question;
      }

      // Handle photo-intro: show photo prompt instead of listening
      if (response.photoRecommendation && response.stepKey === 'photo-intro') {
        setPhase('photo-prompt');
        if (response.audioUrl) {
          await playAudio(response.audioUrl).catch(() => {});
        }
        return;
      }

      if (response.audioUrl) {
        setPhase('speaking');
        try {
          await playAudio(response.audioUrl);
        } catch {
          // audio playback failed, continue to listening
        }
        startListening();
      }
    },
    [setGlobalForm, router, setPhase, addMessage, setCurrentQuestion, setPhotoRecommendation, playAudio, stopVad, startListening],
  );

  useEffect(() => {
    handleTurnResponseRef.current = handleTurnResponse;
  }, [handleTurnResponse]);

  const startAssistant = useCallback(async () => {
    reset();
    setActive(true);
    setPhase('processing');
    isActiveRef.current = true;

    try {
      const response = await submitAssistantTurn(null, {
        currentState: globalFormRef.current,
        conversationHistory: [],
      });
      await handleTurnResponse(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Verbindung fehlgeschlagen',
      );
      setPhase('idle');
    }
  }, [reset, setActive, setPhase, handleTurnResponse, setError]);

  const stopAssistant = useCallback(() => {
    isActiveRef.current = false;
    stopVad();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setActive(false);
    setPhase('idle');
  }, [stopVad, setActive, setPhase]);

  const continueAfterPhoto = useCallback(async () => {
    if (!isActiveRef.current) {
      return;
    }

    setPhase('processing');
    try {
      const response = await submitAssistantTurn(null, {
        currentState: globalFormRef.current,
        conversationHistory: conversationHistoryRef.current,
        previousStepKey: previousStepKeyRef.current || undefined,
        previousQuestion: previousQuestionRef.current || undefined,
      });
      await handleTurnResponse(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Verbindung fehlgeschlagen',
      );
      setPhase('idle');
    }
  }, [setPhase, handleTurnResponse, setError]);

  const skipPhoto = useCallback(async () => {
    if (!isActiveRef.current) {
      return;
    }

    setPhase('processing');
    try {
      const response = await submitAssistantTurn(null, {
        currentState: globalFormRef.current,
        conversationHistory: conversationHistoryRef.current,
        previousStepKey: previousStepKeyRef.current || undefined,
        previousQuestion: previousQuestionRef.current || undefined,
      });
      await handleTurnResponse(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Verbindung fehlgeschlagen',
      );
      setPhase('idle');
    }
  }, [setPhase, handleTurnResponse, setError]);

  useEffect(() => {
    return () => {
      stopVad();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [stopVad]);

  return { startAssistant, stopAssistant, continueAfterPhoto, skipPhoto, error };
}
