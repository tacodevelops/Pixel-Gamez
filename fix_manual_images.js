const fs = require('fs');
const path = require('path');

const manualMoves = [
  { from: 'public/images/games/newGames/amongus.png', to: 'public/images/games/action/among-us-online.png' },
  { from: 'public/images/games/newGames/bitlife.png', to: 'public/images/games/simulation/bitlife-life-simulator.png' },
  { from: 'public/images/games/newGames/candy-clicker-2-game.png', to: 'public/images/games/clicker/candy-clicker-2.png' },
  { from: 'public/images/games/newGames/drive-in-cinema.png', to: 'public/images/games/simulation/drive-in-cinema-idle-game.png' },
  { from: 'public/images/games/newGames/get-on-top-v2.png', to: 'public/images/games/action/get-on-top.png' },
  { from: 'public/images/games/newGames/mx-offroad-master-v2.png', to: 'public/images/games/driving/mx-offroad-mountain-bike.png' },
  { from: 'public/images/games/newGames/slowroadio.png', to: 'public/images/games/driving/slow-roads-io.png' },
  { from: 'public/images/games/newGames/Summer-Rider-3D-v2.png', to: 'public/images/games/sports/summer-rider-3d.png' },
  { from: 'public/images/games/newGames/Food_Empire.png', to: 'public/images/games/simulation/food-empire-inc.png' },
  { from: 'public/images/mine-clicker-gyi.png', to: 'public/images/games/clicker/mine-clicker.png' }
];

for (const move of manualMoves) {
  const fromPath = path.join(__dirname, move.from);
  const toPath = path.join(__dirname, move.to);
  if (fs.existsSync(fromPath)) {
    fs.mkdirSync(path.dirname(toPath), { recursive: true });
    fs.renameSync(fromPath, toPath);
  } else {
    console.log('Missing:', fromPath);
  }
}

// Also update data.ts to rename mine-clicker-gyi ID to mine-clicker
let data = fs.readFileSync('lib/data.ts', 'utf8');
data = data.replace(/id: 'mine-clicker-gyi'/g, "id: 'mine-clicker'");
data = data.replace(/\/images\/games\/clicker\/mine-clicker-gyi.png/g, "/images/games/clicker/mine-clicker.png");
data = data.replace(/\/images\/games\/mine-clicker-gyi.png/g, "/images/games/clicker/mine-clicker.png");
fs.writeFileSync('lib/data.ts', data);
console.log('Done manual fixes');
