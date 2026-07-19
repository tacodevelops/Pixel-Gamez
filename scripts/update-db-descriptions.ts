import { PrismaClient } from '@prisma/client';
import { games } from '../lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating all game records in database...');
  for (const game of games) {
    await prisma.game.upsert({
      where: { id: game.id },
      update: {
        title: game.title,
        description: game.description,
        category: game.category,
        thumbnail: game.thumbnail,
        embedUrl: game.embedUrl,
      },
      create: {
        id: game.id,
        title: game.title,
        description: game.description,
        category: game.category,
        tags: game.tags,
        thumbnail: game.thumbnail,
        embedUrl: game.embedUrl,
        rating: game.rating || 0,
        plays: game.plays || 0,
      }
    });
  }
  console.log('Database games fully updated!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
