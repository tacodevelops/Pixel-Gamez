const d = require('fs').readFileSync('lib/data.ts', 'utf8');
const matches = [...d.matchAll(/id:\s*['"](.*?)['"][\s\S]*?title:\s*['"](.*?)['"]/g)];
matches.forEach(m => console.log(m[1], '|', m[2]));
