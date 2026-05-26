import express from 'express';
import type { Request, Response } from 'express';
import next from 'next';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import { getVotes, addVote, removeVote } from './lib/votes';
import { addSubmission, getApprovedSubmissions, getPendingSubmissions, getSubmissionsByUser, approveSubmission, rejectSubmission } from './lib/submissions';
import { registerUser, loginUser, getUserById, getAllPublicUsers, getUserByDisplayName, isAdmin, isOwner, updateUserAvatar, updateUserBanner, updateUserProfile, updateUserBio, addFavoriteGame, removeFavoriteGame } from './lib/users';
import { getAllAds, getAdsByPlacement, addAd, toggleAd, deleteAd, recordImpression, recordClick } from './lib/ads';
import { createSession, getSession, deleteSession, SESSION_COOKIE_NAME, SESSION_COOKIE_MAX_AGE } from './lib/sessions';
import { getNotifications, addNotification, deleteNotification } from './lib/notifications';
import type { PublicUser } from './lib/users';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const communityGamesDir = path.join(process.cwd(), 'public', 'community-games');
if (!fs.existsSync(communityGamesDir)) {
  fs.mkdirSync(communityGamesDir, { recursive: true });
}

const upload = multer({
  dest: path.join(process.cwd(), 'data', 'uploads'),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.zip', '.html', '.htm'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  },
});


const avatarsDir = path.join(process.cwd(), 'public', 'avatars');
if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });

const avatarUpload = multer({
  dest: path.join(process.cwd(), 'data', 'uploads'),
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (_req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  },
});


const bannersDir = path.join(process.cwd(), 'public', 'banners');
if (!fs.existsSync(bannersDir)) fs.mkdirSync(bannersDir, { recursive: true });

const bannerUpload = multer({
  dest: path.join(process.cwd(), 'data', 'uploads'),
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (_req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  },
});


