import { getNewGames } from '../../lib/data';
import GameGrid from '../../components/GameGrid';

export default function NewGamesPage() {
  const games = getNewGames();

  return (
    <div className="new-games-page animate-fade-in">
      <GameGrid title="New Games" games={games} />
    </div>
  );
}
