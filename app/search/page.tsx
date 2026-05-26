'use client';

import { useSearchParams } from 'next/navigation';
import { searchGames } from '../../lib/data';
import GameGrid from '../../components/GameGrid';
import { Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const games = searchGames(query);

  return (
    <div className="search-page animate-fade-in">
      {games.length > 0 ? (
        <GameGrid title={`Search results for "${query}"`} games={games} />
      ) : (
        <div className="search-empty">
          <h2>No results found for &quot;{query}&quot;</h2>
          <p>Try searching for a different game or category.</p>
        </div>
      )}

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading search...</div>}>
      <SearchResults />
    </Suspense>
  );
}
