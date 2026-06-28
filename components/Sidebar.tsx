'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories, getGameCountByCategory, games } from '../lib/data';
import { Icon, IconName } from './Icons';
import { useAuth } from './AuthContext';
import { useI18n } from './I18nContext';
import AdSlot from './AdSlot';

export default function Sidebar() {
  const pathname = usePathname();
  const { isOwner, isModerator, user } = useAuth();
  const { t } = useI18n();

  return (
    <nav className="sidebar">
      <Link href="/" className={`sidebar__link ${pathname === '/' ? 'active' : ''}`}>
        <span className="sidebar__icon"><Icon name="home" /></span>
        <span className="sidebar__label">{t('home')}</span>
      </Link>
      <Link href="/trending" className={`sidebar__link ${pathname === '/trending' ? 'active' : ''}`}>
        <span className="sidebar__icon"><Icon name="trending" /></span>
        <span className="sidebar__label">{t('trending')}</span>
      </Link>
      <Link href="/new" className={`sidebar__link ${pathname === '/new' ? 'active' : ''}`}>
        <span className="sidebar__icon"><Icon name="new" /></span>
        <span className="sidebar__label">{t('new')}</span>
      </Link>
      <Link href="/popular" className={`sidebar__link ${pathname === '/popular' ? 'active' : ''}`}>
        <span className="sidebar__icon"><Icon name="fire" /></span>
        <span className="sidebar__label">{t('popular')}</span>
      </Link>
      <Link href="/up-and-coming" className={`sidebar__link ${pathname === '/up-and-coming' ? 'active' : ''}`}>
        <span className="sidebar__icon"><Icon name="rocket" /></span>
        <span className="sidebar__label">{t('up_and_coming')}</span>
      </Link>
      <Link href="/most-visited" className={`sidebar__link ${pathname === '/most-visited' ? 'active' : ''}`}>
        <span className="sidebar__icon"><Icon name="eye" /></span>
        <span className="sidebar__label">{t('most_visited')}</span>
      </Link>
      <Link href="/recommended" className={`sidebar__link ${pathname === '/recommended' ? 'active' : ''}`}>
        <span className="sidebar__icon"><Icon name="star" /></span>
        <span className="sidebar__label">{t('recommended')}</span>
      </Link>


      {categories.map((category) => (
        <React.Fragment key={category.id}>
          <Link
            href={`/category/${category.id}`}
            className={`sidebar__link ${pathname === `/category/${category.id}` ? 'active' : ''}`}
          >
            <span className="sidebar__icon"><Icon name={category.icon as IconName} /></span>
            <span className="sidebar__label">{t(category.id) || category.name}</span>
            <span className="sidebar__count">{getGameCountByCategory(category.id)}</span>
          </Link>
        </React.Fragment>
      ))}

      <div className="sidebar__divider"></div>

      <div style={{ padding: '16px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.94C18.88 4 12 4 12 4s-6.88 0-8.6.48A2.78 2.78 0 0 0 1.46 6.42C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.94 1.94C5.12 20 12 20 12 20s6.88 0 8.6-.48a2.78 2.78 0 0 0 1.94-1.94C23 15.86 23 12 23 12s0-3.86-.46-5.58zM9.54 15.55V8.45L15.8 12l-6.26 3.55z"/></svg>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.13 4.43-2.91 5.75-1.98 1.46-4.52 1.83-6.87 1.11-2.07-.63-3.79-2.22-4.51-4.25-.66-1.84-.52-3.92.42-5.63.95-1.74 2.62-2.95 4.58-3.32 1.75-.32 3.59-.14 5.25.47V15c-1.3-.4-2.73-.39-4.01.09-1.1.41-1.98 1.34-2.3 2.47-.36 1.25.01 2.66 1.05 3.48 1.05.81 2.53 1.01 3.73.54 1.15-.44 1.94-1.5 2.1-2.72.07-.56.02-1.13.02-1.69V.02h4.68z"/></svg>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
        </a>
      </div>
      <Link href="/developer" className={`sidebar__link ${pathname === '/developer' ? 'active' : ''}`}>
        <span className="sidebar__icon"><Icon name="code" /></span>
        <span className="sidebar__label">{t('developer')}</span>
      </Link>
      <Link href="/brand-integration" className={`sidebar__link ${pathname === '/brand-integration' ? 'active' : ''}`}>
        <span className="sidebar__icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </span>
        <span className="sidebar__label">Brand Integration</span>
      </Link>
      {isOwner || isModerator ? (
        <Link href="/admin" className={`sidebar__link ${pathname === '/admin' ? 'active' : ''}`}>
          <span className="sidebar__icon"><Icon name="star" /></span>
          <span className="sidebar__label">{isOwner ? t('owner_panel') : t('moderator_panel')}</span>
        </Link>
      ) : null}
      
      <div className="sidebar__divider"></div>
      <AdSlot placement="sidebar" />
    </nav>
  );
}
