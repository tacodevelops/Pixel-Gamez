import { getTrendingGames } from '../../lib/data';
import GameGrid from '../../components/GameGrid';

export default function TrendingGamesPage() {
  const games = getTrendingGames();

  return (
    <div className="animate-fade-in">
      <GameGrid title="Top Trending Games" games={games} />
    </div>
  );
}
