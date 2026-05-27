import fs from 'fs';

const imagesDir = './public/images';
const images = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));

async function main() {
  let dataTs = fs.readFileSync('./lib/data.ts', 'utf-8');
  
  // extract all game ids using regex
  const ids = Array.from(dataTs.matchAll(/id:\s*'([^']+)'/g)).map(m => m[1]);

  for (const img of images) {
    const name = img.replace('.png', '').replace('.jpg', '');
    
    let matchId = ids.find(id => id === name);
    if (!matchId) matchId = ids.find(id => id.replace(/-/g, '') === name.replace(/-/g, ''));
    if (!matchId) {
        if (name === 'moto3xm-pool-party') matchId = 'moto-x3m-3-pool-party';
        if (name === 'moto-x3m-spooky-land') matchId = 'moto-x3m-6-spooky-land';
        if (name === 'moto-x3m4-winter') matchId = 'moto-x3m-4-winter';
        if (name === 'dungeons-and-degenerate-gamblers') matchId = 'dndg';
        if (name === 'gladiahppers') matchId = 'gladihoppers';
        if (name === 'poly-track') matchId = 'polytrack';
        if (name === 'retro-racing-double-dash') matchId = 'retro-racing-dd';
        if (name === 'spirits-of-steel') matchId = 'sosand';
        if (name === 'wdwwb') matchId = 'wbwwb';
    }
    if (!matchId) matchId = ids.find(id => name.includes(id) || id.includes(name));
    
    if (matchId) {
      console.log(`Matched image ${img} to game ${matchId}`);
      
      const regex = new RegExp(`({ id: '${matchId}',[^}]+thumbnail: )'[^']*'`);
      if (dataTs.match(regex)) {
        dataTs = dataTs.replace(regex, `$1'/images/${img}'`);
      }
    } else {
      console.log(`Could not match image ${img} to any game.`);
    }
  }
  
  fs.writeFileSync('./lib/data.ts', dataTs);
  console.log('Done!');
}
main();
