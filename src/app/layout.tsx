import { FormProgressProvider } from "@/context/FormProgressContext";
import Header from "../../components/header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
