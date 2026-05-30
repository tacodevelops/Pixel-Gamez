const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const papasGames = [
  { id: 'papas-pizzeria', title: "Papa's Pizzeria", url: 'https://papaspizzeria.io/' },
  { id: 'papas-scooperia', title: "Papa's Scooperia", url: 'https://papaspizzeria.io/papas-scooperia' },
  { id: 'papas-sushiria', title: "Papa's Sushiria", url: 'https://papaspizzeria.io/papas-sushiria' },
  { id: 'papas-cheeseria', title: "Papa's Cheeseria", url: 'https://papaspizzeria.io/papas-cheeseria' },
  { id: 'papas-wingeria', title: "Papa's Wingeria", url: 'https://papaspizzeria.io/papas-wingeria' },
  { id: 'papas-cupcakeria', title: "Papa's Cupcakeria", url: 'https://papaspizzeria.io/papas-cupcakeria' },
  { id: 'papas-pancakeria', title: "Papa's Pancakeria", url: 'https://papaspizzeria.io/papas-pancakeria' },
  { id: 'papas-freezeria', title: "Papa's Freezeria", url: 'https://papaspizzeria.io/papas-freezeria' },
  { id: 'papas-donuteria', title: "Papa's Donuteria", url: 'https://papaspizzeria.io/papas-donuteria' },
  { id: 'papas-pastaria', title: "Papa's Pastaria", url: 'https://papaspizzeria.io/papas-pastaria' },
  { id: 'papas-burgeria', title: "Papa's Burgeria", url: 'https://papaspizzeria.io/papas-burgeria' },
  { id: 'papas-hot-doggeria', title: "Papa's Hot Doggeria", url: 'https://papaspizzeria.io/papas-hot-doggeria' },
  { id: 'papas-bakeria', title: "Papa's Bakeria", url: 'https://papaspizzeria.io/papas-bakeria' }
];

async function addPapasGames() {
  const dataPath = 'lib/data.ts';
  let content = fs.readFileSync(dataPath, 'utf8');

  // Insert just before the closing bracket of the games array
  const lastBracketIndex = content.lastIndexOf('];');
  
  let newGamesStr = '';
  for (const game of papasGames) {
    if (content.includes(`id: '${game.id}'`)) continue;
    
    newGamesStr += `  {
    id: '${game.id}',
    title: "${game.title}",
    description: "Run your own restaurant in ${game.title} and serve delicious food to your customers!",
    category: 'simulation',
    tags: ['simulation', 'casual'],
    thumbnail: '/images/${game.id}.png',
    embedUrl: '${game.url}',
    rating: 4.8,
    plays: 0,
    createdAt: new Date().toISOString()
  },\n`;

    // Add to DB
    await prisma.game.upsert({
      where: { id: game.id },
      update: {},
      create: {
        id: game.id,
        title: game.title,
        description: `Run your own restaurant in ${game.title} and serve delicious food to your customers!`,
        category: 'simulation',
        tags: ['simulation', 'casual'],
        thumbnail: `/images/${game.id}.png`,
        embedUrl: game.url,
        rating: 4.8,
        plays: 0,
        createdAt: new Date()
      }
    });
  }

  if (newGamesStr) {
    content = content.substring(0, lastBracketIndex) + newGamesStr + content.substring(lastBracketIndex);
    fs.writeFileSync(dataPath, content);
    console.log(`Added ${papasGames.length} Papa's games!`);
  } else {
    console.log("Games already added.");
  }
}

addPapasGames()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
