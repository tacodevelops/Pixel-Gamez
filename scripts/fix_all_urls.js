const fs = require('fs');
const https = require('https');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixAllGames() {
  const dataPath = 'lib/data.ts';
  let content = fs.readFileSync(dataPath, 'utf8');

  // 1. Fix crazygames
  const crazyGames = ['retro-bowl', 'level-devil', 'retro-bowl-college', 'world-conquest', 'cats'];
  for (const cg of crazyGames) {
    let slug = cg;
    if (cg === 'cats') slug = 'crash-arena-turbo-stars';
    const embedUrl = `https://www.crazygames.com/embed/${slug}`;
    console.log(`Fixing CrazyGames: ${cg} -> ${embedUrl}`);
    const reg = new RegExp(`id:\\s*'${cg}'[\\s\\S]*?embedUrl:\\s*'[^']+'`, 'g');
    content = content.replace(reg, match => match.replace(/embedUrl:\s*'[^']+'/, `embedUrl: '${embedUrl}'`));
    await prisma.game.update({ where: { id: cg }, data: { embedUrl } }).catch(() => {});
  }

  // 2. Fix itch.io html-classic to embed-upload
  const itchGames = [
    { id: 'masterhealerkale', url: 'https://evrac.itch.io/masterhealerkale' },
    { id: 'island-of-mine', url: 'https://bonkyd.itch.io/island-of-mine' },
    { id: 'just-one-more-roll', url: 'https://cozy-wyvern.itch.io/just-one-more-roll' },
    { id: 'idland', url: 'https://nextframe.itch.io/idland' },
    { id: 'trump-clicker-ld39', url: 'https://improx.itch.io/trump-clicker-ld39' },
    { id: 'idle-wealth', url: 'https://quantum-bit.itch.io/idle-wealth' },
    { id: 'balls-gamble', url: 'https://gettake.itch.io/balls-gamble' },
    { id: 'chop-chains', url: 'https://alexisgelin.itch.io/chop-chains' },
    { id: 'gladihoppers', url: 'https://dreamonstudios.itch.io/gladihoppers' }
  ];

  for (const game of itchGames) {
    try {
      const html = await new Promise((resolve, reject) => {
        https.get(game.url, (res) => {
          let data = '';
          res.on('data', c => data += c);
          res.on('end', () => resolve(data));
          res.on('error', reject);
        }).on('error', reject);
      });

      const gameIdMatch = html.match(/content="games\/(\d+)"\s*name="itch:path"/i) || html.match(/name="itch:path"\s*content="games\/(\d+)"/i) || html.match(/data-game_id="?(\d+)"?/i);
      
      if (gameIdMatch) {
        const gameId = gameIdMatch[1];
        const newUrl = `https://itch.io/embed-upload/${gameId}?color=333333`;
        console.log(`Found ID for ${game.id}: ${gameId}. New URL: ${newUrl}`);

        const reg = new RegExp(`id:\\s*'${game.id}'[\\s\\S]*?embedUrl:\\s*'[^']+'`, 'g');
        content = content.replace(reg, match => match.replace(/embedUrl:\s*'[^']+'/, `embedUrl: '${newUrl}'`));
        await prisma.game.update({ where: { id: game.id }, data: { embedUrl: newUrl } }).catch(() => {});
      }
    } catch (e) {
      console.error(`Error processing ${game.id}:`, e.message);
    }
  }

  // Write back to file
  fs.writeFileSync(dataPath, content);
  console.log("All games fixed in data.ts and DB!");
}

fixAllGames()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
