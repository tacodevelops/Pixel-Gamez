const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const https = require('https');
const path = require('path');

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  const dataPath = 'lib/data.ts';
  let content = fs.readFileSync(dataPath, 'utf8');

  const updates = [
    { id: 'getaway-shootout', category: 'arcade' },
    { id: 'silhouette-showdown', category: 'arcade' }
  ];

  for (const update of updates) {
    // update data.ts
    const re = new RegExp(`(id:\\s*'${update.id}'[\\s\\S]*?category:\\s*')([^']+)'`);
    content = content.replace(re, `$1${update.category}'`);
    
    // update db
    await prisma.game.update({
      where: { id: update.id },
      data: { category: update.category }
    }).catch(e => console.log(`DB update skip for ${update.id}`));
    console.log(`Updated ${update.id} to arcade`);
  }

  // Now let's try to add worldguessr
  const wgId = 'worldguessr';
  if (!content.includes(`id: '${wgId}'`)) {
    console.log('Adding worldguessr...');
    // We'll download an image
    const imgPath = path.join(__dirname, '..', 'public', 'images', 'worldguessr.png');
    // Using a reliable generic geography/world icon or try to fetch from their site if possible.
    // Actually, I'll just use a placeholder generic image download for now from a free source
    await downloadImage('https://www.worldguessr.com/icon.png', imgPath).catch(() => console.log('Failed to download icon.png'));

    const wgGame = `  {
    id: '${wgId}',
    title: 'Worldguessr',
    description: 'Explore the world and guess your location in this free alternative to Geoguessr.',
    category: 'puzzle',
    tags: ['exploration', 'geography', 'multiplayer'],
    thumbnail: '/images/worldguessr.png',
    embedUrl: 'https://www.worldguessr.com/',
    rating: 4.9,
    plays: 5000
  },
`;
    const gamesArrayEndIndex = content.indexOf('];\n\ngames.forEach(g => {');
    if (gamesArrayEndIndex !== -1) {
      content = content.substring(0, gamesArrayEndIndex) + wgGame + content.substring(gamesArrayEndIndex);
    }

    try {
      await prisma.game.create({
        data: {
          id: wgId,
          title: 'Worldguessr',
          description: 'Explore the world and guess your location in this free alternative to Geoguessr.',
          category: 'puzzle',
          tags: ['exploration', 'geography', 'multiplayer'],
          thumbnail: '/images/worldguessr.png',
          embedUrl: 'https://www.worldguessr.com/',
          rating: 4.9,
          plays: 5000
        }
      });
    } catch (e) {
      console.log('DB create skip worldguessr:', e.message);
    }
  }

  fs.writeFileSync(dataPath, content);
  console.log('Done script.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
