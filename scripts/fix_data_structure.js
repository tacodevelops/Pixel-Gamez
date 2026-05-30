const fs = require('fs');

function fixDataFile() {
  const dataPath = 'lib/data.ts';
  let content = fs.readFileSync(dataPath, 'utf8');

  // Find the Papa's games block
  const papasStartStr = "  {    id: 'papas-pizzeria'";
  // Let's use regex to grab the block
  const match = content.match(/if \(!game\) return \[\s*({[\s\S]*'papas-bakeria'[\s\S]*?})\s*,?\s*\];/);
  if (!match) {
    console.log("Could not find Papa's games block in the wrong place");
    return;
  }

  const papasBlock = match[1];

  // 1. Remove it from getRelatedGames
  content = content.replace(match[0], 'if (!game) return [];');

  // 2. Append it to the main `export const games = [` array.
  // The games array ends with `];` before `export function getRelatedGames`
  // We can find `export function getRelatedGames` and insert it before the preceding `];`
  const exportFuncIndex = content.indexOf('export function getRelatedGames');
  const lastArrayBracketIndex = content.lastIndexOf('];', exportFuncIndex);

  content = content.substring(0, lastArrayBracketIndex) + 
            `  ${papasBlock},\n` + 
            content.substring(lastArrayBracketIndex);

  fs.writeFileSync(dataPath, content);
  console.log("Fixed data.ts structure!");
}

fixDataFile();
