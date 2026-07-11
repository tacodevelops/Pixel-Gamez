const fs = require('fs');

const dataFile = 'lib/data.ts';
let content = fs.readFileSync(dataFile, 'utf8');

// Update old games
const oldGames = [
  'tennis-physics', 'soccer-physics', 'soccer-physics-2', 'dino-game',
  'pixel-battles', 'pixel-kart', 'helifight', 'agar-io', 'mope-io', 'ping-pong-chaos'
];

oldGames.forEach(id => {
  // We used agar.io.png for agar-io, etc. Let's just do a generic replace for these lines.
  const regex = new RegExp(`(id: '${id}'.*?thumbnail: ')/images/games/([a-zA-Z0-9.-]+.png)'`, 'g');
  content = content.replace(regex, `$1/images/games/newGames/$2'`);
});

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

let addedGamesStr = '';
for (const g of newGamesList) {
  addedGamesStr += `  { id: '${g.id}', title: '${g.title.replace(/'/g, "\\'")}', description: 'Play ${g.title.replace(/'/g, "\\'")} on PixelGamez.', category: '${g.cat}', tags: ['new'], thumbnail: '/images/games/newGames/${g.id}.png', embedUrl: 'https://www.twoplayergames.org/embed/${g.id}', rating: 0, plays: 0 },\n`;
}

// insert before the closing bracket of games array
// Usually it's at the end or before "export const submissions"
// Wait, I can just replace `export const submissions` with the games + `export const submissions`
const insertionPoint = "export const submissions: Submission[] = [";
content = content.replace(insertionPoint, addedGamesStr + "\n];\n\n" + insertionPoint);

// wait, the games array already has a closing bracket.
// Better to find `];\n\nexport const submissions`
const targetStr = "];\n\nexport const submissions";
if (content.includes(targetStr)) {
    content = content.replace(targetStr, addedGamesStr + targetStr);
} else {
    // fallback, just find the last game and append after it.
    // capybara clicker is there, so let's find the closing bracket of games
    content = content.replace(/(  \{ id: 'idle-billionaire-tycoon'.*?\},)(\r?\n\];)/s, `$1\n${addedGamesStr}$2`);
}

fs.writeFileSync(dataFile, content);
console.log('Done');
