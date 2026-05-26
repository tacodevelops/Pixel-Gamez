import { NextRequest, NextResponse } from 'next/server';
import { prisma } from './prisma';
import { SESSION_COOKIE_NAME } from './sessions';
import type { PublicUser } from './users';

export async function getAuthUser(req: NextRequest): Promise<PublicUser | null> {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({ where: { token } });
  if (!session || session.expiresAt < new Date()) return null;
  
  const user = await prisma.user.findUnique({ 
    where: { id: session.userId },
    include: { favoriteGames: { select: { id: true } } }
  });
  if (!user) return null;
  
  const { passwordHash: _, ...rest } = user;
  const publicUser: PublicUser = {
    ...rest,
    role: user.role as 'user' | 'moderator' | 'owner',
    favoriteGames: user.favoriteGames.map(g => g.id),
    createdAt: user.createdAt.toISOString(),
  };
  return publicUser;
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function successResponse(data: any) {
  return NextResponse.json(data);
}
