const fs = require('fs');
const path = require('path');

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
      gamesEnd = i + 1;
      break;
    }
  }
}

let gamesArrayStr = content.substring(gamesStart + 'export const games: Game[] = '.length, gamesEnd);
let games = eval(gamesArrayStr);

const imagesDir = path.join(__dirname, 'public', 'images');

// Get all files recursively
function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });
  return arrayOfFiles;
}

const allImageFiles = getAllFiles(imagesDir);

function normalizeStr(s) {
  return s.toLowerCase().replace(/[-_.]/g, '');
}

const missing = [];

for (const game of games) {
  let matchedFile = null;
  const gameIdNorm = normalizeStr(game.id);
  const oldThumbBasename = normalizeStr(path.basename(game.thumbnail, '.png'));
  
  // 1. Try exact match from old thumbnail path if it exists
  const expectedOldPath = path.join(__dirname, 'public', game.thumbnail.replace(/^\//, '').replace(/\//g, path.sep));
  if (fs.existsSync(expectedOldPath) && fs.statSync(expectedOldPath).isFile()) {
    matchedFile = expectedOldPath;
  }
  
  if (!matchedFile) {
    // 2. Try matching by basename of old thumbnail
    for (const file of allImageFiles) {
      if (normalizeStr(path.basename(file, '.png')) === oldThumbBasename || normalizeStr(path.basename(file, '.jpg')) === oldThumbBasename) {
        matchedFile = file;
        break;
      }
    }
  }

  if (!matchedFile) {
    // 3. Try matching by game ID
    for (const file of allImageFiles) {
      if (normalizeStr(path.basename(file, path.extname(file))) === gameIdNorm) {
        matchedFile = file;
        break;
      }
    }
  }

  if (matchedFile) {
    const ext = path.extname(matchedFile);
    const categoryDir = path.join(imagesDir, 'games', game.category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
    const targetPath = path.join(categoryDir, game.id + ext);
    if (matchedFile !== targetPath) {
      try {
        fs.renameSync(matchedFile, targetPath);
      } catch (e) {
        console.error("Failed to move", matchedFile, e);
      }
    }
    game.thumbnail = `/images/games/${game.category}/${game.id}${ext}`;
  } else {
    // missing image
    missing.push(game.id);
    game.thumbnail = `/images/games/${game.category}/${game.id}.png`; // fallback expectation
  }
}

// Convert back to string
let newGamesStr = 'export const games: Game[] = [\n';
for (const g of games) {
  newGamesStr += `  { id: '${g.id}', title: '${g.title.replace(/'/g, "\\'")}', description: '${g.description.replace(/'/g, "\\'")}', category: '${g.category}', tags: [${g.tags.map(t => `'${t}'`).join(', ')}], thumbnail: '${g.thumbnail}', embedUrl: '${g.embedUrl}', rating: ${g.rating || 0}, plays: ${g.plays || 0} },\n`;
}
newGamesStr += ']';

content = content.substring(0, gamesStart) + newGamesStr + content.substring(gamesEnd);
fs.writeFileSync(dataFile, content);

console.log('Missing images for:', missing);
console.log('Reorganization complete.');
