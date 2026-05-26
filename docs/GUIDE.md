# PixelGamez: The Complete Guide

Welcome to the internal workings of PixelGamez! This document covers everything you need to know about the architecture, the features we've built, and how to manage the platform as an Owner.

---

## 1. Core Architecture

PixelGamez is built on **Next.js 14** using the modern App Router architecture (`app/` directory). However, to support file uploads (like avatars and ad images) and raw API routes easily alongside a JSON database, we boot the application using a custom **Express Server (`server.ts`)**.

### Data Storage
Instead of a complex SQL or NoSQL database, the entire platform stores data in JSON files located in the `/data` directory:
- `users.json`: Registered users, roles, and profile settings.
- `games.json`: Approved games shown on the public site.
- `submissions.json`: Games submitted by developers waiting for approval.
- `ads.json`: The active/inactive advertisement campaigns.
- `notifications.json`: Site-wide notices broadcasted to users.
- `sessions.json`: Authentication tokens tracking logged-in users.
- `votes.json`: Tracks likes/dislikes on games.

*Note: In a production environment, you may eventually want to migrate these JSON reads/writes to a database like PostgreSQL or MongoDB for better concurrency, but the current system works great for an MVP.*

---

## 2. Authentication & Roles

### How Auth Works
When a user logs in, `server.ts` creates a random session string and stores it in `data/sessions.json` mapping to their User ID. A secure, HTTP-only cookie (`pixelgamez_session`) is given to the browser.
The frontend uses `AuthContext.tsx` to automatically verify this session on every page load and keep the user logged in.

### Managing Roles (Owner vs Moderator)
By default, everyone who signs up is a standard `user`.
To elevate a user to **Owner** or **Moderator**, you modify `lib/users.ts`.
Look for these constants at the top of the file:
```typescript
const OWNER_EMAILS = ['owner@example.com'];
const MOD_EMAILS = ['mod@example.com'];
```
Simply add your email address to `OWNER_EMAILS`. The next time you refresh the page, your session will automatically sync and upgrade your account!

* **Owners** have access to *everything*: Approving games, managing Ads, and sending Notices.
* **Moderators** can only approve games and send Notices.

---

## 3. Game Submission & Approval

The platform thrives on community content.
1. **Developer Portal:** Any logged-in user can visit the Developer portal to submit a game. They provide a Title, Description, iFrame Embed URL, Category, and optional Steam/Discord links.
2. **Pending State:** This submission goes into `data/submissions.json` with a status of `pending`.
3. **Approval:** Owners/Moderators visit the **Admin Dashboard** to review these submissions. Upon clicking "Approve", the game is moved from `submissions.json` to `games.json` and becomes instantly playable on the site!

---

## 4. The Advertisement System

We've built a custom Ad Server so you can start monetizing immediately without relying on external providers like Google AdSense, or you can use it alongside them.

### How to use Ads:
1. Go to the **Admin Dashboard** > **Ad Management** tab (Owner only).
2. Upload an image (like a 728x90 banner or a 300x250 square).
3. Provide the destination URL (where the user goes when they click).
4. Select a **Placement**. Placements correspond to specific areas of the site (e.g., `banner-home`, `sidebar`, `game-side`, `profile`).

### Tracking
Every time an ad is rendered on the screen, the `AdSlot.tsx` component pings `/api/ads/:id/impression`.
Every time a user clicks the ad, it pings `/api/ads/:id/click` before redirecting them.
You can view the **Views, Clicks, and CTR (Click-Through Rate)** directly on the Admin dashboard!

---

## 5. Notice & Inbox System

Need to tell the community about a new feature or a massive game drop?
1. Go to the **Admin Dashboard** > **Notices & Inbox**.
2. Create a Notice with a Title and Message.
3. It instantly broadcasts to all users. 
4. A red badge with the unread count will appear on the bell icon in their navigation bar. Once they click the bell, it marks them as read.

---

## 6. Multi-Language Support (I18n)

PixelGamez supports **28 languages**!
The system works using `I18nContext.tsx` which wraps the entire app. It defaults to checking the user's browser language (`navigator.language`) and falling back to English.

**Translations Dictionary:**
All translations are stored in `lib/translations.ts`.
If you ever add a new button or text to the site, you add a key to the `en` (English) dictionary.
To translate it to the other 27 languages, you run:
```bash
python translate.py
```
This script automatically scans for missing keys and uses Google Translate to fill them in!

---

## 7. User Profiles & Customization

Users can navigate to their profile by clicking their avatar in the top right.
They can:
* Upload a custom Avatar (saved to `public/uploads/`).
* Change their Display Name and Bio.
* Set a custom **Profile Banner**. They can provide an image URL, or standard CSS colors (e.g., `red`, `#ff0000`, or even `linear-gradient(to right, purple, black)`).
* View their "Favorite" games. (Users can favorite a game directly from the Game Player page).

---

## Conclusion
You are now fully equipped to run and manage PixelGamez. Use your Owner privileges wisely, keep an eye on your Ad CTRs, and have fun building the community!
