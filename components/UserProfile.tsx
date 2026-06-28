'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import BioText from './BioText';
import AdSlot from './AdSlot';
import { useAuth } from './AuthContext';
import { useI18n } from './I18nContext';
import GameGrid from './GameGrid';
import Image from 'next/image';
import { games as allGames } from '../lib/data';
import GameCarousel from './GameCarousel';

interface ProfileUser {
  id: string;
  email: string;
  displayName: string;
  role: string;
  avatarUrl: string;
  createdAt: string;
  aboutMe: string;
  workingOn: string;
  country: string;
  favoriteGames: string[];
  recentGames: string[];
  bannerUrl?: string;
  followersCount?: number;
  followingCount?: number;
}

interface Submission {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  status: string;
  submittedAt: string;
  plays: number;
  rating: number;
  developerName: string;
}

interface UserProfileProps {
  profileUser: ProfileUser;
  submissions: Submission[];
}

export default function UserProfile({ profileUser, submissions }: UserProfileProps) {
  const { user, updateBio, updateDisplayName, uploadAvatar, openAuthModal } = useAuth();
  const { t } = useI18n();
  const isOwnProfile = user?.id === profileUser.id;

  const [displayUser, setDisplayUser] = useState<ProfileUser>(profileUser);
  const [editingAbout, setEditingAbout] = useState(false);
  const [editingWorking, setEditingWorking] = useState(false);
  const [aboutText, setAboutText] = useState(displayUser.aboutMe || '');
  const [workingText, setWorkingText] = useState(displayUser.workingOn || '');
  const [saving, setSaving] = useState(false);
  const [showBannerOptions, setShowBannerOptions] = useState(false);
  
  const [editingDisplayName, setEditingDisplayName] = useState(false);
  const [displayNameText, setDisplayNameText] = useState(displayUser.displayName || '');

  const [color1, setColor1] = useState('#ec4899');
  const [color2, setColor2] = useState('#8b5cf6');


  const joinDate = new Date(displayUser.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  const daysSinceJoin = Math.floor((Date.now() - new Date(displayUser.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  const memberLabel = daysSinceJoin < 1 ? 'Joined today' : daysSinceJoin === 1 ? 'Joined yesterday' : `Joined ${joinDate}`;

  const handleSaveAbout = async () => {
    setSaving(true);
    const { error } = await updateBio({ aboutMe: aboutText, workingOn: workingText });
    setSaving(false);
    if (!error) {
      setEditingAbout(false);
      setEditingWorking(false);
    }
  };

  const handleSaveDisplayName = async () => {
    if (!displayNameText.trim() || displayNameText.trim().length < 3) return;
    setSaving(true);
    const { error } = await updateDisplayName(displayNameText);
    setSaving(false);
    if (!error) {
      setEditingDisplayName(false);
      setDisplayUser(prev => ({ ...prev, displayName: displayNameText }));
    }
  };

  const handleBannerColorChange = async (color: string) => {
    try {
      const res = await fetch('/api/auth/banner-color', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color })
      });
      if (res.ok) window.location.reload();
    } catch {}
    setShowBannerOptions(false);
  };



  const presetGradients = [
    'linear-gradient(to right, #ec4899, #8b5cf6)',
    'linear-gradient(to right, #3b82f6, #2dd4bf)',
    'linear-gradient(to right, #f59e0b, #ef4444)',
    'linear-gradient(to right, #10b981, #3b82f6)',
    'linear-gradient(to right, #6366f1, #d946ef)',
    '#1e293b', 
  ];

  return (
    <div className="profile-page">
      <div 
        className={`profile-banner ${displayUser.bannerUrl ? 'has-custom-banner' : ''}`}
        style={displayUser.bannerUrl ? { background: displayUser.bannerUrl.startsWith('/') || displayUser.bannerUrl.startsWith('http') ? `url(${displayUser.bannerUrl}) center/cover no-repeat` : displayUser.bannerUrl } : {}}
      >
        {!displayUser.bannerUrl && <div className="profile-banner__gradient" />}
        {isOwnProfile && (
          <div className="profile-banner__edit-container">
            <button className="profile-banner__edit-btn" onClick={() => setShowBannerOptions(!showBannerOptions)}>Edit Banner</button>
            {showBannerOptions && (
              <div className="profile-banner__options-menu" style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border)', marginTop: '8px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input type="color" value={color1} onChange={e => setColor1(e.target.value)} style={{ width: '40px', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                  <input type="color" value={color2} onChange={e => setColor2(e.target.value)} style={{ width: '40px', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                  <button className="profile-banner__menu-btn" style={{ background: 'var(--accent-gradient)', color: 'white', fontWeight: 'bold', border: 'none' }} onClick={() => handleBannerColorChange(`linear-gradient(to right, ${color1}, ${color2})`)}>Save Gradient</button>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="profile-banner__content">
          <div className="profile-avatar-wrapper" style={{ cursor: 'default' }}>
            <div className="profile-avatar__placeholder" style={{ background: 'var(--accent-primary)', fontSize: '4rem' }}>
              {displayUser.displayName.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="profile-banner__info">
            <div className="profile-banner__name-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {editingDisplayName ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={displayNameText}
                    onChange={e => setDisplayNameText(e.target.value)}
                    style={{ background: 'var(--surface-dark)', border: '1px solid var(--border)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '1.2rem', fontWeight: 'bold' }}
                    autoFocus
                  />
                  <button onClick={handleSaveDisplayName} disabled={saving} style={{ background: 'var(--primary)', border: 'none', color: 'white', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>{saving ? '...' : 'Save'}</button>
                  <button onClick={() => setEditingDisplayName(false)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'white', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                </div>
              ) : (
                <>
                  <h1 className="profile-banner__name">{displayUser.displayName}</h1>
                  {isOwnProfile && (
                    <button onClick={() => setEditingDisplayName(true)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '4px' }} title="Edit Display Name">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    </button>
                  )}
                </>
              )}
              {displayUser.role === 'owner' && (
                <span className="profile-banner__badge">Owner</span>
              )}
              {displayUser.role === 'moderator' && (
                <span className="profile-banner__badge">Moderator</span>
              )}
            </div>
            <div className="profile-banner__meta">
              <span className="profile-banner__meta-item">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {memberLabel}
              </span>
              {displayUser.country && (
                <span className="profile-banner__meta-item">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  {displayUser.country}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="profile-body">

        <div className="profile-col profile-col--left">
          <div className="profile-card">
            <div className="profile-card__header">
              <h3 className="profile-card__title">{t('about_me')}</h3>
              {isOwnProfile && !editingAbout && (
                <button className="profile-card__edit-btn" onClick={() => { setEditingAbout(true); setAboutText(displayUser.aboutMe || ''); }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
              )}
            </div>
            {editingAbout ? (
              <div className="profile-card__edit-area">
                <textarea
                  className="profile-card__textarea"
                  value={aboutText}
                  onChange={e => setAboutText(e.target.value)}
                  maxLength={500}
                  placeholder="Tell others about yourself..."
                  rows={4}
                  autoFocus
                />
                <div className="profile-card__edit-actions">
                  <span className="profile-card__char-count">{aboutText.length}/500</span>
                  <button className="profile-card__cancel-btn" onClick={() => setEditingAbout(false)}>Cancel</button>
                  <button className="profile-card__save-btn" onClick={handleSaveAbout} disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            ) : (
              <p className="profile-card__text">
                {displayUser.aboutMe ? <BioText text={displayUser.aboutMe} /> : (isOwnProfile ? 'Click edit to tell others about yourself.' : 'This user hasn\'t written anything yet.')}
              </p>
            )}
          </div>

          <div className="profile-card">
            <div className="profile-card__header">
              <h3 className="profile-card__title">{t('working_on')}</h3>
              {isOwnProfile && !editingWorking && (
                <button className="profile-card__edit-btn" onClick={() => { setEditingWorking(true); setWorkingText(displayUser.workingOn || ''); }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
              )}
            </div>
            {editingWorking ? (
              <div className="profile-card__edit-area">
                <textarea
                  className="profile-card__textarea"
                  value={workingText}
                  onChange={e => setWorkingText(e.target.value)}
                  maxLength={500}
                  placeholder="Describe what you're working on..."
                  rows={4}
                  autoFocus
                />
                <div className="profile-card__edit-actions">
                  <span className="profile-card__char-count">{workingText.length}/500</span>
                  <button className="profile-card__cancel-btn" onClick={() => setEditingWorking(false)}>Cancel</button>
                  <button className="profile-card__save-btn" onClick={handleSaveAbout} disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            ) : (
              <p className="profile-card__text">
                {displayUser.workingOn ? <BioText text={displayUser.workingOn} /> : (isOwnProfile ? 'Describe what you\'re working on.' : 'Nothing shared yet.')}
              </p>
            )}
          </div>


        </div>


      </div>

      <div style={{ marginTop: 'var(--space-6)' }}>
        <AdSlot placement="profile" />
      </div>
    </div>
  );
}
