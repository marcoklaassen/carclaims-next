import type { Claimsdata } from '@/types/models';
import { getAudioFilename } from '@/utils/audioUpload';

const ASSISTANT_TURN_URL =
  process.env.NEXT_PUBLIC_ASSISTANT_TURN_URL || '/api/assistant/turn';

export interface ConversationEntry {
  question: string;
  answer: string;
  stepKey: string;
}

export interface AssistantTurnRequest {
  currentState: Partial<Claimsdata>;
  conversationHistory: ConversationEntry[];
  previousStepKey?: string;
  previousQuestion?: string;
}

export interface AssistantTurnResponse {
  question: string | null;
  stepKey: string | null;
  navigateTo: string | null;
  audioUrl: string | null;
  claimsData: Partial<Claimsdata> | null;
  transcript: string | null;
  done: boolean;
  photoRecommendation: string | null;
}

export class AssistantApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = 'AssistantApiError';
  }
}

export async function submitAssistantTurn(
  audio: Blob | null,
  options: AssistantTurnRequest,
): Promise<AssistantTurnResponse> {
  const formData = new FormData();

  if (audio) {
    formData.append('audio', audio, getAudioFilename(audio));
  }

  formData.append('currentState', JSON.stringify(options.currentState));
  formData.append(
    'conversationHistory',
    JSON.stringify(options.conversationHistory),
  );

  if (options.previousStepKey) {
    formData.append('previousStepKey', options.previousStepKey);
  }
  if (options.previousQuestion) {
    formData.append('previousQuestion', options.previousQuestion);
  }

  const response = await fetch(ASSISTANT_TURN_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let message = `Assistant API error (${response.status})`;
    try {
      const body = await response.json();
      message = body.error || body.message || message;
    } catch {
      // ignore parse errors
    }
    throw new AssistantApiError(message, response.status);
  }

  return response.json();
}
