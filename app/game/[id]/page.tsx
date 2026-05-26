import { getGameById, getRelatedGames } from '../../../lib/data';
import GamePlayer from '../../../components/GamePlayer';
import GameGrid from '../../../components/GameGrid';
import { notFound } from 'next/navigation';

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = getGameById(id);

  if (!game) {
    notFound();
  }

  const relatedGames = getRelatedGames(game.id, 6);

  return (
    <div className="game-page animate-fade-in">
      <GamePlayer game={game} />

      {relatedGames.length > 0 && (
        <GameGrid title="Similar Games" games={relatedGames} />
      )}
    </div>
  );
}