function getAuthUser(req: Request): PublicUser | null {
  const token = req.cookies?.[SESSION_COOKIE_NAME];
  if (!token) return null;
  const session = getSession(token);
  if (!session) return null;
  const user = getUserById(session.userId);
  return user || null;
}

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(cookieParser());

  
  server.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  

  server.post('/api/auth/register', (req: Request, res: Response) => {
    const { email, password, displayName } = req.body;
    if (!email || !password || !displayName) {
      res.status(400).json({ error: 'Email, password, and display name are required.' });
      return;
    }

    const result = registerUser(email, password, displayName);
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }

    const token = createSession(result.user!.id);
    res.cookie(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: SESSION_COOKIE_MAX_AGE * 1000,
      sameSite: 'lax',
      path: '/',
    });
    res.json({ user: result.user });
  });

  server.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const result = loginUser(email, password);
    if (result.error) {
      res.status(401).json({ error: result.error });
      return;
    }

    const token = createSession(result.user!.id);
    res.cookie(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: SESSION_COOKIE_MAX_AGE * 1000,
      sameSite: 'lax',
      path: '/',
    });
    res.json({ user: result.user });
  });

  server.post('/api/auth/logout', (req: Request, res: Response) => {
    const token = req.cookies?.[SESSION_COOKIE_NAME];
    if (token) deleteSession(token);
    res.clearCookie(SESSION_COOKIE_NAME, { path: '/' });
    res.json({ success: true });
  });

  server.get('/api/auth/me', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) {
      res.json({ user: null });
      return;
    }
    res.json({ user });
  });

  

  server.post('/api/auth/avatar', avatarUpload.single('avatar'), (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) { res.status(401).json({ error: 'Not authenticated.' }); return; }

    if (!req.file) { res.status(400).json({ error: 'No image uploaded.' }); return; }

    const ext = path.extname(req.file.originalname).toLowerCase() || '.jpg';
    const filename = `${user.id}${ext}`;
    const destPath = path.join(avatarsDir, filename);

    
    try {
      const files = fs.readdirSync(avatarsDir);
      for (const f of files) {
        if (f.startsWith(user.id)) fs.unlinkSync(path.join(avatarsDir, f));
      }
    } catch {  }

    fs.renameSync(req.file.path, destPath);
    const avatarUrl = `/avatars/${filename}?t=${Date.now()}`;
    const updated = updateUserAvatar(user.id, avatarUrl);
    res.json({ user: updated });
  });

  server.post('/api/auth/banner', bannerUpload.single('banner'), (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) { res.status(401).json({ error: 'Not authenticated.' }); return; }

    if (!req.file) { res.status(400).json({ error: 'No image uploaded.' }); return; }

    const ext = path.extname(req.file.originalname).toLowerCase() || '.jpg';
    const filename = `${user.id}${ext}`;
    const destPath = path.join(bannersDir, filename);

    
    try {
      const files = fs.readdirSync(bannersDir);
      for (const f of files) {
        if (f.startsWith(user.id)) fs.unlinkSync(path.join(bannersDir, f));
      }
    } catch {  }

    fs.renameSync(req.file.path, destPath);
    const bannerUrl = `/banners/${filename}?t=${Date.now()}`;
    const updated = updateUserBanner(user.id, bannerUrl);
    res.json({ user: updated });
  });

  server.post('/api/auth/banner-color', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) { res.status(401).json({ error: 'Not authenticated.' }); return; }

    const { color } = req.body;
    if (!color) { res.status(400).json({ error: 'Color is required.' }); return; }

    
    try {
      const files = fs.readdirSync(bannersDir);
      for (const f of files) {
        if (f.startsWith(user.id)) fs.unlinkSync(path.join(bannersDir, f));
      }
    } catch {  }

    const updated = updateUserBanner(user.id, color);
    res.json({ user: updated });
  });

  server.post('/api/auth/profile', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) { res.status(401).json({ error: 'Not authenticated.' }); return; }

    const { displayName } = req.body;
    const updated = updateUserProfile(user.id, { displayName });
    res.json({ user: updated });
  });

  

  server.get('/api/votes/:gameId', (req: Request, res: Response) => {
    const votes = getVotes(req.params.gameId as string);
    res.json(votes);
  });

  server.post('/api/votes/:gameId', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) {
      res.status(401).json({ error: 'Sign in to vote.' });
      return;
    }

    const gameId = req.params.gameId as string;
    const { type, action } = req.body;

    if (!type || !['like', 'dislike'].includes(type)) {
      res.status(400).json({ error: 'Invalid vote type.' });
      return;
    }
    if (!action || !['add', 'remove'].includes(action)) {
      res.status(400).json({ error: 'Invalid action.' });
      return;
    }

    const votes = action === 'add' ? addVote(gameId, type as 'like' | 'dislike') : removeVote(gameId, type as 'like' | 'dislike');
    res.json(votes);
  });

  

  server.get('/api/developer/games', (_req: Request, res: Response) => {
    res.json(getApprovedSubmissions());
  });

  server.get('/api/developer/my-games', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) { res.status(401).json({ error: 'Not authenticated.' }); return; }
    res.json(getSubmissionsByUser(user.id));
  });

  server.post('/api/developer/submit', upload.single('gameFile'), (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) {
      res.status(401).json({ error: 'Sign in to submit games.' });
      return;
    }

    try {
      const { title, description, category, gameType, embedUrl, thumbnail, discordUrl, steamUrl } = req.body;

      if (!title || !description || !category || !gameType) {
        res.status(400).json({ error: 'Missing required fields.' });
        return;
      }

      let finalEmbedUrl = embedUrl || '';

      if (req.file && gameType === 'html') {
        const gameId = `game-${Date.now().toString(36)}`;
        const gameDir = path.join(communityGamesDir, gameId);
        fs.mkdirSync(gameDir, { recursive: true });
        const ext = path.extname(req.file.originalname).toLowerCase();
        if (ext === '.zip') {
          fs.renameSync(req.file.path, path.join(gameDir, 'game.zip'));
          finalEmbedUrl = `/community-games/${gameId}/index.html`;
        } else {
          fs.renameSync(req.file.path, path.join(gameDir, 'index.html'));
          finalEmbedUrl = `/community-games/${gameId}/index.html`;
        }
      }

      if (!finalEmbedUrl) {
        res.status(400).json({ error: 'Upload a game file or provide an embed URL.' });
        return;
      }

      const submission = addSubmission({
        title,
        description,
        category,
        gameType,
        embedUrl: finalEmbedUrl,
        thumbnail: thumbnail || '',
        userId: user.id,
        developerName: user.displayName,
        discordUrl: discordUrl || '',
        steamUrl: steamUrl || '',
      });

      res.json({ success: true, game: submission });
    } catch (error: unknown) {
      console.error('Submission error:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to submit game' });
    }
  });

  

  server.get('/api/admin/pending', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user || !isAdmin(user.id)) {
      res.status(403).json({ error: 'Admin access required.' });
      return;
    }
    res.json(getPendingSubmissions());
  });

  server.post('/api/admin/approve/:id', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user || !isAdmin(user.id)) {
      res.status(403).json({ error: 'Admin access required.' });
      return;
    }
    const result = approveSubmission(req.params.id as string, user.id);
    if (!result) { res.status(404).json({ error: 'Submission not found.' }); return; }
    res.json({ success: true, game: result });
  });

  server.post('/api/admin/reject/:id', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user || !isAdmin(user.id)) {
      res.status(403).json({ error: 'Admin access required.' });
      return;
    }
    const result = rejectSubmission(req.params.id as string, user.id);
    if (!result) { res.status(404).json({ error: 'Submission not found.' }); return; }
    res.json({ success: true, game: result });
  });

  

  server.get('/api/users/:id', (req: Request, res: Response) => {
    const user = getUserById(req.params.id as string);
    if (!user) { res.status(404).json({ error: 'User not found.' }); return; }
    const submissions = getSubmissionsByUser(user.id).filter(s => s.status === 'approved');
    res.json({ user, submissions });
  });

  server.post('/api/auth/bio', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) { res.status(401).json({ error: 'Not authenticated.' }); return; }
    const { aboutMe, workingOn, country } = req.body;
    const updated = updateUserBio(user.id, { aboutMe, workingOn, country });
    res.json({ user: updated });
  });

  server.post('/api/auth/favorite/:gameId', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) { res.status(401).json({ error: 'Not authenticated.' }); return; }
    const gameId = req.params.gameId as string;
    const { action } = req.body; 
    const updated = action === 'remove'
      ? removeFavoriteGame(user.id, gameId)
      : addFavoriteGame(user.id, gameId);
    if (!updated) { res.status(404).json({ error: 'User not found.' }); return; }
    res.json({ user: updated });
  });

  server.get('/api/users/lookup/:name', (req: Request, res: Response) => {
    const user = getUserByDisplayName(req.params.name as string);
    if (!user) { res.status(404).json({ error: 'User not found.' }); return; }
    res.json({ id: user.id, displayName: user.displayName });
  });

  

  server.get('/api/ads/:placement', (req: Request, res: Response) => {
    
    const placement = req.params.placement as string;
    const ads = getAdsByPlacement(placement);
    res.json(ads);
  });

  server.post('/api/ads/:id/click', (req: Request, res: Response) => {
    
    recordClick(req.params.id as string);
    res.json({ success: true });
  });

  server.post('/api/ads/:id/impression', (req: Request, res: Response) => {
    
    recordImpression(req.params.id as string);
    res.json({ success: true });
  });

  
  
  server.get('/api/admin/ads', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user || !isOwner(user.id)) { res.status(403).json({ error: 'Forbidden' }); return; }
    res.json(getAllAds());
  });

  server.post('/api/admin/ads', upload.single('image'), (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user || !isOwner(user.id)) { res.status(403).json({ error: 'Forbidden' }); return; }
    
    if (!req.file) { res.status(400).json({ error: 'Image is required.' }); return; }
    const { linkUrl, placement, label } = req.body;
    if (!linkUrl || !placement) { res.status(400).json({ error: 'Link and placement are required.' }); return; }

    const ext = path.extname(req.file.originalname) || '.png';
    const newFilename = `${req.file.filename}${ext}`;
    const newPath = path.join(req.file.destination, newFilename);
    fs.renameSync(req.file.path, newPath);

    const imageUrl = `/api/uploads/${newFilename}`;
    const ad = addAd({ imageUrl, linkUrl, placement: placement as any, label });
    res.json(ad);
  });

  server.post('/api/admin/ads/:id/toggle', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user || !isOwner(user.id)) { res.status(403).json({ error: 'Forbidden' }); return; }
    const updated = toggleAd(req.params.id as string);
    if (!updated) { res.status(404).json({ error: 'Ad not found' }); return; }
    res.json(updated);
  });

  server.delete('/api/admin/ads/:id', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user || !isOwner(user.id)) { res.status(403).json({ error: 'Forbidden' }); return; }
    const success = deleteAd(req.params.id as string);
    if (!success) { res.status(404).json({ error: 'Ad not found' }); return; }
    res.json({ success: true });
  });

  
  
  server.get('/api/notifications', (req: Request, res: Response) => {
    res.json(getNotifications());
  });

  server.post('/api/admin/notifications', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user || (!isOwner(user.id) && !isAdmin(user.id))) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    const { title, message } = req.body;
    if (!title || !message) {
      res.status(400).json({ error: 'Title and message are required.' });
      return;
    }
    const notif = addNotification(title, message);
    res.json(notif);
  });

  server.delete('/api/admin/notifications/:id', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user || (!isOwner(user.id) && !isAdmin(user.id))) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    deleteNotification(req.params.id as string);
    res.json({ success: true });
  });

  
  server.use((req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
