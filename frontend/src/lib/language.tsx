// src/lib/language.tsx
/**
 * Language context and hooks for ADUmedia website
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  Language,
  getLanguagePreference,
  setLanguagePreference,
  DEFAULT_LANGUAGE,
} from "./cookies";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  // Load language preference on mount
  useEffect(() => {
    const savedLanguage = getLanguagePreference();
    console.log(`[Language] Initial language loaded: ${savedLanguage}`);
    setLanguageState(savedLanguage);
  }, []);

  // Update language and save to cookie
  const setLanguage = (lang: Language) => {
    console.log(`[Language] Changing language from ${language} to ${lang}`);
    setLanguageState(lang);
    setLanguagePreference(lang);
    console.log(`[Language] Language changed successfully`);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

/**
 * Helper to get translated content from article
 */
export function getTranslatedContent(
  original: string,
  translations: Record<string, string> | undefined,
  language: Language
): string {
  // If English, return original
  if (language === "en") {
    return original;
  }

  // Try to get translation
  if (translations && translations[language]) {
    return translations[language];
  }

  // Fallback to original if translation not available
  return original;
}