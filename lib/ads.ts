import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const ADS_FILE = path.join(process.cwd(), 'data', 'ads.json');

export type AdPlacement = 'sidebar' | 'banner-home' | 'game-below' | 'game-side' | 'profile';

export interface Ad {
  id: string;
  imageUrl: string;
  linkUrl: string;
  placement: AdPlacement;
  label: string;
  active: boolean;
  clicks: number;
  impressions: number;
  createdAt: string;
}

let adsCache: Ad[] | null = null;

function ensureDataDir(): void {
  const dir = path.dirname(ADS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readAds(): Ad[] {
  if (adsCache) return adsCache;
  ensureDataDir();
  try {
    if (fs.existsSync(ADS_FILE)) {
      adsCache = JSON.parse(fs.readFileSync(ADS_FILE, 'utf-8')) as Ad[];
    } else {
      adsCache = [];
      fs.writeFileSync(ADS_FILE, '[]', 'utf-8');
    }
  } catch { adsCache = []; }
  return adsCache;
}

function writeAds(data: Ad[]): void {
  ensureDataDir();
  adsCache = data;
  fs.writeFileSync(ADS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export function getAllAds(): Ad[] {
  return readAds();
}

export function getAdsByPlacement(placement: string): Ad[] {
  return readAds().filter(a => a.active && a.placement === placement);
}

export function getAdById(id: string): Ad | undefined {
  return readAds().find(a => a.id === id);
}

export function addAd(data: { imageUrl: string; linkUrl: string; placement: AdPlacement; label: string }): Ad {
  const ads = readAds();
  const ad: Ad = {
    id: crypto.randomBytes(8).toString('hex'),
    imageUrl: data.imageUrl,
    linkUrl: data.linkUrl,
    placement: data.placement,
    label: data.label || 'Advertisement',
    active: true,
    clicks: 0,
    impressions: 0,
    createdAt: new Date().toISOString(),
  };
  ads.push(ad);
  writeAds(ads);
  return ad;
}

export function toggleAd(id: string): Ad | null {
  const ads = readAds();
  const ad = ads.find(a => a.id === id);
  if (!ad) return null;
  ad.active = !ad.active;
  writeAds(ads);
  return ad;
}

export function deleteAd(id: string): boolean {
  const ads = readAds();
  const idx = ads.findIndex(a => a.id === id);
  if (idx === -1) return false;
  ads.splice(idx, 1);
  writeAds(ads);
  return true;
}

export function recordImpression(id: string): void {
  const ads = readAds();
  const ad = ads.find(a => a.id === id);
  if (ad) {
    ad.impressions++;
    writeAds(ads);
  }
}

export function recordClick(id: string): void {
  const ads = readAds();
  const ad = ads.find(a => a.id === id);
  if (ad) {
    ad.clicks++;
    writeAds(ads);
  }
}
