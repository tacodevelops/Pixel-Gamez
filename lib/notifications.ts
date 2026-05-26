import fs from 'fs';
import path from 'path';

const NOTIFICATIONS_FILE = path.join(process.cwd(), 'data', 'notifications.json');

export interface SiteNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

let cache: SiteNotification[] | null = null;

function ensureDataDir() {
  const dir = path.dirname(NOTIFICATIONS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readNotifications(): SiteNotification[] {
  if (cache) return cache;
  ensureDataDir();
  try {
    if (fs.existsSync(NOTIFICATIONS_FILE)) {
      cache = JSON.parse(fs.readFileSync(NOTIFICATIONS_FILE, 'utf-8'));
    } else {
      cache = [];
      fs.writeFileSync(NOTIFICATIONS_FILE, '[]');
    }
  } catch {
    cache = [];
  }
  return cache || [];
}

function writeNotifications(data: SiteNotification[]) {
  ensureDataDir();
  cache = data;
  fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(data, null, 2));
}

export function getNotifications(): SiteNotification[] {
  
  return readNotifications().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addNotification(title: string, message: string): SiteNotification {
  const notifs = readNotifications();
  const newNotif: SiteNotification = {
    id: `notif-${Date.now()}`,
    title,
    message,
    createdAt: new Date().toISOString()
  };
  notifs.push(newNotif);
  writeNotifications(notifs);
  return newNotif;
}

export function deleteNotification(id: string): void {
  const notifs = readNotifications().filter(n => n.id !== id);
  writeNotifications(notifs);
}
