import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Resetting game stats...');
  await prisma.vote.deleteMany();
  await prisma.game.updateMany({
    data: { plays: 0 }
  });
  await prisma.submission.updateMany({
    data: { plays: 0, rating: 0 }
  });
  console.log('All game stats (votes, plays) have been reset to 0.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
