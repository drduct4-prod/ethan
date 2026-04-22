import { LanguageProvider } from "./context/LanguageContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";

export const metadata = {
  metadataBase: new URL("https://www.ethanductscleaning.com"),

  title: {
    default: "Ethan Duct Cleaning Montreal | Air Duct & Vent Experts",
    template: "%s | Ethan Duct Cleaning",
  },

  description:
    "Professional air duct cleaning, dryer vent cleaning & HVAC services in Montreal. Improve air quality & reduce energy costs. Book today.",

  keywords: [
    "air duct cleaning Montreal",
    "dryer vent cleaning Montreal",
    "HVAC cleaning Montreal",
    "furnace cleaning Montreal",
    "vent cleaning services Canada",
  ],

  openGraph: {
    title: "Ethan Duct Cleaning Montreal",
    description:
      "Top-rated duct cleaning services in Montreal. Improve air quality today.",
    url: "https://www.ethanductscleaning.com",
    siteName: "Ethan Duct Cleaning",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_CA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ethan Duct Cleaning Montreal",
    description: "Professional HVAC & duct cleaning services in Montreal.",
    images: ["/icon.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
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