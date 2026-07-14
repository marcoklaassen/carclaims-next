# Voice Input Feature

## Overview

Users can fill claim forms by speaking instead of typing. A floating microphone button is available on every page except `/disclaimer`. Tapping it records audio, sends it for transcription and field extraction, and merges the result into the form state. All form pages react immediately to the updated data.

## User Interaction

1. **Tap the mic button** (bottom-right corner) to start recording.
2. The button pulses red while recording.
3. **Tap the green checkmark** to stop recording and submit.
4. **Tap the red X** to cancel and discard the recording.
5. A toast notification confirms success or shows an error.

## Files

| File | Purpose |
|---|---|
| `src/components/VoiceInputButton.tsx` | Floating mic button with recording / submit / cancel states |
| `src/components/LayoutVoiceButton.tsx` | Layout wrapper that renders the button on all pages except `/disclaimer` |
| `src/hooks/useAudioRecorder.ts` | React hook wrapping the browser MediaRecorder API |
| `src/utils/audioUpload.ts` | Audio blob validation and filename generation |
| `src/api/voiceApi.ts` | `submitVoiceAudio()` — sends audio + current state, returns extracted fields |

## Data Flow

```
Mic button  -->  MediaRecorder  -->  audio Blob
                                        |
                    submitVoiceAudio(blob, { language, currentState })
                                        |
                                POST /api/voice/extract  (multipart/form-data)
                                        |
                                { transcript, claimsData }
                                        |
                            setGlobalForm(claimsData)
                                        |
                            Zustand store merges into form state
                                        |
                            All Formik forms re-initialize via enableReinitialize
```

## State Integration

The Zustand store (`useGlobalFormStore`) is the single source of truth. `setGlobalForm` merges incoming values and automatically coerces:

- **Date strings** (`accidentDate`, `validDateGreenCard`, `otherValidDateGreenCard`) to Dayjs objects.
- **Time strings** (`accidentTime`) to Dayjs objects (bare `HH:mm:ss` or full ISO).

Every form page uses `enableReinitialize` so that values set via voice input appear immediately, even if the user is already on that page.

## Audio Format

The recorder tries these MIME types in order (browser-dependent):

1. `audio/webm;codecs=opus`
2. `audio/webm`
3. `audio/mp4`
4. `audio/ogg;codecs=opus`

Validation rejects recordings shorter than 500 ms or smaller than 1 KB.

## Browser Requirements

- HTTPS or `localhost` (MediaRecorder requires a secure context).
- User must grant microphone permission on first use.
- Modern browser with MediaRecorder support (Chrome, Firefox, Safari, Edge).

## Error Handling

| Situation | User-facing message |
|---|---|
| Browser has no MediaRecorder | Audioaufnahme nicht unterstutzt |
| Microphone permission denied | Mikrofonzugriff verweigert |
| Recording too short / empty | Aufnahme zu kurz / Aufnahme leer |
| Server error or network failure | Spracherkennung fehlgeschlagen |

Errors display as a toast (Snackbar) at the bottom-left of the screen.

## Configuration

Set `NEXT_PUBLIC_VOICE_API_URL` in `.env.local` to point at the extraction endpoint (defaults to `/api/voice/extract` which Next.js rewrites to the backend).
