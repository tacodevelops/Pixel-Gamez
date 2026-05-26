import fs from 'fs';
import path from 'path';

const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'submissions.json');

export interface GameSubmission {
  id: string;
  title: string;
  description: string;
  category: string;
  gameType: 'html' | 'unity';
  embedUrl: string;
  thumbnail: string;
  userId: string;
  developerName: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  plays: number;
  rating: number;
  discordUrl?: string;
  steamUrl?: string;
}

let submissionsCache: GameSubmission[] | null = null;

function ensureDataDir(): void {
  const dir = path.dirname(SUBMISSIONS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readSubmissions(): GameSubmission[] {
  if (submissionsCache) return submissionsCache;
  ensureDataDir();
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      submissionsCache = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf-8')) as GameSubmission[];
    } else {
      submissionsCache = [];
      fs.writeFileSync(SUBMISSIONS_FILE, '[]', 'utf-8');
    }
  } catch { submissionsCache = []; }
  return submissionsCache;
}

function writeSubmissions(data: GameSubmission[]): void {
  ensureDataDir();
  submissionsCache = data;
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function generateId(title: string): string {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const suffix = Date.now().toString(36);
  return `community-${slug}-${suffix}`;
}

export function getAllSubmissions(): GameSubmission[] {
  return readSubmissions();
}

export function getApprovedSubmissions(): GameSubmission[] {
  return readSubmissions().filter(s => s.status === 'approved');
}

export function getPendingSubmissions(): GameSubmission[] {
  return readSubmissions().filter(s => s.status === 'pending');
}

export function getSubmissionsByUser(userId: string): GameSubmission[] {
  return readSubmissions().filter(s => s.userId === userId);
}

export function getSubmissionById(id: string): GameSubmission | undefined {
  return readSubmissions().find(s => s.id === id);
}

export function addSubmission(data: {
  title: string;
  description: string;
  category: string;
  gameType: 'html' | 'unity';
  embedUrl: string;
  thumbnail: string;
  userId: string;
  developerName: string;
  discordUrl?: string;
  steamUrl?: string;
}): GameSubmission {
  const submissions = readSubmissions();

  const submission: GameSubmission = {
    id: generateId(data.title),
    title: data.title,
    description: data.description,
    category: data.category,
    gameType: data.gameType,
    embedUrl: data.embedUrl,
    thumbnail: data.thumbnail || '',
    userId: data.userId,
    developerName: data.developerName,
    submittedAt: new Date().toISOString(),
    status: 'pending',
    plays: 0,
    rating: 0,
    discordUrl: data.discordUrl,
    steamUrl: data.steamUrl,
  };

  submissions.push(submission);
  writeSubmissions(submissions);
  return submission;
}

export function approveSubmission(id: string, adminUserId: string): GameSubmission | null {
  const submissions = readSubmissions();
  const sub = submissions.find(s => s.id === id);
  if (!sub) return null;
  sub.status = 'approved';
  sub.reviewedBy = adminUserId;
  sub.reviewedAt = new Date().toISOString();
  writeSubmissions(submissions);
  return sub;
}

export function rejectSubmission(id: string, adminUserId: string): GameSubmission | null {
  const submissions = readSubmissions();
  const sub = submissions.find(s => s.id === id);
  if (!sub) return null;
  sub.status = 'rejected';
  sub.reviewedBy = adminUserId;
  sub.reviewedAt = new Date().toISOString();
  writeSubmissions(submissions);
  return sub;
}
