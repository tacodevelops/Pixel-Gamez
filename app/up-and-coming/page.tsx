import { getUpAndComingGames } from '../../lib/data';
import GameGrid from '../../components/GameGrid';

export default function UpAndComingGamesPage() {
  const games = getUpAndComingGames();

  return (
    <div className="animate-fade-in">
      <GameGrid title="Up and Coming Games" games={games} />
    </div>
  );
}
