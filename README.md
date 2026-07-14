# FRIDA Carclaims-Next

Link to Live Website: [https://carclaims.freeinsurancedata.com](https://carclaims.freeinsurancedata.com/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb2xpY3lOdW1iZXIiOiJWLTEyMy00NTYtNzg5LTAiLCJmb3JtT2ZBZGRyZXNzIjoiSGVyciIsInRpdGxlIjoiUHJvZi4iLCJsYXN0TmFtZSI6Ik11c3Rlcm1hbm4iLCJmaXJzdE5hbWUiOiJGcmlkYSIsInBvc3RhbENvZGUiOiIxMjM0NSIsImNpdHkiOiJCZXJsaW4iLCJzdHJlZXROYW1lIjoiVGVzdHN0cmHDn2UiLCJob3VzZU51bWJlciI6IjM0NSIsInRlbGVwaG9uZSI6Iis0OSAwMSAyMzQ1Njc4OSIsImVtYWlsQWRkcmVzcyI6ImZyaWRhLm11c3Rlcm1hbm5AZXhhbXBsZS5jb20iLCJpbnN1cmFuY2VDb21wYW55IjoiSERJIiwiY2hhc3Npc051bWJlciI6IldWV1paWjFKWjNXMzg2NzUyIiwibGljZW5zZVBsYXRlIjoiTS1BQiAxMjMiLCJjYXJCcmFuZCI6IlZvbGtzd2FnZW4iLCJjYXJNb2RlbCI6IkdvbGYiLCJpYXQiOjE3NjA5NjM3NzV9.9hNc8zmaowJ3zrX9zECzjC2BMGj7cYw8xtCD2FBZ58o)

## Name

FRIDA Carclaims Frontend - Schadenmeldeplattform

## Description

The FRIDA **Carclaims-Next** is a web application designed to streamline the process of reporting car insurance claims. This platform allows users to easily submit details about car accidents, including personal information, vehicle damage, and witness statements. The application ensures that all necessary information is collected accurately and efficiently, reducing the time and effort required to file a claim. With a user-friendly interface and seamless integration with backend services, the **Carclaims-Next** application provides a comprehensive solution for managing car insurance claims.

### ✨ Key Features

- 📱 **Mobile-First Design** - Optimized for smartphones and tablets
- 🎤 **Voice Input** - Fill forms by speaking (speech-to-text with AI extraction)
- 🎫 **Wallet Integration** - Auto-fill from digital insurance cards
- 🚗 **Interactive Car Diagram** - Visual damage location selection
- 🌍 **Multi-Language** - German and English support
- 📸 **Photo Upload** - Document damage with images

Additionally, some data will be extracted onto the platform from the wallet pass when the website gets called, further simplifying the data entry process for users.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend service running (optional for voice features)

### Installation

```bash
# Install dependencies
npm install

# Copy environment template (optional)
cp .env.local.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Voice Feature Setup

To enable speech-to-text voice input:

1. **Start the backend** (see [frida-carclaims-voice-backend](https://github.com/your-org/frida-carclaims-voice-backend))
2. **Configure backend URL** in `.env.local`:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
   ```
3. **Grant microphone permission** in your browser
4. **Click the microphone button** (bottom-right) on any form page

See [VOICE_FEATURE.md](./VOICE_FEATURE.md) for detailed documentation.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: Material-UI v7 + Tailwind CSS
- **Forms**: Formik + Yup validation
- **State**: Zustand
- **Language**: TypeScript 5
- **Voice**: WebRTC MediaRecorder + OpenAI-compatible API

