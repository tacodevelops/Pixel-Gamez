const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixLumberer() {
  const dataPath = 'lib/data.ts';
  let content = fs.readFileSync(dataPath, 'utf8');

  // Fix lumberer-island
  const id = 'lumberer-island';
  const downloadUrl = 'https://gaardbodev.itch.io/lumberer-island';
  
  // Add downloadUrl property to data.ts for lumberer-island
  const reg = new RegExp(`(id:\\s*'lumberer-island'[\\s\\S]*?embedUrl:\\s*'[\\s\\S]*?')`);
  content = content.replace(reg, `$1,\n    downloadUrl: '${downloadUrl}'`);
  
  // Also fix the embedUrl to the widget just in case
  const embedUrl = 'https://itch.io/embed/3553487?link_color=fa5c5c';
  const reg2 = new RegExp(`id:\\s*'lumberer-island'[\\s\\S]*?embedUrl:\\s*'[^']+'`);
  content = content.replace(reg2, match => match.replace(/embedUrl:\s*'[^']+'/, `embedUrl: '${embedUrl}'`));

  fs.writeFileSync(dataPath, content);

  // Update DB (only embedUrl since downloadUrl is not in DB schema)
  await prisma.game.update({
    where: { id },
    data: { embedUrl }
  });

  console.log("Fixed Lumberer Island to be downloadable");
}

fixLumberer()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
