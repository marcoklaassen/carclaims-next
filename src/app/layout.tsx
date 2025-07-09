import { FormProgressProvider } from '@/context/FormProgressContext';
import Header from '../../components/header';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CarClaims - Schadensmeldung',
  description: 'Digitale Schadensmeldung für Kfz-Versicherungen',
  icons: {
    icon: '/frida.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FormProgressProvider>
          <Header />
          <main className="insurance-form-container">{children}</main>
        </FormProgressProvider>
      </body>
    </html>
  );
}
