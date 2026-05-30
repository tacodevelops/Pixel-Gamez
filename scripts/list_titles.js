const d = require('fs').readFileSync('lib/data.ts', 'utf8');
const titles = d.match(/title:\s*['"](.*?)['"]/g).map(t => t.split(/['"]/)[1]);
console.log(titles.join('\n'));
