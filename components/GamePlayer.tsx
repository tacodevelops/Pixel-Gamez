'use client';

import { useState, useEffect, useCallback } from 'react';
import { Game } from '../lib/data';
import { useAuth } from './AuthContext';
import { useI18n } from './I18nContext';
import AdSlot from './AdSlot';

interface GamePlayerProps {
  game: Game;
}

export default function GamePlayer({ game }: GamePlayerProps) {
  const { isLoggedIn, openAuthModal } = useAuth();
  const { t } = useI18n();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  const fetchVotes = useCallback(async () => {
    try {
      const res = await fetch(`/api/votes/${game.id}`);
      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
        setDislikes(data.dislikes);
      }
    } catch {
      
    }
  }, [game.id]);

  useEffect(() => {
    fetchVotes();
    const storedVote = localStorage.getItem(`vote_${game.id}`);
    if (storedVote) setUserVote(storedVote as 'like' | 'dislike');
  }, [game.id, fetchVotes]);

  const handleVote = async (type: 'like' | 'dislike') => {
    if (!isLoggedIn) {
      openAuthModal();
      return;
    }
    if (isVoting) return;
    setIsVoting(true);

    try {
      if (userVote === type) {
        const res = await fetch(`/api/votes/${game.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, action: 'remove' }),
        });
        if (res.ok) {
          const data = await res.json();
          setLikes(data.likes);
          setDislikes(data.dislikes);
          setUserVote(null);
          localStorage.removeItem(`vote_${game.id}`);
        }
      } else {
        if (userVote) {
          await fetch(`/api/votes/${game.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: userVote, action: 'remove' }),
          });
        }
        const res = await fetch(`/api/votes/${game.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, action: 'add' }),
        });
        if (res.ok) {
          const data = await res.json();
          setLikes(data.likes);
          setDislikes(data.dislikes);
          setUserVote(type);
          localStorage.setItem(`vote_${game.id}`, type);
        }
      }
    } catch {
      
    } finally {
      setIsVoting(false);
    }
  };

  const handleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe) {
      if (iframe.requestFullscreen) iframe.requestFullscreen();
      
      else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
      
      else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
    }
  };

  return (
    <div className="game-player animate-scale-in">
      <div className="game-player__embed-wrapper">
        <iframe
          id="game-iframe"
          className="game-player__iframe"
          src={game.embedUrl}
          frameBorder="0"
          scrolling="no"
          allowFullScreen
        ></iframe>
      </div>

      <div className="game-player__controls">
        <div className="game-player__info">
          <h1 className="game-player__title">{game.title}</h1>
          <div className="game-player__tags">
            {game.tags.map(tag => (
              <span key={tag} className={`game-player__tag game-player__tag--${tag}`}>{t(tag) || tag}</span>
            ))}
          </div>
        </div>

        <div className="game-player__actions">
          <div className="game-player__votes">
            <button
              className={`game-player__btn game-player__btn--vote ${userVote === 'like' ? 'active' : ''}`}
              onClick={() => handleVote('like')}
              disabled={isVoting}
              title={!isLoggedIn ? 'Sign in to vote' : undefined}
            >
              <span className="icon">👍</span> {likes}
            </button>
            <button
              className={`game-player__btn game-player__btn--vote ${userVote === 'dislike' ? 'active' : ''}`}
              onClick={() => handleVote('dislike')}
              disabled={isVoting}
              title={!isLoggedIn ? 'Sign in to vote' : undefined}
            >
              <span className="icon">👎</span> {dislikes}
            </button>
          </div>
          <button className="game-player__btn game-player__btn--fullscreen" onClick={handleFullscreen}>
            <span className="icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
            </span> {t('fullscreen') || 'Fullscreen'}
          </button>
        </div>
      </div>

      <div className="game-player__description-card">
        <h3>{t('about') || 'About'} {game.title}</h3>
        <p>{game.description}</p>
        
        {(game.discordUrl || game.steamUrl) && (
          <div className="game-player__links" style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            {game.discordUrl && (
              <a href={game.discordUrl} target="_blank" rel="noopener noreferrer" className="game-player__btn" style={{ textDecoration: 'none' }}>
                <span className="icon">💬</span> Discord
              </a>
            )}
            {game.steamUrl && (
              <a href={game.steamUrl} target="_blank" rel="noopener noreferrer" className="game-player__btn" style={{ textDecoration: 'none' }}>
                <span className="icon">🎮</span> Steam
              </a>
            )}
          </div>
        )}
      </div>
      
      <AdSlot placement="game-below" />
    </div>
  );
}
