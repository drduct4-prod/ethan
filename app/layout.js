import { LanguageProvider } from "./context/LanguageContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

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
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}