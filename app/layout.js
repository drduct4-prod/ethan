import { LanguageProvider } from "./context/LanguageContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";

export const metadata = {
  title: "Ethan Duct Cleaning",
  description: "Professional air duct and vent cleaning in Montreal",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning={true} lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <Navbar />
          {children}
          <WhatsAppButton/>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}