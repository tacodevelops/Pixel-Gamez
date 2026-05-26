import { getPopularGames } from '../../lib/data';
import GameGrid from '../../components/GameGrid';

export default function PopularGamesPage() {
  const games = getPopularGames();

  return (
    <div className="popular-games-page animate-fade-in">
      <GameGrid title="Popular Games" games={games} />
    </div>
  );
}
