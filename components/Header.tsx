'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { searchGames, games, Game } from '../lib/data';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import { useI18n } from './I18nContext';
import LanguageSelector from './LanguageSelector';
export default function Header() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Game[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLFormElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const { loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();

  useEffect(() => {
    if (search.trim()) {
      const found = searchGames(search).slice(0, 6);
      setResults(found);
      setIsDropdownOpen(true);
    } else {
      setResults([]);
      setIsDropdownOpen(false);
    }
  }, [search]);

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch notifications');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const clearedAt = parseInt(localStorage.getItem('clearedNotifsAt') || '0');
          const validNotifs = data.filter(n => new Date(n.createdAt).getTime() > clearedAt);
          
          const uniqueMap = new Map();
          for (const n of validNotifs) {
            if (!uniqueMap.has(n.message)) uniqueMap.set(n.message, n);
          }
          const uniqueNotifs = Array.from(uniqueMap.values());
          
          setNotifications(uniqueNotifs);
          const lastRead = localStorage.getItem('lastReadNotificationAt');
          if (!lastRead) {
            setUnreadCount(uniqueNotifs.length);
          } else {
            const unread = uniqueNotifs.filter(n => new Date(n.createdAt) > new Date(lastRead)).length;
            setUnreadCount(unread);
          }
        }
      })
      .catch(console.error);

  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      setIsDropdownOpen(false);
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  const handleRandomize = () => {
    if (games.length > 0) {
      const randomGame = games[Math.floor(Math.random() * games.length)];
      router.push(`/game/${randomGame.id}`);
    }
  };

  const handleResultClick = () => { setIsDropdownOpen(false); setSearch(''); };

  const handleNotifClick = () => {
    setIsNotifOpen(!isNotifOpen);
    if (unreadCount > 0) {
      setUnreadCount(0);
      localStorage.setItem('lastReadNotificationAt', new Date().toISOString());
    }
  };

  return (
    <header className="header">
      <div className="header__left">
        <Link href="/" className="header__logo">
          <Image src="/images/logo/PixelGamezLogoNoBackround.png" alt="PixelGamez Logo" width={80} height={64} className="header__logo-icon" priority unoptimized />
        </Link>
      </div>

      <form ref={dropdownRef} className="header__search" onSubmit={handleSearch}>
        <svg className="header__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          className="header__search-input"
          placeholder={t('search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => { if (search.trim()) setIsDropdownOpen(true); }}
        />
        {search && (
          <button type="button" className="header__search-clear" onClick={() => { setSearch(''); setIsDropdownOpen(false); }}>
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        {isDropdownOpen && search.trim() && (
          <div className="search-dropdown">
            {results.length > 0 ? (
              <>
                {results.map(game => (
                  <Link key={game.id} href={`/game/${game.id}`} className="search-dropdown__item" onClick={handleResultClick}>
                    <Image src={game.thumbnail} alt={game.title} width={60} height={45} className="search-dropdown__thumb" style={{ objectFit: 'cover' }} />
                    <div className="search-dropdown__info">
                      <div className="search-dropdown__title">{game.title}</div>
                      <div className="search-dropdown__category">{game.category === 'io' ? '.io' : game.category}</div>
                    </div>
                  </Link>
                ))}
                <div className="search-dropdown__footer" onClick={() => { setIsDropdownOpen(false); router.push(`/search?q=${encodeURIComponent(search)}`); }}>
                  See all results for &quot;{search}&quot;
                </div>
              </>
            ) : (
              <div className="search-dropdown__empty">No games found for &quot;{search}&quot;</div>
            )}
          </div>
        )}
      </form>

      <div className="header__right">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginRight: '8px' }} className="header__socials">
          <a href="https://discord.gg/pyAyWAhyqM" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
          </a>
          <a href="https://www.youtube.com/@PixelGamezgg" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.94C18.88 4 12 4 12 4s-6.88 0-8.6.48A2.78 2.78 0 0 0 1.46 6.42C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.94 1.94C5.12 20 12 20 12 20s6.88 0 8.6-.48a2.78 2.78 0 0 0 1.94-1.94C23 15.86 23 12 23 12s0-3.86-.46-5.58zM9.54 15.55V8.45L15.8 12l-6.26 3.55z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@pixelgamez.gg" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.13 4.43-2.91 5.75-1.98 1.46-4.52 1.83-6.87 1.11-2.07-.63-3.79-2.22-4.51-4.25-.66-1.84-.52-3.92.42-5.63.95-1.74 2.62-2.95 4.58-3.32 1.75-.32 3.59-.14 5.25.47V15c-1.3-.4-2.73-.39-4.01.09-1.1.41-1.98 1.34-2.3 2.47-.36 1.25.01 2.66 1.05 3.48 1.05.81 2.53 1.01 3.73.54 1.15-.44 1.94-1.5 2.1-2.72.07-.56.02-1.13.02-1.69V.02h4.68z"/></svg>
          </a>
          <a href="https://x.com/PixelGamezgg" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </a>
        </div>
        <button className="header__theme-btn" onClick={handleRandomize} aria-label="Random Game" title="Play a random game">
          <img src="/images/randomiser.png" alt="Random Game" width={20} height={20} style={{ filter: theme === 'dark' ? 'invert(1)' : 'none', mixBlendMode: theme === 'dark' ? 'screen' : 'multiply' }} />
        </button>
        <LanguageSelector />
        
        <button className="header__theme-btn" onClick={toggleTheme} aria-label="Toggle theme" title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
      </div>
    </header>
  );
}
