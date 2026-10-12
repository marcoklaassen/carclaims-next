'use client';

import { create } from 'zustand';

import type { ConversationEntry } from '../api/assistantApi';

export type AssistantPhase =
  | 'idle'
  | 'speaking'
  | 'listening'
  | 'processing'
  | 'photo-prompt'
  | 'done';

export interface ConversationMessage {
  role: 'assistant' | 'user';
  /** 'question' = AI speaking a question; 'action' = field-fill confirmation; undefined treated as 'question' */
  type?: 'question' | 'action';
  text: string;
}

export type { ConversationEntry };

interface AssistantState {
  isActive: boolean;
  isPaused: boolean;
  phase: AssistantPhase;
  messages: ConversationMessage[];
  conversationHistory: ConversationEntry[];
  currentQuestion: string | null;
  photoRecommendation: string | null;
  error: string | null;

  setActive: (active: boolean) => void;
  setIsPaused: (paused: boolean) => void;
  setPhase: (phase: AssistantPhase) => void;
  addMessage: (msg: ConversationMessage) => void;
  addHistoryEntry: (entry: ConversationEntry) => void;
  setCurrentQuestion: (question: string | null) => void;
  setPhotoRecommendation: (rec: string | null) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  isActive: false,
  isPaused: false,
  phase: 'idle' as AssistantPhase,
  messages: [] as ConversationMessage[],
  conversationHistory: [] as ConversationEntry[],
  currentQuestion: null as string | null,
  photoRecommendation: null as string | null,
  error: null as string | null,
};

export const useAssistantStore = create<AssistantState>((set) => ({
  ...initialState,
  setActive: (active) => set({ isActive: active }),
  setIsPaused: (paused) => set({ isPaused: paused }),
  setPhase: (phase) => set({ phase }),
  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
  addHistoryEntry: (entry) =>
    set((state) => ({
      conversationHistory: [...state.conversationHistory, entry],
    })),
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setPhotoRecommendation: (rec) => set({ photoRecommendation: rec }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
