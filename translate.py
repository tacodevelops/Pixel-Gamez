import re
from deep_translator import GoogleTranslator

keys_to_translate = {
    'about': "About", 'fullscreen': "Fullscreen", 'owner_panel': "Owner Panel", 'moderator_panel': "Moderator Panel",
    'action': "Action", 'adventure': "Adventure", 'arcade': "Arcade", 'board': "Board", 'card': "Card",
    'clicker': "Clicker", 'driving': "Driving", 'io': ".io", 'puzzle': "Puzzle", 'shooting': "Shooting",
    'simulation': "Simulation", 'sports': "Sports", 'strategy': "Strategy", 'featured': "Featured",
    'multiplayer': "Multiplayer", 'singleplayer': "Singleplayer", 'retro': "Retro", 'html5': "HTML5"
}

with open('c:/Users/dahir/Documents/pixelgamez/lib/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def translate_text(text, lang_code):
    if lang_code == 'en': return text
    if lang_code == 'zh': lang_code = 'zh-CN'
    try:
        return GoogleTranslator(source='en', target=lang_code).translate(text)
    except Exception as e:
        print(f"Error translating {text} to {lang_code}: {e}")
        return text

def process_match(m):
    lang_code = m.group(1)
    body = m.group(2)
    
    # Let's remove the keys_to_translate if they already exist so we can re-add them translated
    for k in keys_to_translate:
        # regex to remove `k: "...",` or `k: "..."`
        # watch out for trailing commas
        body = re.sub(r'\b' + k + r'\s*:\s*"[^"]*",?', '', body)
        body = re.sub(r'\b' + k + r"\s*:\s*'[^']*',?", '', body)
    
    # clean up multiple commas or empty lines
    body = re.sub(r',\s*,', ',', body)
    
    print(f"Translating for {lang_code}...")
    new_entries = []
    for k in keys_to_translate:
        english_text = keys_to_translate[k]
        translated = translate_text(english_text, lang_code)
        translated = translated.replace('"', '\\"')
        new_entries.append(f'{k}: "{translated}"')
        
    body_stripped = body.strip()
    if body_stripped and not body_stripped.endswith(','):
        body += ','
    
    body += '\n    ' + ', '.join(new_entries) + '\n  '
    return f"{lang_code}: {{{body}}}"

new_content = re.sub(r'([a-z]{2}(?:-[A-Z]{2})?):\s*\{([^}]+)\}', process_match, content)

with open('c:/Users/dahir/Documents/pixelgamez/lib/translations.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done translating!")
