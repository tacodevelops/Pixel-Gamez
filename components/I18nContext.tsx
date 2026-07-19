'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode, translations, LANGUAGES } from '../lib/translations';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const segments = pathname.split('/');
    const firstSegment = segments[1];
    const pathLocale = LANGUAGES.find(lang => lang.code === firstSegment)?.code;

    if (pathLocale) {
      setLanguageState(pathLocale);
    } else {
      const stored = localStorage.getItem('pixelgamez_lang') as LanguageCode;
      if (stored && translations[stored]) {
        setLanguageState(stored);
      } else {
        const browserLang = navigator.language.split('-')[0] as LanguageCode;
        if (translations[browserLang]) {
          setLanguageState(browserLang);
        }
      }
    }
  }, [pathname]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('pixelgamez_lang', lang);

    const currentPath = window.location.pathname;
    const segments = currentPath.split('/');
    const firstSegment = segments[1];
    const isCurrentLocale = LANGUAGES.some(l => l.code === firstSegment);

    let newPath = currentPath;
    if (isCurrentLocale) {
      if (lang === 'en') {
        newPath = '/' + segments.slice(2).join('/');
      } else {
        segments[1] = lang;
        newPath = segments.join('/');
      }
    } else {
      if (lang !== 'en') {
        newPath = `/${lang}${currentPath}`;
      }
    }

    if (newPath === '') newPath = '/';
    window.location.href = newPath;
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
