const fs = require('fs');

const dataFile = './lib/data.ts';
let content = fs.readFileSync(dataFile, 'utf8');

const gamesStart = content.indexOf('export const games: Game[] = [');
let openBrackets = 0;
let gamesEnd = -1;
for (let i = gamesStart + 'export const games: Game[] = '.length; i < content.length; i++) {
  if (content[i] === '[') openBrackets++;
  if (content[i] === ']') {
    openBrackets--;
    if (openBrackets === 0) {
      gamesEnd = i + 1; // include the bracket
      break;
    }
  }
}

let gamesArrayStr = content.substring(gamesStart + 'export const games: Game[] = '.length, gamesEnd);
// evaluate it
let games = [];
try {
  games = eval(gamesArrayStr);
} catch (e) {
  console.error("Error evaluating games array:", e);
  process.exit(1);
}

// Keep first occurrence of each game
const uniqueGames = [];
const seenIds = new Set();

for (const g of games) {
  if (!seenIds.has(g.id)) {
    uniqueGames.push(g);
    seenIds.add(g.id);
  }
}

const newGamesList = [
  { id: 'snake-2048-io', title: 'Snake 2048.io', cat: 'io' },
  { id: 'digit-shooter', title: 'Digit Shooter', cat: 'arcade' },
  { id: 'jelly-run-2048', title: 'Jelly Run 2048', cat: 'arcade' },
  { id: 'bouncing-balls-2', title: 'Bouncing Balls 2', cat: 'arcade' },
  { id: 'bouncing-balls', title: 'Bouncing Balls', cat: 'arcade' },
  { id: 'going-balls', title: 'Going Balls', cat: 'arcade' },
  { id: 'going-balls-2', title: 'Going Balls 2', cat: 'arcade' },
  { id: 'pogo-masters', title: 'Pogo Masters', cat: 'sports' },
  { id: 'flip-master', title: 'Flip Master', cat: 'sports' },
  { id: 'flipper-master-3d', title: 'Flipper Master 3D', cat: 'sports' },
  { id: 'knife-storm', title: 'Knife Storm', cat: 'action' },
  { id: 'slice-it-all', title: 'Slice It All', cat: 'action' },
  { id: 'knife-hit', title: 'Knife Hit', cat: 'action' },
  { id: 'wood-carving', title: 'Wood Carving', cat: 'simulation' },
  { id: 'townscaper', title: 'Townscaper', cat: 'simulation' },
  { id: 'elastic-man', title: 'Elastic Man', cat: 'simulation' },
  { id: 'blob-bridge-run', title: 'Blob Bridge Run', cat: 'action' },
  { id: 'blob-opera', title: 'Blob Opera', cat: 'simulation' },
  { id: 'blob-tank-wars', title: 'Blob Tank Wars', cat: 'action' },
  { id: 'summer-rider-3d', title: 'Summer Rider 3D', cat: 'sports' },
  { id: 'duck-duck-clicker', title: 'Duck Duck Clicker', cat: 'clicker' },
  { id: 'among-us-online', title: 'Among Us Online', cat: 'action' },
  { id: 'prison-pump', title: 'Prison Pump', cat: 'action' },
  { id: 'bitlife-life-simulator', title: 'BitLife Life Simulator', cat: 'simulation' },
  { id: 'melon-sandbox', title: 'Melon Sandbox', cat: 'simulation' },
  { id: 'stickman-dismounting', title: 'Stickman Dismounting', cat: 'simulation' },
  { id: 'slow-roads-io', title: 'Slow Roads.io', cat: 'driving' },
  { id: 'mx-offroad-mountain-bike', title: 'MX Offroad Mountain Bike', cat: 'driving' },
  { id: 'get-on-top', title: 'Get On Top', cat: 'action' },
  { id: 'slicer-duo', title: 'Slicer Duo', cat: 'action' },
  { id: 'youtuber-idle', title: 'Youtuber Idle', cat: 'simulation' },
  { id: 'idle-money-factory', title: 'Idle Money Factory', cat: 'simulation' },
  { id: 'build-your-furniture-store', title: 'Build Your Furniture Store', cat: 'simulation' },
  { id: 'food-empire-inc', title: 'Food Empire Inc', cat: 'simulation' },
  { id: 'drive-in-cinema-idle-game', title: 'Drive In Cinema Idle Game', cat: 'simulation' },
  { id: 'cinema-business-idle', title: 'Cinema Business Idle', cat: 'simulation' },
  { id: 'candy-clicker', title: 'Candy Clicker', cat: 'clicker' },
  { id: 'candy-clicker-2', title: 'Candy Clicker 2', cat: 'clicker' },
  { id: 'cookie-clicker', title: 'Cookie Clicker', cat: 'clicker' },
  { id: 'planet-clicker', title: 'Planet Clicker', cat: 'clicker' }
];

for (const g of newGamesList) {
  if (!seenIds.has(g.id)) {
    uniqueGames.push({
      id: g.id,
      title: g.title,
      description: 'Play ' + g.title + ' on PixelGamez.',
      category: g.cat,
      tags: ['new'],
      thumbnail: '/images/games/newGames/' + g.id + '.png',
      embedUrl: 'https://www.twoplayergames.org/embed/' + g.id,
      rating: 0,
      plays: 0
    });
    seenIds.add(g.id);
  }
}

// Convert back to string
let gamesStr = 'export const games: Game[] = [\n';
for (const g of uniqueGames) {
  gamesStr += `  { id: '${g.id}', title: '${g.title.replace(/'/g, "\\'")}', description: '${g.description.replace(/'/g, "\\'")}', category: '${g.category}', tags: [${g.tags.map(t => `'${t}'`).join(', ')}], thumbnail: '${g.thumbnail}', embedUrl: '${g.embedUrl}', rating: ${g.rating || 0}, plays: ${g.plays || 0} },\n`;
}
gamesStr += ']';

content = content.substring(0, gamesStart) + gamesStr + content.substring(gamesEnd);
fs.writeFileSync(dataFile, content);
console.log('Fixed data.ts: ' + uniqueGames.length + ' games total.');
