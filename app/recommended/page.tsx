import { getRecommendedGames } from '../../lib/data';
import GameGrid from '../../components/GameGrid';

export default function RecommendedGamesPage() {
  const games = getRecommendedGames();

  return (
    <div className="animate-fade-in">
      <GameGrid title="Recommended Games" games={games} />
    </div>
  );
}
