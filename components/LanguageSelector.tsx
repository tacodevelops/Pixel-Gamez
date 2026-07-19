'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from './I18nContext';
import { LanguageCode } from '../lib/translations';

export default function LanguageSelector() {
  const { language, setLanguage, supportedLanguages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const currentLang = supportedLanguages.find(l => l.code === language);

  return (
    <div className="language-selector-container">
      <button 
        className="language-selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
        title="Select Language"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="language-globe-icon">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <span className="language-label-text">{currentLang?.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="language-selector-overlay">
          <div className="language-selector-modal" ref={modalRef}>
            <div className="language-selector-modal__header">
              <h3>Select Language</h3>
              <button className="language-selector-modal__close" onClick={() => setIsOpen(false)} aria-label="Close language selector">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="language-selector-modal__grid">
              {supportedLanguages.map(lang => (
                <button
                  key={lang.code}
                  className={`language-selector-modal__item ${lang.code === language ? 'active' : ''}`}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                >
                  <span className="lang-name">{lang.name}</span>
                  <span className="lang-code">{lang.code.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
