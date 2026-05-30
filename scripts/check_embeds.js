const https = require('https');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location.startsWith('/') ? new URL(url).origin + res.headers.location : res.headers.location;
        return fetchPage(loc).then(resolve).catch(reject);
      }
      const xfo = res.headers['x-frame-options'];
      const csp = res.headers['content-security-policy'];
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ data, xfo, csp, status: res.statusCode }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function checkSources() {
  const sources = [
    // retro-bowl alternatives
    { name: 'retro-bowl (crazygames)', url: 'https://www.crazygames.com/embed/retro-bowl' },
    { name: 'retro-bowl (1v1.lol style)', url: 'https://retro-bowl.io/' },
    { name: 'retro-bowl (retrobowl)', url: 'https://retrobowlgame.org/' },
    { name: 'retro-bowl (retrobowlunblocked)', url: 'https://retrobowlunblocked.io/' },
    
    // level-devil
    { name: 'level-devil (crazygames)', url: 'https://www.crazygames.com/embed/level-devil' },
    { name: 'level-devil (leveldevil.io)', url: 'https://leveldevil.io/' },
    
    // world-conquest
    { name: 'world-conquest (crazygames)', url: 'https://www.crazygames.com/embed/world-conquest' },
    
    // cats
    { name: 'cats (crazygames)', url: 'https://www.crazygames.com/embed/crash-arena-turbo-stars' },
  ];

  for (const src of sources) {
    try {
      const result = await fetchPage(src.url);
      const blocked = result.xfo || (result.csp && result.csp.includes('frame-ancestors'));
      console.log(`${src.name}: status=${result.status}, xfo=${result.xfo || 'none'}, blocked=${!!blocked}`);
      
      // Check for internal iframes
      const iframeMatch = result.data.match(/<iframe[^>]+src=["']([^"']+)["']/i);
      if (iframeMatch) {
        console.log(`  -> has iframe: ${iframeMatch[1]}`);
      }
    } catch(e) {
      console.log(`${src.name}: ERROR ${e.message}`);
    }
  }
}

checkSources().catch(console.error);
