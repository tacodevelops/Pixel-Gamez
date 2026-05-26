'use client';

import React from 'react';
import { useI18n } from './I18nContext';
import { LanguageCode } from '../lib/translations';

export default function LanguageSelector() {
  const { language, setLanguage, supportedLanguages } = useI18n();

  return (
    <div className="language-selector">
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value as LanguageCode)}
        className="language-select"
        aria-label="Select Language"
      >
        {supportedLanguages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
