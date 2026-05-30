const fs = require('fs');
const https = require('https');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location.startsWith('/') ? new URL(url).origin + res.headers.location : res.headers.location;
        return fetchPage(loc).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ data, xfo: res.headers['x-frame-options'], status: res.statusCode }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  const dataPath = 'lib/data.ts';
  let content = fs.readFileSync(dataPath, 'utf8');

  // 1. Fix retro-bowl to use retrobowlgame.org embed
  const retroBowlEmbed = 'https://retrobowlgame.org/retro-bowl.embed';
  content = content.replace(
    /id: 'retro-bowl'([\s\S]*?)embedUrl: '[^']+'/,
    `id: 'retro-bowl'$1embedUrl: '${retroBowlEmbed}'`
  );
  await prisma.game.update({ where: { id: 'retro-bowl' }, data: { embedUrl: retroBowlEmbed } }).catch(e => console.log(e.message));
  console.log('Fixed retro-bowl embed');

  // 2. Remove level-devil, world-conquest, cats (all CrazyGames-only, can't be embedded)
  const toRemove = ['level-devil', 'world-conquest', 'cats'];
  for (const id of toRemove) {
    content = content.replace(new RegExp(`\\s*\\{ id: '${id}'[^\\}]+\\},?\\n?`, 'g'), '\n');
    await prisma.game.delete({ where: { id } }).catch(() => {});
    console.log(`Removed ${id}`);
  }

  fs.writeFileSync(dataPath, content);
  console.log('\nDone! Remaining Poki/CrazyGames fixed.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
