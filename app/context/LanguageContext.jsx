"use client";

import { createContext, useContext, useState, useEffect } from "react";
import en from "../i18n/en.json";
import es from "../i18n/es.json";
import fr from "../i18n/fr.json";

const translations = { en, es, fr };

const LanguageContext = createContext({
  lang: "en",
  t: en,
  setLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    const stored = localStorage.getItem("site-lang");
    if (stored && translations[stored]) {
      setLangState(stored);
    }
  }, []);

  const setLang = (code) => {
    if (!translations[code]) return;
    setLangState(code);
    localStorage.setItem("site-lang", code);
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}