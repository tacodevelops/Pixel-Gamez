import os
import urllib.request
import urllib.parse
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

games_dir = r"c:\Users\dahir\Documents\pixelgamez\public\images\games"
logo_dir = r"c:\Users\dahir\Documents\pixelgamez\public\images"
os.makedirs(games_dir, exist_ok=True)
os.makedirs(logo_dir, exist_ok=True)

prompts = {
    "slope_runner.png": "A 3D neon green ball rolling down a steep colorful slope in space, fast-paced arcade game style, high quality thumbnail",
    "zombie_survival.png": "Dark apocalyptic scene with zombies and a survivor with weapons, action game style, high quality thumbnail",
    "car_drift.png": "A sports car drifting on a race track with smoke and speed lines, racing game style, high quality thumbnail",
    "block_puzzle.png": "Colorful Tetris-like blocks falling into place, bright puzzle game style, high quality thumbnail",
    "tank_battle.png": "Military tanks in an explosive battlefield, shooting game style, high quality thumbnail",
    "farm_sim.png": "A peaceful cartoon farm with crops, animals and a barn, simulation game style, high quality thumbnail",
    "chess_master.png": "A dramatic close-up of chess pieces on a board with dramatic lighting, board game style, high quality thumbnail",
    "ninja_warrior.png": "A ninja character in mid-air with throwing stars and a moonlit backdrop, action adventure style, high quality thumbnail",
    "space_shooter.png": "A spaceship shooting lasers at alien enemies in space with explosions, arcade shooter style, high quality thumbnail",
    "cooking_dash.png": "A busy cartoon kitchen with a chef cooking multiple dishes, casual game style, high quality thumbnail",
    "soccer_stars.png": "Dynamic soccer scene with players kicking a ball in a stadium, sports game style, high quality thumbnail",
    "tower_defense.png": "Medieval towers defending against waves of fantasy creatures, strategy game style, high quality thumbnail",
    "word_scramble.png": "Colorful letter tiles scattered around with sparkle effects, word game style, high quality thumbnail",
    "card_clash.png": "Fantasy trading cards with magical creatures battling, card game style, high quality thumbnail",
    "moto_cross.png": "A motorcycle jumping over obstacles on a dirt track, extreme sports style, high quality thumbnail",
}

logo_prompt = "A gaming logo with a purple P, flat design, icon"

base_url = "https://image.pollinations.ai/prompt/"

def download_image(prompt, filepath, width, height):
    encoded_prompt = urllib.parse.quote(prompt)
    url = f"{base_url}{encoded_prompt}?width={width}&height={height}&nologo=true&seed=42"
    print(f"Downloading {filepath} from {url}")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
    except Exception as e:
        print(f"Failed to download {filepath}: {e}")

for filename, prompt in prompts.items():
    filepath = os.path.join(games_dir, filename)
    download_image(prompt, filepath, 1280, 720)

logo_path = os.path.join(logo_dir, "logo.png")
download_image(logo_prompt, logo_path, 512, 512)

print("All done!")
