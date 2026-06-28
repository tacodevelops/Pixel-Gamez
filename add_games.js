const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/images/games');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));

const newGames = files.map(file => {
  const id = file.replace(/\.(png|jpg)$/, '');
  const title = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return `  { id: '${id}', title: '${title}', description: 'Play ${title} now on PixelGamez!', category: 'action', tags: ['new'], thumbnail: '/images/games/${file}', embedUrl: 'https://www.crazygames.com/embed/${id}', rating: 0, plays: 0 }`;
});

const dataPath = path.join(__dirname, 'lib/data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

// find the end of the games array
const gamesEndIndex = content.lastIndexOf('];');

if (gamesEndIndex !== -1) {
  const insert = ',\n' + newGames.join(',\n') + '\n';
  content = content.slice(0, gamesEndIndex) + insert + content.slice(gamesEndIndex);
  fs.writeFileSync(dataPath, content);
  console.log('Added ' + newGames.length + ' games');
} else {
  console.log('Could not find ];');
}
