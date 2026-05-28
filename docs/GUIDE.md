# PixelGamez: The Complete Guide

Welcome to the comprehensive technical and administrative guide for **PixelGamez**. This document covers everything you need to know about the architecture, features, database structure, monetization, and managing the platform as an Owner.

---

## 1. Core Architecture & Hybrid Database

PixelGamez is built on **Next.js 14** using the modern App Router architecture, paired with a robust **TypeScript** backend. The platform uses a "Hybrid" data approach to maximize performance while retaining full dynamic capabilities.

### Static Catalog (`lib/data.ts`)
The official game library (Top Picks, Trending, Popular, New) is managed directly inside `lib/data.ts`. Storing the core catalog in a TypeScript array allows Next.js to statically generate pages at build time, resulting in blazing fast load times and zero database latency for the homepage. 
- You can add games directly to `games` array in this file.
- Give games tags like `new`, `popular`, or `featured` to automatically group them into Homepage carousels.
- Missing images will automatically generate a colorful placeholder graphic using `makeThumbnail()`.

### Relational PostgreSQL Database
All dynamic, user-generated content is managed by a **PostgreSQL database** via **Prisma ORM**.
- The Prisma schema is located at `prisma/schema.prisma`.
- When deploying or after updating models, sync your database by running:
  ```bash
  npx prisma db push
  ```

Your Postgres database completely manages:
- **Users & Sessions** (Authentication)
- **Approved Games & Submissions** (Community content)
- **Favorites, Votes & Analytics** (User engagement)
- **Ads & Site Notifications** (Monetization & Communication)

---

## 2. Dynamic Game Carousels

PixelGamez features state-of-the-art sliding game carousels across the platform. 
- **Poki-Style UI:** Carousels feature premium frosted-glass (backdrop-blur) navigation arrows that seamlessly float over the game cards.
- **Smart Hydration:** Built-in `ResizeObserver` APIs constantly monitor the layout to handle hydration shifts.
- **Subpixel Perfect:** The scrolling math accounts for sub-pixel drift and browser-specific rounding bugs to ensure navigation arrows always appear when there are more games hidden off-screen, and dynamically disappear when you reach the end of a row.

---

## 3. Authentication & Roles

Security and user validation are natively built into PixelGamez.

### Email Verification (OTP)
When a user registers, we use **Resend** to securely email them a 6-digit One-Time Password (OTP). You must provide your Resend API Key inside the `.env` file (`RESEND_API_KEY`). The OTP lasts for a limited time and must be validated before the account creation is finalized in the Postgres database.

### Managing Roles (Owner)
By default, everyone who signs up is a standard `user`.
To elevate your account to **Owner** with full admin privileges, modify `lib/users.ts`.
Look for the `OWNER_EMAILS` constant at the top of the file:
```typescript
const OWNER_EMAILS: string[] = [
  'dahiruhammajam@gmail.com', // Add your email here
];
```
* **Owners** have unrestricted access to the **Admin Dashboard**: Approving games, managing Ads, viewing analytics, and sending global platform Notices.

---

## 4. Game Submission & Community Portal

The platform thrives on community content via the **Developer Portal**.
1. **Submission:** Any logged-in user can visit the Developer portal to submit a game. They provide a Title, Description, iFrame Embed URL, Category, and optional Steam/Discord links.
2. **Pending State:** The submission is securely inserted into the PostgreSQL `Submission` table with a status of `pending`.
3. **Approval:** Owners visit the **Admin Dashboard** to review submissions. Upon clicking "Approve", the game is authorized and instantly playable on the site.

---

## 5. User Profiles & Social Features

We have fully fleshed out features to maximize user engagement on the site.

### Custom Profiles
Every user has a personalized public profile. They can upload a custom **Avatar**, set a **Bio**, and customize their **Profile Banner** using standard CSS colors or gradient strings.

### The Favorite & Voting System
- **Favorites:** Users can curate their own library by clicking the **Heart Icon** located on the game player control bar. Favorited games instantly appear in a specialized "Favorites" grid on their profile.
- **Upvotes:** Every "Like" and "Dislike" cast on a game securely maps directly to the authenticated user ID in Postgres. A user cannot double-vote, ensuring accurate global ratings and analytics.

---

## 6. Monetization & Advertisements

PixelGamez provides both an internal, customizable Ad Server and seamless external integration for providers like Google AdSense.

### Internal Ad Server
You can run your own sponsorships or direct ads without relying on Google.
1. Go to the **Admin Dashboard** > **Ad Management** tab.
2. Upload an image banner and provide the destination `URL`.
3. Select a **Placement** (`banner-home`, `sidebar`, `game-side`, `profile`).

**Ad Tracking:** Every time an ad renders, the platform silently pings an impression endpoint. Clicking the ad pings a click-tracker. You can view the **Impressions, Clicks, and Click-Through Rate (CTR)** directly inside your Admin Dashboard.

### Google AdSense Integration
1. Open your `.env` file.
2. Provide your AdSense Client Publisher ID to the dedicated variable:
   ```env
   NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-XXXXXXXXXXXXX"
   ```
3. The platform will automatically inject the required Google AdSense JavaScript tags into the global layout.

---

## 7. Multi-Language Support (I18n)

PixelGamez supports **28 languages** globally.
The system uses `I18nContext.tsx` which defaults to checking the user's browser language (`navigator.language`) and gracefully falls back to English.

**Translations Dictionary:**
All translations are stored in `lib/translations.ts`. If you add a new button to the site, simply add the English text to the `en` dictionary block. To instantly translate it to all other 27 languages, run:
```bash
python translate.py
```
This script automatically scans for missing keys and uses Google Translate to populate them.

---

## 8. Hotlink Bypassing & Zoom Controls

Hosting games via iframes can occasionally present cross-origin challenges. 

### Hotlink Protection Bypass
Many portals (like itch.io or CrazyGames) restrict their direct HTML5 game files from being embedded on external websites to save bandwidth. PixelGamez circumvents this by passing `referrerPolicy="no-referrer"` to the game `<iframe>`. By stripping the origin headers, the host assumes the game is being played directly and allows the connection.

### Zoom Controls & Black Borders
Some Unity WebGL games will load in a fixed-size canvas inside the responsive iframe, resulting in large black borders. To fix this, PixelGamez includes **Manual Zoom Controls** (`+` and `-`) next to the Fullscreen button. These controls use CSS `transform: scale()` to visually enlarge the iframe, cropping out the black borders so the game perfectly fits the monitor.

---

## 9. Troubleshooting

### Error: "The table 'public.Ad' does not exist in the current database"
This occurs when the tables defined in your `prisma/schema.prisma` file do not actually exist in your Supabase PostgreSQL database yet.
**The Fix:** Sync your database schema by running: `npx prisma db push`
