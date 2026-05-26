import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const SESSIONS_FILE = path.join(process.cwd(), 'data', 'sessions.json');
const SESSION_MAX_AGE = 30 * 24 * 60 * 60 * 1000; 

interface SessionData {
  userId: string;
  createdAt: number;
  expiresAt: number;
}

type SessionStore = Record<string, SessionData>;

let sessionsCache: SessionStore | null = null;

function ensureDataDir(): void {
  const dir = path.dirname(SESSIONS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readSessions(): SessionStore {
  if (sessionsCache) return sessionsCache;
  ensureDataDir();
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      sessionsCache = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf-8')) as SessionStore;
    } else {
      sessionsCache = {};
      fs.writeFileSync(SESSIONS_FILE, '{}', 'utf-8');
    }
  } catch { sessionsCache = {}; }
  return sessionsCache;
}

function writeSessions(data: SessionStore): void {
  ensureDataDir();
  sessionsCache = data;
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export function createSession(userId: string): string {
  const sessions = readSessions();
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();

  sessions[token] = {
    userId,
    createdAt: now,
    expiresAt: now + SESSION_MAX_AGE,
  };

  writeSessions(sessions);
  return token;
}

export function getSession(token: string): { userId: string } | null {
  if (!token) return null;
  const sessions = readSessions();
  const session = sessions[token];

  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    delete sessions[token];
    writeSessions(sessions);
    return null;
  }

  return { userId: session.userId };
}

export function deleteSession(token: string): void {
  const sessions = readSessions();
  if (sessions[token]) {
    delete sessions[token];
    writeSessions(sessions);
  }
}

export const SESSION_COOKIE_NAME = 'pgz_session';
export const SESSION_COOKIE_MAX_AGE = SESSION_MAX_AGE / 1000; 
