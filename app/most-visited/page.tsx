import { getMostVisitedGames } from '../../lib/data';
import GameGrid from '../../components/GameGrid';

export default function MostVisitedGamesPage() {
  const games = getMostVisitedGames();

  return (
    <div className="animate-fade-in">
      <GameGrid title="Most Visited Games" games={games} />
    </div>
  );
}
