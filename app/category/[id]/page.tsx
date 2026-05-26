import { getCategoryById, getGamesByCategory } from '../../../lib/data';
import GameGrid from '../../../components/GameGrid';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = getCategoryById(id);

  if (!category) {
    notFound();
  }

  const games = getGamesByCategory(category.id);

  return (
    <div className="category-page animate-fade-in">
      <GameGrid title={`${category.name} Games`} games={games} />
    </div>
  );
}
