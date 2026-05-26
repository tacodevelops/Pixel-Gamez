'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CommunityGame {
  id: string;
  title: string;
  description: string;
  category: string;
  gameType: 'html' | 'unity';
  embedUrl: string;
  thumbnail: string;
  developerName: string;
  submittedAt: string;
  plays: number;
  rating: number;
}

export default function CommunityPage() {
  const [games, setGames] = useState<CommunityGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch('/api/developer/games');
        if (res.ok) {
          const data = await res.json();
          setGames(data);
        }
      } catch {
        
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  return (
    <div className="community-page animate-fade-in">
      <div className="community-header">
        <div className="community-header__content">
          <span className="community-header__badge">🎮 Community</span>
          <h1 className="community-header__title">Community Games</h1>
          <p className="community-header__subtitle">
            Games made by developers like you. Play, rate, and discover amazing indie creations.
          </p>
          <Link href="/developer" className="community-header__cta">
            🚀 Submit Your Game
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="community-loading">
          <div className="community-loading__spinner"></div>
          <p>Loading community games...</p>
        </div>
      ) : games.length === 0 ? (
        <div className="community-empty">
          <div className="community-empty__icon">🎯</div>
          <h2>No Community Games Yet</h2>
          <p>Be the first developer to publish a game!</p>
          <Link href="/developer" className="community-empty__cta">
            Submit a Game →
          </Link>
        </div>
      ) : (
        <div className="game-grid">
          {games.map(game => (
            <div key={game.id} className="game-card">
              <div className="game-card__image-container">
                {game.thumbnail ? (
                  <img src={game.thumbnail} alt={game.title} className="game-card__image" loading="lazy" />
                ) : (
                  <div className="community-card__placeholder">
                    <span>{game.gameType === 'unity' ? '🎮' : '🌐'}</span>
                  </div>
                )}
                <div className="game-card__badges">
                  <span className="game-card__badge" style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}>
                    community
                  </span>
                  <span className="game-card__badge" style={{ background: 'linear-gradient(135deg, #06B6D4, #0891B2)' }}>
                    {game.gameType}
                  </span>
                </div>
              </div>
              <div className="game-card__info">
                <h3 className="game-card__title">{game.title}</h3>
                <div className="game-card__meta">
                  <span className="game-card__category">{game.category}</span>
                  <span className="game-card__plays">by {game.developerName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
