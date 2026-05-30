const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixEverything() {
  const dataPath = 'lib/data.ts';
  let content = fs.readFileSync(dataPath, 'utf8');

  // === 1. Remove retro-bowl-college and lumberer-island from games array ===
  // retro-bowl-college spans lines with downloadUrl
  content = content.replace(/\s*\{ id: 'retro-bowl-college'[^\}]+\},?\n?/g, '\n');
  content = content.replace(/\s*\{ id: 'lumberer-island'[^\}]+\},?\n?/g, '\n');
  console.log('Removed retro-bowl-college and lumberer-island from data.ts');

  // Also delete from DB
  await prisma.game.delete({ where: { id: 'retro-bowl-college' } }).catch(() => {});
  await prisma.game.delete({ where: { id: 'lumberer-island' } }).catch(() => {});
  console.log('Removed retro-bowl-college and lumberer-island from DB');

  // === 2. Remove downloadUrl from remaining Poki games (retro-bowl, level-devil, world-conquest, cats) ===
  // These games have crazygames embed URLs that get blocked. We need alternative embed sources.
  // For now, remove the downloadUrl property lines
  content = content.replace(/\n\s*downloadUrl: 'https:\/\/poki\.com[^']*',/g, '');
  content = content.replace(/\n\s*downloadUrl: 'https:\/\/gaardbodev[^']*',/g, '');
  console.log('Removed downloadUrl properties');

  // === 3. Extract Papa's games from the broken searchGames function and add to main array ===
  // The papas block is inside: if (!q) return [ ... ];
  // We need to extract each game object from there
  const searchFnMatch = content.match(/if \(!q\) return \[\s*([\s\S]*?)\];\s*return games\.filter/);
  
  if (searchFnMatch) {
    const papasBlock = searchFnMatch[1].trim();
    
    // Fix the searchGames function to return [] properly
    content = content.replace(
      /if \(!q\) return \[\s*[\s\S]*?\];\s*(return games\.filter)/,
      'if (!q) return [];\n  $1'
    );
    
    // Now add the papas games to the main games array (before the closing ];)
    // Find the games array closing - it's the ]; right before the games.forEach line
    const forEachIndex = content.indexOf('games.forEach(g =>');
    const closingArrayIndex = content.lastIndexOf('];', forEachIndex);
    
    if (closingArrayIndex !== -1) {
      // Insert papas games before ];
      content = content.substring(0, closingArrayIndex) + papasBlock + '\n' + content.substring(closingArrayIndex);
      console.log("Moved Papa's games to main games array");
    }
  }

  // === 4. Fix Papa's embedUrls to use .embed suffix ===
  const papasGames = [
    { id: 'papas-pizzeria', embed: 'https://papaspizzeria.io/papas-pizzeria.embed' },
    { id: 'papas-scooperia', embed: 'https://papaspizzeria.io/papas-scooperia.embed' },
    { id: 'papas-sushiria', embed: 'https://papaspizzeria.io/papas-sushiria.embed' },
    { id: 'papas-cheeseria', embed: 'https://papaspizzeria.io/papas-cheeseria.embed' },
    { id: 'papas-wingeria', embed: 'https://papaspizzeria.io/papas-wingeria.embed' },
    { id: 'papas-cupcakeria', embed: 'https://papaspizzeria.io/papas-cupcakeria.embed' },
    { id: 'papas-pancakeria', embed: 'https://papaspizzeria.io/papas-pancakeria.embed' },
    { id: 'papas-freezeria', embed: 'https://papaspizzeria.io/papas-freezeria.embed' },
    { id: 'papas-donuteria', embed: 'https://papaspizzeria.io/papas-donuteria.embed' },
    { id: 'papas-pastaria', embed: 'https://papaspizzeria.io/papas-pastaria.embed' },
    { id: 'papas-burgeria', embed: 'https://papaspizzeria.io/papas-burgeria.embed' },
    { id: 'papas-hot-doggeria', embed: 'https://papaspizzeria.io/papas-hot-doggeria.embed' },
    { id: 'papas-bakeria', embed: 'https://papaspizzeria.io/papas-bakeria.embed' },
  ];

  // Fix papas-pizzeria embed (special case - was just '/')
  content = content.replace(
    /embedUrl: 'https:\/\/papaspizzeria\.io\/'/,
    "embedUrl: 'https://papaspizzeria.io/papas-pizzeria.embed'"
  );

  for (const game of papasGames) {
    // Fix embedUrl in data.ts - replace the page URL with .embed URL  
    const pageUrl = game.embed.replace('.embed', '');
    content = content.replace(
      new RegExp(`embedUrl: '${pageUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`),
      `embedUrl: '${game.embed}'`
    );
    
    // Update DB
    await prisma.game.update({
      where: { id: game.id },
      data: { embedUrl: game.embed }
    }).catch(e => console.log(`DB update for ${game.id}: ${e.message}`));
  }
  console.log("Fixed Papa's embed URLs to use .embed suffix");

  fs.writeFileSync(dataPath, content);
  console.log('\nAll fixes applied to data.ts!');
}

fixEverything()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
