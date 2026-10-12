import { FormProgressProvider } from '@/context/FormProgressContext';
import Header from '../components/header';
import LayoutVoiceButton from '../components/LayoutVoiceButton';
import BrandStyle from '../components/BrandStyle';
import './globals.css';
import { Metadata } from 'next';
import { Roboto, Red_Hat_Text } from 'next/font/google';
import ThemeProvider from '../components/ThemeProvider';

const favicon = process.env.NEXT_PUBLIC_FAVICON || '/frida.ico';

export const metadata: Metadata = {
  title: 'CarClaims - Schadensmeldung',
  description: 'Digitale Schadensmeldung für Kfz-Versicherungen',
  icons: { icon: favicon },
};

const roboto = Roboto({ subsets: ['latin'] });
const redHatText = Red_Hat_Text({ subsets: ['latin'], weight: ['300', '400', '500', '700'] });

const fontClass = process.env.BRAND_FONT === 'red-hat-text' ? redHatText.className : roboto.className;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClass}>
      <body>
        {/* BrandStyle uses React 19 <style precedence> — hoisted to <head> automatically */}
        <BrandStyle />
        <ThemeProvider>
          <FormProgressProvider>
            <Header />
            <main className="insurance-form-container">{children}</main>
            <LayoutVoiceButton />
          </FormProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
