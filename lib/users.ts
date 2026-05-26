import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');


const OWNER_EMAILS: string[] = [
  'dahiruhammajam@gmail.com',
];

const MODERATOR_EMAILS: string[] = [
  
];

export interface User {
  id: string;
  email: string;
  displayName: string;
  passwordHash: string;
  role: 'user' | 'moderator' | 'owner';
  avatarUrl: string;
  bannerUrl: string;
  createdAt: string;
  aboutMe: string;
  workingOn: string;
  country: string;
  favoriteGames: string[];
}

export type PublicUser = Omit<User, 'passwordHash'>;

let usersCache: User[] | null = null;

function ensureDataDir(): void {
  const dir = path.dirname(USERS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function migrateUser(u: Partial<User> & { id: string }): User {
  return {
    ...u,
    aboutMe: u.aboutMe ?? '',
    workingOn: u.workingOn ?? '',
    country: u.country ?? '',
    favoriteGames: u.favoriteGames ?? [],
    bannerUrl: u.bannerUrl ?? '',
  } as User;
}

function readUsers(): User[] {
  if (usersCache) return usersCache;
  ensureDataDir();
  try {
    if (fs.existsSync(USERS_FILE)) {
      const raw = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as Partial<User>[];
      usersCache = raw.map(u => migrateUser(u as Partial<User> & { id: string }));
    } else {
      usersCache = [];
      fs.writeFileSync(USERS_FILE, '[]', 'utf-8');
    }
  } catch { usersCache = []; }
  return usersCache;
}

function writeUsers(data: User[]): void {
  ensureDataDir();
  usersCache = data;
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function isOwnerEmail(email: string): boolean {
  return OWNER_EMAILS.includes(email.toLowerCase().trim());
}

function isModeratorEmail(email: string): boolean {
  return MODERATOR_EMAILS.includes(email.toLowerCase().trim());
}

function toPublic(user: User): PublicUser {
  const { passwordHash: _, ...pub } = user;
  return pub;
}

export function registerUser(email: string, password: string, displayName: string): { user?: PublicUser; error?: string } {
  const users = readUsers();
  const normalizedEmail = email.toLowerCase().trim();

  if (!normalizedEmail || !password || !displayName.trim()) {
    return { error: 'All fields are required.' };
  }
  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters.' };
  }
  if (users.find(u => u.email === normalizedEmail)) {
    return { error: 'An account with this email already exists.' };
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const user: User = {
    id: crypto.randomBytes(16).toString('hex'),
    email: normalizedEmail,
    displayName: displayName.trim(),
    passwordHash,
    role: isOwnerEmail(normalizedEmail) ? 'owner' : isModeratorEmail(normalizedEmail) ? 'moderator' : 'user',
    avatarUrl: '',
    bannerUrl: '',
    createdAt: new Date().toISOString(),
    aboutMe: '',
    workingOn: '',
    country: '',
    favoriteGames: [],
  };

  users.push(user);
  writeUsers(users);
  return { user: toPublic(user) };
}

export function loginUser(email: string, password: string): { user?: PublicUser; error?: string } {
  const users = readUsers();
  const normalizedEmail = email.toLowerCase().trim();
  const user = users.find(u => u.email === normalizedEmail);

  if (!user) {
    return { error: 'Invalid email or password.' };
  }
  if (!bcrypt.compareSync(password, user.passwordHash)) {
    return { error: 'Invalid email or password.' };
  }

  // Sync roles from whitelist on every login
  const shouldBeOwner = isOwnerEmail(normalizedEmail);
  const shouldBeModerator = isModeratorEmail(normalizedEmail);
  
  if (shouldBeOwner && user.role !== 'owner') {
    user.role = 'owner';
    writeUsers(users);
  } else if (!shouldBeOwner && shouldBeModerator && user.role !== 'moderator') {
    user.role = 'moderator';
    writeUsers(users);
  } else if (!shouldBeOwner && !shouldBeModerator && user.role !== 'user') {
    user.role = 'user';
    writeUsers(users);
  }

  return { user: toPublic(user) };
}

export function getUserById(id: string): PublicUser | undefined {
  const users = readUsers();
  const user = users.find(u => u.id === id);
  if (!user) return undefined;

  const normalizedEmail = user.email.toLowerCase().trim();
  const shouldBeOwner = isOwnerEmail(normalizedEmail);
  const shouldBeModerator = isModeratorEmail(normalizedEmail);
  
  let roleChanged = false;
  if (shouldBeOwner && user.role !== 'owner') {
    user.role = 'owner';
    roleChanged = true;
  } else if (shouldBeModerator && !shouldBeOwner && user.role !== 'moderator') {
    user.role = 'moderator';
    roleChanged = true;
  } else if (!shouldBeOwner && !shouldBeModerator && user.role !== 'user') {
    user.role = 'user';
    roleChanged = true;
  }

  if (roleChanged) {
    writeUsers(users);
  }

  return toPublic(user);
}

export function getAllPublicUsers(): PublicUser[] {
  return readUsers().map(toPublic);
}

export function getUserByDisplayName(name: string): PublicUser | undefined {
  const lower = name.toLowerCase().trim();
  const user = readUsers().find(u => u.displayName.toLowerCase() === lower);
  return user ? toPublic(user) : undefined;
}

export function isAdmin(userId: string): boolean {
  const user = readUsers().find(u => u.id === userId);
  if (!user) return false;
  
  return isOwnerEmail(user.email) || isModeratorEmail(user.email);
}

export function isOwner(userId: string): boolean {
  const user = readUsers().find(u => u.id === userId);
  if (!user) return false;
  return isOwnerEmail(user.email);
}

export function isModerator(userId: string): boolean {
  const user = readUsers().find(u => u.id === userId);
  if (!user) return false;
  return isModeratorEmail(user.email);
}

export function updateUserAvatar(userId: string, avatarUrl: string): PublicUser | null {
  const users = readUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return null;
  user.avatarUrl = avatarUrl;
  writeUsers(users);
  return toPublic(user);
}

export function updateUserBanner(userId: string, bannerUrl: string): PublicUser | null {
  const users = readUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return null;
  user.bannerUrl = bannerUrl;
  writeUsers(users);
  return toPublic(user);
}

export function updateUserProfile(userId: string, updates: { displayName?: string }): PublicUser | null {
  const users = readUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return null;
  if (updates.displayName) user.displayName = updates.displayName.trim();
  writeUsers(users);
  return toPublic(user);
}

export function updateUserBio(userId: string, updates: { aboutMe?: string; workingOn?: string; country?: string }): PublicUser | null {
  const users = readUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return null;
  if (updates.aboutMe !== undefined) user.aboutMe = updates.aboutMe.slice(0, 500);
  if (updates.workingOn !== undefined) user.workingOn = updates.workingOn.slice(0, 500);
  if (updates.country !== undefined) user.country = updates.country.slice(0, 60);
  writeUsers(users);
  return toPublic(user);
}

export function addFavoriteGame(userId: string, gameId: string): PublicUser | null {
  const users = readUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return null;
  if (!user.favoriteGames.includes(gameId)) {
    user.favoriteGames.push(gameId);
    writeUsers(users);
  }
  return toPublic(user);
}

export function removeFavoriteGame(userId: string, gameId: string): PublicUser | null {
  const users = readUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return null;
  user.favoriteGames = user.favoriteGames.filter(id => id !== gameId);
  writeUsers(users);
  return toPublic(user);
}
