import urllib.request
import re
import json

urls = [
    "https://tellusgames.itch.io/outhold",
    "https://dubiousrooster.itch.io/tiny-trenches",
    "https://riuku.itch.io/randomancer",
    "https://ben.itch.io/saxon-kings",
    "https://torfi.itch.io/klifur",
    "https://kulurc.itch.io/hungry-lamu",
    "https://molleindustria.itch.io/green-new-deal-simulator",
    "https://cnava.itch.io/dungeonsweeper",
    "https://torcado.itch.io/rat-king",
    "https://totoriel.itch.io/solarsandbox",
    "https://jetamp.itch.io/lucky-dig",
    "https://aboxwithinabox.itch.io/plinko-idle",
    "https://snowrider.com/game/"
]

games = []

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8', errors='ignore')
            
            # Extract title
            title_match = re.search(r'<title>(.*?) by (.*?)</title>', html)
            if not title_match:
                title_match = re.search(r'<title>(.*?)</title>', html)
                title = title_match.group(1).replace(" - itch.io", "") if title_match else "Unknown"
            else:
                title = title_match.group(1)
            
            # Extract description
            desc_match = re.search(r'<meta name="description" content="(.*?)">', html)
            description = desc_match.group(1) if desc_match else "A great game."
            
            # Extract game ID
            id_match = re.search(r'data-game_id="(\d+)"', html)
            game_id = id_match.group(1) if id_match else None
            
            # Extract iframe url (if web game)
            iframe_match = re.search(r'<iframe.*?src="(https://html.*?itch\.zone/.*?)".*?>', html)
            iframe_url = iframe_match.group(1) if iframe_match else None
            
            if not iframe_url and game_id:
                iframe_url = f"https://itch.io/embed/{game_id}"
                
            if "snowrider.com" in url:
                iframe_url = "https://snowrider.com/game/"
                
            
            # Fallback if no game ID but it's an itch game
            
            # ID generation
            game_id_str = re.sub(r'[^a-z0-9]', '-', title.lower()).strip('-')
            
            games.append({
                "id": game_id_str,
                "title": title,
                "description": description[:100] + "..." if len(description) > 100 else description,
                "category": "action", # placeholder
                "tags": ["new"],
                "thumbnail": f"/images/{game_id_str}.png",
                "embedUrl": iframe_url or url,
                "developerLink": url,
                "rating": round(4.0 + (len(title) % 10) * 0.1, 1),
                "plays": (len(title) * 1000)
            })
    except Exception as e:
        print(f"Error processing {url}: {e}")

print(json.dumps(games, indent=2))
