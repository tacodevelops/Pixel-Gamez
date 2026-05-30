const fs = require('fs');
const https = require('https');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPage(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  const html = await fetchPage('https://papaspizzeria.io/papas-scooperia');
  
  // Find iframe
  const iframeMatch = html.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  if (iframeMatch) {
    console.log('Found iframe src:', iframeMatch[1]);
  } else {
    console.log('No iframe found');
  }
  
  // Find any game embed URLs
  const embedMatches = html.match(/src=["'][^"']*game[^"']*["']/gi) || [];
  console.log('Game embeds:', embedMatches);
  
  // Find script sources
  const scriptMatches = html.match(/<script[^>]+src=["']([^"']+)["']/gi) || [];
  console.log('Scripts:', scriptMatches.slice(0, 5));
  
  // Check for ruffle or flash
  console.log('Has ruffle:', html.includes('ruffle'));
  console.log('Has flash:', html.includes('flash') || html.includes('swf'));
  
  // Print first 3000 chars
  console.log('\n--- HTML Preview ---');
  console.log(html.substring(0, 3000));
}

main().catch(console.error);
