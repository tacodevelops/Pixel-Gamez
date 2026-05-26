import fs from 'fs';
import path from 'path';

const VOTES_FILE = path.join(process.cwd(), 'data', 'votes.json');

interface VoteData {
  likes: number;
  dislikes: number;
}

type VotesStore = Record<string, VoteData>;


let votesCache: VotesStore | null = null;

function ensureDataDir(): void {
  const dir = path.dirname(VOTES_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readVotes(): VotesStore {
  if (votesCache) return votesCache;

  ensureDataDir();

  try {
    if (fs.existsSync(VOTES_FILE)) {
      const raw = fs.readFileSync(VOTES_FILE, 'utf-8');
      votesCache = JSON.parse(raw) as VotesStore;
    } else {
      votesCache = {};
      fs.writeFileSync(VOTES_FILE, '{}', 'utf-8');
    }
  } catch {
    votesCache = {};
  }

  return votesCache;
}

function writeVotes(data: VotesStore): void {
  ensureDataDir();
  votesCache = data;
  fs.writeFileSync(VOTES_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export function getVotes(gameId: string): VoteData {
  const votes = readVotes();
  return votes[gameId] || { likes: 0, dislikes: 0 };
}

export function addVote(gameId: string, type: 'like' | 'dislike'): VoteData {
  const votes = readVotes();
  if (!votes[gameId]) {
    votes[gameId] = { likes: 0, dislikes: 0 };
  }

  if (type === 'like') {
    votes[gameId].likes = Math.max(0, votes[gameId].likes + 1);
  } else {
    votes[gameId].dislikes = Math.max(0, votes[gameId].dislikes + 1);
  }

  writeVotes(votes);
  return votes[gameId];
}

export function removeVote(gameId: string, type: 'like' | 'dislike'): VoteData {
  const votes = readVotes();
  if (!votes[gameId]) {
    votes[gameId] = { likes: 0, dislikes: 0 };
  }

  if (type === 'like') {
    votes[gameId].likes = Math.max(0, votes[gameId].likes - 1);
  } else {
    votes[gameId].dislikes = Math.max(0, votes[gameId].dislikes - 1);
  }

  writeVotes(votes);
  return votes[gameId];
}
