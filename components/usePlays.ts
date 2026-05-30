import { useState, useEffect } from 'react';

let cachedPlays: Record<string, number> | null = null;
let fetchPromise: Promise<Record<string, number>> | null = null;

export function usePlays(gameId: string, initialPlays: number) {
  const [plays, setPlays] = useState(initialPlays);

  useEffect(() => {
    if (cachedPlays) {
      setPlays(cachedPlays[gameId] ?? initialPlays);
      return;
    }
    
    if (!fetchPromise) {
      fetchPromise = fetch('/api/games/plays')
        .then(res => res.json())
        .then(data => {
          cachedPlays = data;
          return data;
        })
        .catch(() => {
          return {};
        });
    }

    fetchPromise.then(data => {
      setPlays(data[gameId] ?? initialPlays);
    });
  }, [gameId, initialPlays]);

  return plays;
}
