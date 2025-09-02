import { FormProgressProvider } from '@/context/FormProgressContext';
import Header from '../../components/header';
import './globals.css';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google'

export const metadata: Metadata = {
  title: 'CarClaims - Schadensmeldung',
  description: 'Digitale Schadensmeldung für Kfz-Versicherungen',
  icons: {
    icon: '/frida.ico',
  },
};
const roboto = Roboto({subsets: ['latin']});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <FormProgressProvider>
          <Header />
          <main className="insurance-form-container">{children}</main>
        </FormProgressProvider>
      </body>
    </html>
  );
}
