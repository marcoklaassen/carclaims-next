'use client';

import { usePathname } from 'next/navigation';
import { useGlobalFormStore } from '@/types/state';
import { VoiceInputButton } from './VoiceInputButton';

export default function LayoutVoiceButton() {
  const pathname = usePathname();
  const language = useGlobalFormStore((s) => s.form.language);

  if (pathname === '/disclaimer') return null;

  return <VoiceInputButton language={language} />;
}
