const fs = require('fs');
const path = require('path');

const dataFile = path.join(process.cwd(), 'lib/data.ts');
let content = fs.readFileSync(dataFile, 'utf8');

const imagesDir = path.join(process.cwd(), 'public/images');
const images = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png'));

images.forEach(img => {
  const id = img.replace('.png', '');
  
  // Create a regex to find the object for this id
  // Note: this assumes standard formatting like { id: 'some-id', ... }
  // We'll replace thumbnail: '...' if it exists, or insert it.
  
  const regex = new RegExp(`({\\s*id:\\s*'${id}'[^{}]*?)thumbnail:\\s*'[^']*'([^{}]*})`, 'g');
  if (regex.test(content)) {
    content = content.replace(regex, `$1thumbnail: '/images/${img}'$2`);
  } else {
    // If thumbnail isn't present, we just add it after the id.
    const regex2 = new RegExp(`({\\s*id:\\s*'${id}',)`, 'g');
    content = content.replace(regex2, `$1 thumbnail: '/images/${img}',`);
  }
});

fs.writeFileSync(dataFile, content);
console.log('Updated lib/data.ts with ' + images.length + ' images.');
