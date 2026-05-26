'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode, translations, LANGUAGES } from '../lib/translations';

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  supportedLanguages: typeof LANGUAGES;
}

const I18nContext = createContext<I18nContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  supportedLanguages: LANGUAGES,
});

export const useI18n = () => useContext(I18nContext);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('pixelgamez_lang') as LanguageCode;
    if (stored && translations[stored]) {
      setLanguageState(stored);
    } else {
      const browserLang = navigator.language.split('-')[0] as LanguageCode;
      if (translations[browserLang]) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('pixelgamez_lang', lang);
  };

  const t = (key: string): string => {
    if (!mounted) return translations['en'][key] || key; 
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, supportedLanguages: LANGUAGES }}>
      <div key={language} style={{ display: 'contents' }}>
         {children}
      </div>
    </I18nContext.Provider>
  );
}
