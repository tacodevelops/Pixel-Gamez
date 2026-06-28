const fs = require('fs');

const dataPath = 'c:\\Users\\dahir\\Documents\\pixelgamez\\lib\\data.ts';
let content = fs.readFileSync(dataPath, 'utf8');

// Remove Granny
content = content.replace(/.*\{ id: 'granny'.*\},\r?\n?/g, '');
// Remove Pixel Gun 3D
content = content.replace(/.*\{ id: 'pixel-gun-3d'.*\},\r?\n?/g, '');

// Reset plays and rating to 0
content = content.replace(/plays:\s*\d+/g, 'plays: 0');
content = content.replace(/rating:\s*[0-9.]+/g, 'rating: 0');

fs.writeFileSync(dataPath, content, 'utf8');
console.log('Cleaned data.ts');
