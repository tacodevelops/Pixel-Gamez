import { Game } from '../lib/data';
import GameCard from './GameCard';
import Link from 'next/link';

interface GameGridProps {
  title: string;
  games: Game[];
  viewMoreLink?: string;
}

export default function GameGrid({ title, games, viewMoreLink }: GameGridProps) {
  if (games.length === 0) return null;

  return (
    <section className="game-grid-section">
      <div className="game-grid-header">
        <h2 className="game-grid-title">{title}</h2>
        {viewMoreLink && (
          <Link href={viewMoreLink} className="game-grid-view-more">
            View more
          </Link>
        )}
      </div>
      <div className="game-grid">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

    </section>
  );
}
