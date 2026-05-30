const fs = require('fs');

function fixPokiGames() {
  const dataPath = 'lib/data.ts';
  let content = fs.readFileSync(dataPath, 'utf8');

  const pokiGames = ['retro-bowl', 'level-devil', 'retro-bowl-college', 'world-conquest', 'cats'];

  for (const game of pokiGames) {
    const pokiUrl = `https://poki.com/en/g/${game}`;
    
    // Add downloadUrl property to data.ts for each game
    const reg = new RegExp(`(id:\\s*'${game}'[\\s\\S]*?embedUrl:\\s*'[\\s\\S]*?')`);
    if (content.match(reg) && !content.includes(`downloadUrl: '${pokiUrl}'`)) {
      content = content.replace(reg, `$1,\n    downloadUrl: '${pokiUrl}'`);
      console.log(`Updated ${game} with Poki external link`);
    }
  }

  fs.writeFileSync(dataPath, content);
  console.log("Fixed Poki games!");
}

fixPokiGames();
