import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only';
const SESSION_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days

export async function createSession(userId: string): Promise<string> {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '30d'
  });
  return token;
}

export async function getSession(token: string) {
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, exp: number };
    return {
      token,
      userId: decoded.userId,
      expiresAt: new Date(decoded.exp * 1000)
    };
  } catch (err) {
    // Token is invalid or expired
    return null;
  }
}

export async function deleteSession(token: string): Promise<void> {
  // With JWT, we don't need to delete anything from the database.
  // The client will just clear the cookie.
}

export const SESSION_COOKIE_NAME = 'pgz_session';
export const SESSION_COOKIE_MAX_AGE = SESSION_MAX_AGE / 1000; 
