'use client';

import { useState, useEffect } from 'react';
import { Game, getAllGames } from '../../lib/data';
import GameGrid from '../../components/GameGrid';
import { Icon } from '../../components/Icons';

export default function LikedGamesPage() {
  const [likedGames, setLikedGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const games = getAllGames();
    const liked: Game[] = [];

    games.forEach(game => {
      const vote = localStorage.getItem(`vote_${game.id}`);
      if (vote === 'like') {
        liked.push(game);
      }
    });

    setLikedGames(liked);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="animate-fade-in" style={{ padding: '2rem' }}>Loading liked games...</div>;
  }

  return (
    <div className="liked-page animate-fade-in">
      <div className="category-header">
        <span className="category-header__icon"><Icon name="heart" size={32} /></span>
        <div>
          <h1 className="category-header__title">Liked Games</h1>
          <div className="category-header__count">{likedGames.length} games you've enjoyed</div>
        </div>
      </div>

      {likedGames.length > 0 ? (
        <GameGrid title="" games={likedGames} />
      ) : (
        <div className="liked-empty">
          <div className="liked-empty__icon"><Icon name="heart" size={64} style={{ opacity: 0.5 }} /></div>
          <h2>No liked games yet</h2>
          <p>Explore the catalog and click the thumbs up button on games you enjoy to see them here.</p>
        </div>
      )}
    </div>
  );
}
