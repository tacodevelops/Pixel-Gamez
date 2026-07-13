"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.games = exports.categories = void 0;
exports.getAllGames = getAllGames;
exports.getGameById = getGameById;
exports.getGamesByCategory = getGamesByCategory;
exports.getFeaturedGames = getFeaturedGames;
exports.getPopularGames = getPopularGames;
exports.getNewGames = getNewGames;
exports.getTrendingGames = getTrendingGames;
exports.getUpAndComingGames = getUpAndComingGames;
exports.getMostVisitedGames = getMostVisitedGames;
exports.getRecommendedGames = getRecommendedGames;
exports.searchGames = searchGames;
exports.getRelatedGames = getRelatedGames;
exports.getCategoryById = getCategoryById;
exports.getGameCountByCategory = getGameCountByCategory;
exports.formatPlays = formatPlays;
exports.categories = [
    { id: 'action', name: 'Action', icon: 'action' },
    { id: 'adventure', name: 'Adventure', icon: 'adventure' },
    { id: 'arcade', name: 'Arcade', icon: 'arcade' },
    { id: 'clicker', name: 'Clicker', icon: 'clicker' },
    { id: 'driving', name: 'Driving', icon: 'driving' },
    { id: 'io', name: '.io', icon: 'io' },
    { id: 'puzzle', name: 'Puzzle', icon: 'puzzle' },
    { id: 'shooting', name: 'Shooting', icon: 'shooting' },
    { id: 'simulation', name: 'Simulation', icon: 'simulation' },
    { id: 'sports', name: 'Sports', icon: 'sports' },
];
const categoryColors = {
    action: { bg: 'DC2626', fg: 'FECACA' },
    adventure: { bg: '7C3AED', fg: 'DDD6FE' },
    arcade: { bg: '2563EB', fg: 'BFDBFE' },
    board: { bg: '92400E', fg: 'FDE68A' },
    card: { bg: '065F46', fg: 'A7F3D0' },
    clicker: { bg: 'DB2777', fg: 'FBCFE8' },
    driving: { bg: 'EA580C', fg: 'FED7AA' },
    io: { bg: '0891B2', fg: 'CFFAFE' },
    puzzle: { bg: '4F46E5', fg: 'C7D2FE' },
    shooting: { bg: '991B1B', fg: 'FECACA' },
    simulation: { bg: '15803D', fg: 'BBF7D0' },
    sports: { bg: '1D4ED8', fg: 'BFDBFE' },
};
function makeThumbnail(title, category) {
    const colors = categoryColors[category] || { bg: '1A1B28', fg: 'A78BFA' };
    return `https://placehold.co/400x225/${colors.bg}/${colors.fg}?text=${encodeURIComponent(title)}&font=raleway`;
}
const EMBED_BASE = '/placeholder.html';
function makeEmbed(seed) {
    return `${EMBED_BASE}?seed=${seed}`;
}
exports.games = [
    { id: 'tennis-physics', title: 'Tennis Physics', description: 'A fun and chaotic 2-player tennis game with wacky physics.', category: 'sports', tags: ['action'], thumbnail: '/images/games/sports/tennis-physics.png', embedUrl: 'https://www.twoplayergames.org/embed/tennis-physics', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'soccer-physics', title: 'Soccer Physics', description: 'Experience the hilarity of 1-button soccer with ridiculous physics.', category: 'sports', tags: ['action', 'popular'], thumbnail: '/images/games/sports/soccer-physics.png', embedUrl: 'https://www.twoplayergames.org/embed/soccer-physics', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'soccer-physics-2', title: 'Soccer Physics 2', description: 'The sequel to the crazy 1-button soccer game with more wacky physics.', category: 'sports', tags: ['action'], thumbnail: '/images/games/sports/soccer-physics-2.png', embedUrl: 'https://www.twoplayergames.org/embed/soccer-physics-2', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'dino-game', title: 'Dino Game', description: 'The classic endless runner featuring the T-Rex.', category: 'arcade', tags: ['popular'], thumbnail: '/images/games/arcade/dino-game.png', embedUrl: 'https://www.twoplayergames.org/embed/dino-game', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'pixel-battles', title: 'Pixel Battles', description: 'Intense pixelated battles for 2 players. Outsmart and outshoot your opponent!', category: 'action', tags: ['arcade'], thumbnail: '/images/games/action/pixel-battles.png', embedUrl: 'https://www.twoplayergames.org/embed/pixel-battles', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'pixel-kart', title: 'Pixel Kart', description: 'Retro 2D go-kart racing. Drift, boost, and win!', category: 'driving', tags: ['arcade'], thumbnail: '/images/games/driving/pixel-kart.png', embedUrl: 'https://www.twoplayergames.org/embed/pixel-kart', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'helifight', title: 'HeliFight', description: 'Control a helicopter and try to take down your opponent in this 2-player aerial battle.', category: 'action', tags: ['arcade'], thumbnail: '/images/games/action/helifight.png', embedUrl: 'https://www.twoplayergames.org/embed/helifight', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'agar-io', title: 'Agar.io', description: 'The smash hit game! Control your cell and eat other players to grow larger.', category: 'io', tags: ['popular', 'action'], thumbnail: '/images/games/io/agar-io.png', embedUrl: 'https://agar.io/#ffa', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'mope-io', title: 'Mope.io', description: 'Survive and climb the food chain in this fun multiplayer animal evolution game.', category: 'io', tags: ['popular', 'action'], thumbnail: '/images/games/io/mope-io.png', embedUrl: 'https://mope.io/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'ping-pong-chaos', title: 'Ping Pong Chaos', description: 'A chaotic and fun 2-player ping pong game with crazy physics and power-ups.', category: 'sports', tags: ['action', 'popular'], thumbnail: '/images/games/sports/ping-pong-chaos.png', embedUrl: 'https://www.twoplayergames.org/embed/ping-pong-chaos', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'house-of-hazards', title: 'House of Hazards', description: 'Try to survive the House of Hazards! Watch out for traps set by your friends in this hilarious party game.', category: 'action', tags: ['new', 'popular'], thumbnail: '/images/games/action/house-of-hazards.png', embedUrl: 'https://unblockedgames66.gitlab.io/house-of-hazards/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'basket-random', title: 'Basket Random', description: 'A fun, chaotic, and completely random physics-based basketball game!', category: 'sports', tags: ['new', 'popular'], thumbnail: '/images/games/sports/basket-random.png', embedUrl: 'https://unblockedgames66.gitlab.io/basket-random/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'boxing-random', title: 'Boxing Random', description: 'A fun, chaotic, and completely random physics-based boxing game.', category: 'sports', tags: ['new', 'popular', 'action'], thumbnail: '/images/games/sports/boxing-random.png', embedUrl: 'https://unblockedgames66.gitlab.io/boxing-random/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'basketball-legends', title: 'Basketball Legends', description: 'A fun, chaotic, and completely random physics-based basketball game.', category: 'sports', tags: ['new', 'popular', 'action'], thumbnail: '/images/games/sports/basketball-legends.png', embedUrl: 'https://unblockedgames66.gitlab.io/basketball-legends/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'soccer-random', title: 'Soccer Random', description: 'Experience soccer like never before in this completely unpredictable, physics-based soccer game!', category: 'sports', tags: ['new', 'popular', 'action'], thumbnail: '/images/games/sports/soccer-random.png', embedUrl: 'https://unblockedgames66.gitlab.io/soccer-random/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'rooftop-snipers', title: 'Rooftop Snipers', description: 'A chaotic two-button sniper game. Try to shoot your opponent off the roof!', category: 'shooting', tags: ['popular', 'action'], thumbnail: '/images/games/shooting/rooftop-snipers.png', embedUrl: 'https://unblockedgames66.gitlab.io/rooftop-snipers/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'rooftop-snipers-2', title: 'Rooftop Snipers 2', description: 'The sequel to the classic! More chaos, more weapons, more fun!', category: 'shooting', tags: ['new', 'action'], thumbnail: '/images/games/shooting/rooftop-snipers-2.png', embedUrl: 'https://unblockedgames66.gitlab.io/rooftop-snipers-2/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'volley-random', title: 'Volley Random', description: 'Physics-based volleyball madness. Expect the unexpected in every serve!', category: 'sports', tags: ['new', 'popular'], thumbnail: '/images/games/sports/volley-random.png', embedUrl: 'https://unblockedgames66.gitlab.io/volley-random/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'raft-wars-2', title: 'Raft Wars 2', description: 'Infiltrate the water park and find your buried treasure in this hilarious sequel!', category: 'shooting', tags: ['action', 'popular'], thumbnail: '/images/games/shooting/raft-wars-2.png', embedUrl: 'https://unblockedgames66.gitlab.io/raft-wars-2/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'boxing-physics-2', title: 'Boxing Physics 2', description: 'Experience the craziest boxing matches with bizarre physics and characters.', category: 'sports', tags: ['action', 'new'], thumbnail: '/images/games/sports/boxing-physics-2.png', embedUrl: 'https://unblockedgames66.gitlab.io/boxing-physics-2/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'royale-dudes', title: 'Royale Dudes', description: 'A fast-paced 2D multiplayer battle royale game. Loot, shoot, and survive!', category: 'io', tags: ['action', 'popular', 'new'], thumbnail: '/images/games/io/royale-dudes.png', embedUrl: 'https://unblockedgames66.gitlab.io/royale-dudes/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'moto-x3m-3-pool-party', title: 'Moto X3M Pool Party', description: 'Take your dirt bike to the pool party! Perform stunts and avoid deadly traps.', category: 'driving', tags: ['action', 'popular'], thumbnail: '/images/games/driving/moto-x3m-3-pool-party.png', embedUrl: 'https://unblockedgames66.gitlab.io/moto-x3m-3-pool-party/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'moto-x3m-6-spooky-land', title: 'Moto X3M Spooky Land', description: 'A terrifyingly fun dirt bike experience through a haunted landscape!', category: 'driving', tags: ['action', 'popular'], thumbnail: '/images/games/driving/moto-x3m-6-spooky-land.png', embedUrl: 'https://unblockedgames66.gitlab.io/moto-x3m-6-spooky-land/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'moto-x3m-two', title: 'Moto X3M 2', description: 'The second installment of the legendary dirt bike racing series.', category: 'driving', tags: ['action'], thumbnail: '/images/games/driving/moto-x3m-two.png', embedUrl: 'https://unblockedgames66.gitlab.io/moto-x3m-two/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'moto-x3m-4-winter', title: 'Moto X3M 4 Winter', description: 'Race your bike across icy mountains and festive tracks in this winter edition!', category: 'driving', tags: ['action', 'popular'], thumbnail: '/images/games/driving/moto-x3m-4-winter.png', embedUrl: 'https://unblockedgames66.gitlab.io/moto-x3m4-winter/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'gartic-phone-io', title: 'Gartic Phone', description: 'The telephone game meets drawing! Hilarious fun with friends.', category: 'io', tags: ['popular', 'new'], thumbnail: '/images/games/io/gartic-phone-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/gartic-phone-io/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'crossy-road', title: 'Crossy Road', description: 'Why did the chicken cross the road? Find out in this classic endless hopper!', category: 'arcade', tags: ['popular'], thumbnail: '/images/games/arcade/crossy-road.png', embedUrl: 'https://unblockedgames66.gitlab.io/crossy-road/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'bob-the-robber-2', title: 'Bob The Robber 2', description: 'Sneak past guards and cameras to steal the loot!', category: 'puzzle', tags: ['popular'], thumbnail: '/images/games/puzzle/bob-the-robber-2.png', embedUrl: 'https://unblockedgames66.gitlab.io/bob-the-robber-2/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'drive-mad', title: 'Drive Mad', description: 'Physics-based driving game where you must reach the finish line in one piece.', category: 'driving', tags: ['popular'], thumbnail: '/images/games/driving/drive-mad.png', embedUrl: 'https://unblockedgames66.gitlab.io/drive-mad/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'pixel-smash-duel', title: 'Pixel Smash Duel', description: 'Intense pixelated duels. Knock your opponent off the platform!', category: 'action', tags: ['action'], thumbnail: '/images/games/action/pixel-smash-duel.png', embedUrl: 'https://unblockedgames66.gitlab.io/pixel-smash-duel/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'aquapark-io', title: 'Aquapark.io', description: 'Race down the massive water slide and knock others off!', category: 'io', tags: ['popular', 'action'], thumbnail: '/images/games/io/aquapark-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/aquapark-io/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'hole-io', title: 'Hole.io', description: 'Consume everything in your path and become the biggest black hole!', category: 'io', tags: ['popular', 'action'], thumbnail: '/images/games/io/hole-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/hole-io/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'idle-mining-empire', title: 'Idle Mining Empire', description: 'Manage your mining facilities and become an industrial tycoon.', category: 'clicker', tags: ['popular'], thumbnail: '/images/games/clicker/idle-mining-empire.png', embedUrl: 'https://unblockedgames66.gitlab.io/idle-mining-empire/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'idle-breakout', title: 'Idle Breakout', description: 'Breakout meets idle clicking. Upgrade your balls to destroy blocks faster.', category: 'clicker', tags: ['popular'], thumbnail: '/images/games/clicker/idle-breakout.png', embedUrl: 'https://unblockedgames66.gitlab.io/idle-breakout/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'burger-clicker', title: 'Burger Clicker', description: 'Click to make burgers and build your fast food empire!', category: 'clicker', tags: [], thumbnail: '/images/games/clicker/burger-clicker.png', embedUrl: 'https://unblockedgames66.gitlab.io/burger-clicker/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'idle-restaurants', title: 'Idle Restaurants', description: 'Manage and upgrade your restaurant business.', category: 'clicker', tags: [], thumbnail: '/images/games/clicker/idle-restaurants.png', embedUrl: 'https://unblockedgames66.gitlab.io/idle-restaurants/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'flip-bottle', title: 'Flip Bottle', description: 'Can you master the bottle flip challenge?', category: 'arcade', tags: ['popular'], thumbnail: '/images/games/arcade/flip-bottle.png', embedUrl: 'https://unblockedgames66.gitlab.io/flip-bottle/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'baldis-basics', title: 'Baldi\'s Basics', description: 'A surreal horror educational game. Collect 7 notebooks and escape!', category: 'adventure', tags: ['popular', 'action'], thumbnail: '/images/games/adventure/baldis-basics.png', embedUrl: 'https://unblockedgames66.gitlab.io/baldis-basics/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'happy-wheels', title: 'Happy Wheels', description: 'A ragdoll physics-based platformer. Dodge deadly obstacles!', category: 'action', tags: ['popular'], thumbnail: '/images/games/action/happy-wheels.png', embedUrl: 'https://unblockedgames66.gitlab.io/happy-wheels/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'sausage-flip', title: 'Sausage Flip', description: 'Fling the sausage to the finish line in this weirdly fun physics game.', category: 'arcade', tags: [], thumbnail: '/images/games/arcade/sausage-flip.png', embedUrl: 'https://unblockedgames66.gitlab.io/sausage-flip/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'slope-2-players', title: 'Slope 2 Players', description: 'Roll down the endless slope and compete with a friend!', category: 'arcade', tags: ['popular'], thumbnail: '/images/games/arcade/slope-2-players.png', embedUrl: 'https://unblockedgames66.gitlab.io/slope-2-players/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'stack-bump-3d', title: 'Stack Bump 3D', description: 'Smash through the helix platforms and reach the bottom.', category: 'arcade', tags: [], thumbnail: '/images/games/arcade/stack-bump-3d.png', embedUrl: 'https://unblockedgames66.gitlab.io/stack-bump-3d/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'snake-io', title: 'Snake.io', description: 'Slither your way to the top in this competitive multiplayer snake game.', category: 'io', tags: ['popular'], thumbnail: '/images/games/io/snake-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/snake-io/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'smash-karts-io', title: 'Smash Karts', description: 'Multiplayer kart battle arena! Collect weapons and blow up your opponents.', category: 'io', tags: ['popular', 'action', 'driving'], thumbnail: '/images/games/io/smash-karts-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/smash-karts-io/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'getaway-shootout', title: 'Getaway Shootout', description: 'Race to the getaway vehicle while jumping and shooting your rivals.', category: 'arcade', tags: ['popular'], thumbnail: '/images/games/arcade/getaway-shootout.png', embedUrl: 'https://unblockedgames66.gitlab.io/getaway-shootout/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'johny-revenge', title: 'Johnny Revenge', description: 'Flip, shoot, and take down the bad guys in slow motion.', category: 'shooting', tags: ['action'], thumbnail: '/images/games/shooting/johny-revenge.png', embedUrl: 'https://unblockedgames66.gitlab.io/johny-revenge/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'johny-trigger', title: 'Johnny Trigger', description: 'More slow-motion shooting action as you clear out rooms of enemies.', category: 'shooting', tags: ['action', 'popular'], thumbnail: '/images/games/shooting/johny-trigger.png', embedUrl: 'https://unblockedgames66.gitlab.io/johny-trigger/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'stickman-hook', title: 'Stickman Hook', description: 'Swing like Spider-Man through hundreds of challenging levels.', category: 'action', tags: ['popular'], thumbnail: '/images/games/action/stickman-hook.png', embedUrl: 'https://unblockedgames66.gitlab.io/stickman-hook/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'getting-over-it', title: 'Getting Over It', description: 'A punishing climbing game. Can you reach the top without losing your mind?', category: 'adventure', tags: ['popular', 'action'], thumbnail: '/images/games/adventure/getting-over-it.png', embedUrl: 'https://unblockedgames66.gitlab.io/getting-over-it/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'bloxd-io', title: 'Bloxd.io', description: 'A adventure game.', category: 'adventure', tags: ['popular', 'action'], thumbnail: '/images/games/adventure/bloxd-io.png', embedUrl: 'https://bloxd.io', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'retro-bowl', title: 'Retro Bowl', description: 'American football management game', category: 'sports', tags: ['new'], thumbnail: '/images/games/sports/retro-bowl.png', embedUrl: 'https://retrobowlgame.org/retro-bowl.embed', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'papas-pizzeria', title: 'Papa\'s Pizzeria', description: 'Run your own restaurant in Papa\'s Pizzeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/games/simulation/papas-pizzeria.png', embedUrl: 'https://papaspizzeria.io/papas-pizzeria.embed', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'papas-scooperia', title: 'Papa\'s Scooperia', description: 'Run your own restaurant in Papa\'s Scooperia and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/games/simulation/papas-scooperia.png', embedUrl: 'https://papaspizzeria.io/papas-scooperia.embed', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'papas-sushiria', title: 'Papa\'s Sushiria', description: 'Run your own restaurant in Papa\'s Sushiria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/games/simulation/papas-sushiria.png', embedUrl: 'https://papaspizzeria.io/papas-sushiria.embed', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'papas-cheeseria', title: 'Papa\'s Cheeseria', description: 'Run your own restaurant in Papa\'s Cheeseria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/games/simulation/papas-cheeseria.png', embedUrl: 'https://papaspizzeria.io/papas-cheeseria.embed', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'papas-wingeria', title: 'Papa\'s Wingeria', description: 'Run your own restaurant in Papa\'s Wingeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/games/simulation/papas-wingeria.png', embedUrl: 'https://papaspizzeria.io/papas-wingeria.embed', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'papas-cupcakeria', title: 'Papa\'s Cupcakeria', description: 'Run your own restaurant in Papa\'s Cupcakeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/games/simulation/papas-cupcakeria.png', embedUrl: 'https://papaspizzeria.io/papas-cupcakeria.embed', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'papas-pancakeria', title: 'Papa\'s Pancakeria', description: 'Run your own restaurant in Papa\'s Pancakeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/games/simulation/papas-pancakeria.png', embedUrl: 'https://papaspizzeria.io/papas-pancakeria.embed', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'papas-freezeria', title: 'Papa\'s Freezeria', description: 'Run your own restaurant in Papa\'s Freezeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/games/simulation/papas-freezeria.png', embedUrl: 'https://papaspizzeria.io/papas-freezeria.embed', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'papas-donuteria', title: 'Papa\'s Donuteria', description: 'Run your own restaurant in Papa\'s Donuteria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/games/simulation/papas-donuteria.png', embedUrl: 'https://papaspizzeria.io/papas-donuteria.embed', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'papas-pastaria', title: 'Papa\'s Pastaria', description: 'Run your own restaurant in Papa\'s Pastaria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/games/simulation/papas-pastaria.png', embedUrl: 'https://papaspizzeria.io/papas-pastaria.embed', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'papas-burgeria', title: 'Papa\'s Burgeria', description: 'Run your own restaurant in Papa\'s Burgeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/games/simulation/papas-burgeria.png', embedUrl: 'https://papaspizzeria.io/papas-burgeria.embed', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'papas-hot-doggeria', title: 'Papa\'s Hot Doggeria', description: 'Run your own restaurant in Papa\'s Hot Doggeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/games/simulation/papas-hot-doggeria.png', embedUrl: 'https://papaspizzeria.io/papas-hot-doggeria.embed', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'papas-bakeria', title: 'Papa\'s Bakeria', description: 'Run your own restaurant in Papa\'s Bakeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/games/simulation/papas-bakeria.png', embedUrl: 'https://papaspizzeria.io/papas-bakeria.embed', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'level-devil', title: 'Level Devil', description: 'Level Devil is a challenging puzzle platformer with unexpected traps.', category: 'puzzle', tags: ['platformer', 'hard', 'funny'], thumbnail: '/images/games/puzzle/level-devil.png', embedUrl: 'https://leveldevil-trollgame.github.io/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'worldguessr', title: 'Worldguessr', description: 'Explore the world and guess your location in this free alternative to Geoguessr.', category: 'puzzle', tags: ['exploration', 'geography', 'multiplayer'], thumbnail: '/images/games/puzzle/worldguessr.png', embedUrl: 'https://www.worldguessr.com/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
    { id: 'snake-2048-io', title: 'Snake 2048.io', description: 'Play Snake 2048.io on PixelGamez.', category: 'io', tags: ['new'], thumbnail: '/images/games/io/snake-2048-io.png', embedUrl: 'https://www.twoplayergames.org/embed/snake-2048-io', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'digit-shooter', title: 'Digit Shooter', description: 'Play Digit Shooter on PixelGamez.', category: 'arcade', tags: ['new'], thumbnail: '/images/games/arcade/digit-shooter.png', embedUrl: 'https://www.twoplayergames.org/embed/digit-shooter', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'jelly-run-2048', title: 'Jelly Run 2048', description: 'Play Jelly Run 2048 on PixelGamez.', category: 'arcade', tags: ['new'], thumbnail: '/images/games/arcade/jelly-run-2048.png', embedUrl: 'https://www.twoplayergames.org/embed/jelly-run-2048', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'bouncing-balls-2', title: 'Bouncing Balls 2', description: 'Play Bouncing Balls 2 on PixelGamez.', category: 'arcade', tags: ['new'], thumbnail: '/images/games/arcade/bouncing-balls-2.png', embedUrl: 'https://www.twoplayergames.org/embed/bouncing-balls-2', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'bouncing-balls', title: 'Bouncing Balls', description: 'Play Bouncing Balls on PixelGamez.', category: 'arcade', tags: ['new'], thumbnail: '/images/games/arcade/bouncing-balls.png', embedUrl: 'https://www.twoplayergames.org/embed/bouncing-balls', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'going-balls', title: 'Going Balls', description: 'Play Going Balls on PixelGamez.', category: 'arcade', tags: ['new'], thumbnail: '/images/games/arcade/going-balls.png', embedUrl: 'https://www.twoplayergames.org/embed/going-balls', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'going-balls-2', title: 'Going Balls 2', description: 'Play Going Balls 2 on PixelGamez.', category: 'arcade', tags: ['new'], thumbnail: '/images/games/arcade/going-balls-2.png', embedUrl: 'https://www.twoplayergames.org/embed/going-balls-2', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'pogo-masters', title: 'Pogo Masters', description: 'Play Pogo Masters on PixelGamez.', category: 'sports', tags: ['new'], thumbnail: '/images/games/sports/pogo-masters.png', embedUrl: 'https://www.twoplayergames.org/embed/pogo-masters', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'flip-master', title: 'Flip Master', description: 'Play Flip Master on PixelGamez.', category: 'sports', tags: ['new'], thumbnail: '/images/games/sports/flip-master.png', embedUrl: 'https://www.twoplayergames.org/embed/flip-master', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'flipper-master-3d', title: 'Flipper Master 3D', description: 'Play Flipper Master 3D on PixelGamez.', category: 'sports', tags: ['new'], thumbnail: '/images/games/sports/flipper-master-3d.png', embedUrl: 'https://www.twoplayergames.org/embed/flipper-master-3d', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'knife-storm', title: 'Knife Storm', description: 'Play Knife Storm on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/knife-storm.png', embedUrl: 'https://www.twoplayergames.org/embed/knife-storm', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'slice-it-all', title: 'Slice It All', description: 'Play Slice It All on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/slice-it-all.png', embedUrl: 'https://www.twoplayergames.org/embed/slice-it-all', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'knife-hit', title: 'Knife Hit', description: 'Play Knife Hit on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/knife-hit.png', embedUrl: 'https://www.twoplayergames.org/embed/knife-hit', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'wood-carving', title: 'Wood Carving', description: 'Play Wood Carving on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/wood-carving.png', embedUrl: 'https://www.twoplayergames.org/embed/wood-carving', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'townscaper', title: 'Townscaper', description: 'Play Townscaper on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/townscaper.png', embedUrl: 'https://www.twoplayergames.org/embed/townscaper', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'elastic-man', title: 'Elastic Man', description: 'Play Elastic Man on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/elastic-man.png', embedUrl: 'https://www.twoplayergames.org/embed/elastic-man', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'blob-bridge-run', title: 'Blob Bridge Run', description: 'Play Blob Bridge Run on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/blob-bridge-run.png', embedUrl: 'https://www.twoplayergames.org/embed/blob-bridge-run', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'blob-opera', title: 'Blob Opera', description: 'Play Blob Opera on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/blob-opera.png', embedUrl: 'https://www.twoplayergames.org/embed/blob-opera', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'blob-tank-wars', title: 'Blob Tank Wars', description: 'Play Blob Tank Wars on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/blob-tank-wars.png', embedUrl: 'https://www.twoplayergames.org/embed/blob-tank-wars', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'summer-rider-3d', title: 'Summer Rider 3D', description: 'Play Summer Rider 3D on PixelGamez.', category: 'sports', tags: ['new'], thumbnail: '/images/games/sports/summer-rider-3d.png', embedUrl: 'https://www.twoplayergames.org/embed/summer-rider-3d', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'duck-duck-clicker', title: 'Duck Duck Clicker', description: 'Play Duck Duck Clicker on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/duck-duck-clicker.png', embedUrl: 'https://www.twoplayergames.org/embed/duck-duck-clicker', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'among-us-online', title: 'Among Us Online', description: 'Play Among Us Online on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/among-us-online.png', embedUrl: 'https://www.twoplayergames.org/embed/among-us-online', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'prison-pump', title: 'Prison Pump', description: 'Play Prison Pump on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/prison-pump.png', embedUrl: 'https://www.twoplayergames.org/embed/prison-pump', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'bitlife-life-simulator', title: 'BitLife Life Simulator', description: 'Play BitLife Life Simulator on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/bitlife-life-simulator.png', embedUrl: 'https://www.twoplayergames.org/embed/bitlife-life-simulator', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'melon-sandbox', title: 'Melon Sandbox', description: 'Play Melon Sandbox on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/melon-sandbox.png', embedUrl: 'https://www.twoplayergames.org/embed/melon-sandbox', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'stickman-dismounting', title: 'Stickman Dismounting', description: 'Play Stickman Dismounting on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/stickman-dismounting.png', embedUrl: 'https://www.twoplayergames.org/embed/stickman-dismounting', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'slow-roads-io', title: 'Slow Roads.io', description: 'Play Slow Roads.io on PixelGamez.', category: 'driving', tags: ['new'], thumbnail: '/images/games/driving/slow-roads-io.png', embedUrl: 'https://www.twoplayergames.org/embed/slow-roads-io', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'mx-offroad-mountain-bike', title: 'MX Offroad Mountain Bike', description: 'Play MX Offroad Mountain Bike on PixelGamez.', category: 'driving', tags: ['new'], thumbnail: '/images/games/driving/mx-offroad-mountain-bike.png', embedUrl: 'https://www.twoplayergames.org/embed/mx-offroad-mountain-bike', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'get-on-top', title: 'Get On Top', description: 'Play Get On Top on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/get-on-top.png', embedUrl: 'https://www.twoplayergames.org/embed/get-on-top', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'slicer-duo', title: 'Slicer Duo', description: 'Play Slicer Duo on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/slicer-duo.png', embedUrl: 'https://www.twoplayergames.org/embed/slicer-duo', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'youtuber-idle', title: 'Youtuber Idle', description: 'Play Youtuber Idle on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/youtuber-idle.png', embedUrl: 'https://www.twoplayergames.org/embed/youtuber-idle', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'idle-money-factory', title: 'Idle Money Factory', description: 'Play Idle Money Factory on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/idle-money-factory.png', embedUrl: 'https://www.twoplayergames.org/embed/idle-money-factory', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'build-your-furniture-store', title: 'Build Your Furniture Store', description: 'Play Build Your Furniture Store on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/build-your-furniture-store.png', embedUrl: 'https://www.twoplayergames.org/embed/build-your-furniture-store', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'food-empire-inc', title: 'Food Empire Inc', description: 'Play Food Empire Inc on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/food-empire-inc.png', embedUrl: 'https://www.twoplayergames.org/embed/food-empire-inc', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'drive-in-cinema-idle-game', title: 'Drive In Cinema Idle Game', description: 'Play Drive In Cinema Idle Game on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/drive-in-cinema-idle-game.png', embedUrl: 'https://www.twoplayergames.org/embed/drive-in-cinema-idle-game', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'cinema-business-idle', title: 'Cinema Business Idle', description: 'Play Cinema Business Idle on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/cinema-business-idle.png', embedUrl: 'https://www.twoplayergames.org/embed/cinema-business-idle', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'candy-clicker', title: 'Candy Clicker', description: 'Play Candy Clicker on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/candy-clicker.png', embedUrl: 'https://www.twoplayergames.org/embed/candy-clicker', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'candy-clicker-2', title: 'Candy Clicker 2', description: 'Play Candy Clicker 2 on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/candy-clicker-2.png', embedUrl: 'https://www.twoplayergames.org/embed/candy-clicker-2', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'cookie-clicker', title: 'Cookie Clicker', description: 'Play Cookie Clicker on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/cookie-clicker.png', embedUrl: 'https://www.twoplayergames.org/embed/cookie-clicker', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'planet-clicker', title: 'Planet Clicker', description: 'Play Planet Clicker on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/planet-clicker.png', embedUrl: 'https://www.twoplayergames.org/embed/planet-clicker', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'fire-and-water', title: 'Fire And Water', description: 'Play Fire And Water on PixelGamez.', category: 'puzzle', tags: ['adventure', 'new'], thumbnail: '/images/games/puzzle/fire-and-water.png', embedUrl: 'https://www.twoplayergames.org/embed/fire-and-water', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'fireboy-and-watergirl-in-the-forest-temple', title: 'Fireboy And Watergirl In The Forest Temple', description: 'Play Fireboy And Watergirl In The Forest Temple on PixelGamez.', category: 'puzzle', tags: ['adventure', 'new'], thumbnail: '/images/games/puzzle/fireboy-and-watergirl-in-the-forest-temple.png', embedUrl: 'https://www.twoplayergames.org/embed/fireboy-and-watergirl-in-the-forest-temple', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'fireboy-and-watergirl-2-in-the-light-temple', title: 'Fireboy And Watergirl 2 In The Light Temple', description: 'Play Fireboy And Watergirl 2 In The Light Temple on PixelGamez.', category: 'puzzle', tags: ['adventure', 'new'], thumbnail: '/images/games/puzzle/fireboy-and-watergirl-2-in-the-light-temple.png', embedUrl: 'https://www.twoplayergames.org/embed/fireboy-and-watergirl-2-in-the-light-temple', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'fireboy-and-watergirl-3-in-the-ice-temple', title: 'Fireboy And Watergirl 3 In The Ice Temple', description: 'Play Fireboy And Watergirl 3 In The Ice Temple on PixelGamez.', category: 'puzzle', tags: ['adventure', 'new'], thumbnail: '/images/games/puzzle/fireboy-and-watergirl-3-in-the-ice-temple.png', embedUrl: 'https://www.twoplayergames.org/embed/fireboy-and-watergirl-3-in-the-ice-temple', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'fireboy-and-watergirl-4-the-crystal-temple', title: 'Fireboy And Watergirl 4 The Crystal Temple', description: 'Play Fireboy And Watergirl 4 The Crystal Temple on PixelGamez.', category: 'puzzle', tags: ['adventure', 'new'], thumbnail: '/images/games/puzzle/fireboy-and-watergirl-4-the-crystal-temple.png', embedUrl: 'https://www.twoplayergames.org/embed/fireboy-and-watergirl-4-the-crystal-temple', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'fireboy-and-watergirl-5-elements', title: 'Fireboy And Watergirl 5 Elements', description: 'Play Fireboy And Watergirl 5 Elements on PixelGamez.', category: 'puzzle', tags: ['adventure', 'new'], thumbnail: '/images/games/puzzle/fireboy-and-watergirl-5-elements.png', embedUrl: 'https://www.twoplayergames.org/embed/fireboy-and-watergirl-5-elements', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'hangman-with-buddies', title: 'Hangman With Buddies', description: 'Play Hangman With Buddies on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/hangman-with-buddies.png', embedUrl: 'https://www.twoplayergames.org/embed/hangman-with-buddies', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'arrow-slide-puzzle', title: 'Arrow Slide Puzzle', description: 'Play Arrow Slide Puzzle on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/arrow-slide-puzzle.png', embedUrl: 'https://www.twoplayergames.org/embed/arrow-slide-puzzle', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'park-me', title: 'Park Me', description: 'Play Park Me on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/park-me.png', embedUrl: 'https://www.twoplayergames.org/embed/park-me', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'unroll-ball-slide', title: 'Unroll Ball Slide', description: 'Play Unroll Ball Slide on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/unroll-ball-slide.png', embedUrl: 'https://www.twoplayergames.org/embed/unroll-ball-slide', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'hexa-puzzle', title: 'Hexa Puzzle', description: 'Play Hexa Puzzle on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/hexa-puzzle.png', embedUrl: 'https://www.twoplayergames.org/embed/hexa-puzzle', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'color-sand-puzzle', title: 'Color Sand Puzzle', description: 'Play Color Sand Puzzle on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/color-sand-puzzle.png', embedUrl: 'https://www.twoplayergames.org/embed/color-sand-puzzle', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'bubble-shooter', title: 'Bubble Shooter', description: 'Play Bubble Shooter on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/bubble-shooter.png', embedUrl: 'https://www.twoplayergames.org/embed/bubble-shooter', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'bubble-shooter-2', title: 'Bubble Shooter 2', description: 'Play Bubble Shooter 2 on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/bubble-shooter-2.png', embedUrl: 'https://www.twoplayergames.org/embed/bubble-shooter-2', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'territory-war', title: 'Territory War', description: 'Play Territory War on PixelGamez.', category: 'shooting', tags: ['new'], thumbnail: '/images/games/shooting/territory-war.png', embedUrl: 'https://www.twoplayergames.org/embed/territory-war', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'territory-war-2', title: 'Territory War 2', description: 'Play Territory War 2 on PixelGamez.', category: 'shooting', tags: ['new'], thumbnail: '/images/games/shooting/territory-war-2.png', embedUrl: 'https://www.twoplayergames.org/embed/territory-war-2', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'territory-war-3', title: 'Territory War 3', description: 'Play Territory War 3 on PixelGamez.', category: 'shooting', tags: ['new'], thumbnail: '/images/games/shooting/territory-war-3.png', embedUrl: 'https://www.twoplayergames.org/embed/territory-war-3', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'gun-mayhem-redux', title: 'Gun Mayhem Redux', description: 'Play Gun Mayhem Redux on PixelGamez.', category: 'shooting', tags: ['new'], thumbnail: '/images/games/shooting/gun-mayhem-redux.png', embedUrl: 'https://www.twoplayergames.org/embed/gun-mayhem-redux', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'fortz', title: 'Fortz', description: 'Play Fortz on PixelGamez.', category: 'shooting', tags: ['new'], thumbnail: '/images/games/shooting/fortz.png', embedUrl: 'https://www.twoplayergames.org/embed/fortz', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'gangsters', title: 'Gangsters', description: 'Play Gangsters on PixelGamez.', category: 'shooting', tags: ['new'], thumbnail: '/images/games/shooting/gangsters.png', embedUrl: 'https://www.twoplayergames.org/embed/gangsters', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'click-click-clicker', title: 'Click Click Clicker', description: 'Play Click Click Clicker on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/click-click-clicker.png', embedUrl: 'https://www.twoplayergames.org/embed/click-click-clicker', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'fun-clicker', title: 'Fun Clicker', description: 'Play Fun Clicker on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/fun-clicker.png', embedUrl: 'https://www.twoplayergames.org/embed/fun-clicker', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'scritchy-scratchy', title: 'Scritchy Scratchy', description: 'Play Scritchy Scratchy on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/scritchy-scratchy.png', embedUrl: 'https://www.twoplayergames.org/embed/scritchy-scratchy', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'minibattles-2-6-players', title: 'Minibattles 2 6 Players', description: 'Play Minibattles 2 6 Players on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/minibattles-2-6-players.png', embedUrl: 'https://www.twoplayergames.org/embed/minibattles-2-6-players', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'mechastick-fighter', title: 'Mechastick Fighter', description: 'Play Mechastick Fighter on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/mechastick-fighter.png', embedUrl: 'https://www.twoplayergames.org/embed/mechastick-fighter', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'tank-stars', title: 'Tank Stars', description: 'Play Tank Stars on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/tank-stars.png', embedUrl: 'https://www.twoplayergames.org/embed/tank-stars', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'operation-desert-road', title: 'Operation Desert Road', description: 'Play Operation Desert Road on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/operation-desert-road.png', embedUrl: 'https://www.twoplayergames.org/embed/operation-desert-road', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'grand-extreme-racing', title: 'Grand Extreme Racing', description: 'Play Grand Extreme Racing on PixelGamez.', category: 'driving', tags: ['new'], thumbnail: '/images/games/driving/grand-extreme-racing.png', embedUrl: 'https://www.twoplayergames.org/embed/grand-extreme-racing', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'ultimate-flying-car', title: 'Ultimate Flying Car', description: 'Play Ultimate Flying Car on PixelGamez.', category: 'driving', tags: ['new'], thumbnail: '/images/games/driving/ultimate-flying-car.png', embedUrl: 'https://www.twoplayergames.org/embed/ultimate-flying-car', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'night-city-racing', title: 'Night City Racing', description: 'Play Night City Racing on PixelGamez.', category: 'driving', tags: ['new'], thumbnail: '/images/games/driving/night-city-racing.png', embedUrl: 'https://www.twoplayergames.org/embed/night-city-racing', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'hexanaut-io', title: 'Hexanaut Io', description: 'Play Hexanaut Io on PixelGamez.', category: 'io', tags: ['new'], thumbnail: '/images/games/io/hexanaut-io.png', embedUrl: 'https://hexanaut.io/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'tileman-io', title: 'Tileman Io', description: 'Play Tileman Io on PixelGamez.', category: 'io', tags: ['new'], thumbnail: '/images/games/io/tileman-io.png', embedUrl: 'https://tileman.io/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'skribbl-io', title: 'Skribbl Io', description: 'Play Skribbl Io on PixelGamez.', category: 'io', tags: ['new'], thumbnail: '/images/games/io/skribbl-io.png', embedUrl: 'https://skribbl.io/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'copter-io', title: 'Copter Io', description: 'Play Copter Io on PixelGamez.', category: 'io', tags: ['new'], thumbnail: '/images/games/io/copter-io.png', embedUrl: 'https://www.copter.io/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'dashcraft-io', title: 'Dashcraft Io', description: 'Play Dashcraft Io on PixelGamez.', category: 'io', tags: ['driving', 'new'], thumbnail: '/images/games/io/dashcraft-io.png', embedUrl: 'https://dashcraft.io/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'lolbeans-io', title: 'Lolbeans Io', description: 'Play Lolbeans Io on PixelGamez.', category: 'io', tags: ['new'], thumbnail: '/images/games/io/lolbeans-io.png', embedUrl: 'https://lolbeans.io/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'pikto-fun', title: 'Pikto Fun', description: 'Play Pikto Fun on PixelGamez.', category: 'io', tags: ['new'], thumbnail: '/images/games/io/pikto-fun.png', embedUrl: 'https://pikto.fun/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'smashkarts-io', title: 'Smashkarts Io', description: 'Play Smashkarts Io on PixelGamez.', category: 'io', tags: ['new'], thumbnail: '/images/games/io/smashkarts-io.png', embedUrl: 'https://smashkarts.io/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: 'conq-io', title: 'Conq Io', description: 'Play Conq Io on PixelGamez.', category: 'io', tags: ['new'], thumbnail: '/images/games/io/conq-io.png', embedUrl: 'https://www.conq.io/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
    { id: '2v2-io', title: '2v2 Io', description: 'Play 2v2 Io on PixelGamez.', category: 'io', tags: ['new'], thumbnail: '/images/games/io/2v2-io.png', embedUrl: 'https://2v2.io/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
];
exports.games.forEach(g => {
    if (!g.thumbnail) {
        g.thumbnail = makeThumbnail(g.title, g.category);
    }
});
function getAllGames() {
    return exports.games;
}
function getGameById(id) {
    return exports.games.find(g => g.id === id);
}
function getGamesByCategory(categoryId) {
    return exports.games.filter(g => g.category === categoryId);
}
function getFeaturedGames() {
    return exports.games.filter(g => g.tags.includes('featured'));
}
function getPopularGames(playsMap) {
    const list = [...exports.games];
    if (playsMap) {
        return list.sort((a, b) => { var _a, _b; return ((_a = playsMap[b.id]) !== null && _a !== void 0 ? _a : b.plays) - ((_b = playsMap[a.id]) !== null && _b !== void 0 ? _b : a.plays); });
    }
    return list.sort((a, b) => b.plays - a.plays);
}
function getNewGames() {
    const tenDaysMs = 10 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    return exports.games.filter(g => {
        if (!g.createdAt)
            return false;
        const addedAt = new Date(g.createdAt).getTime();
        return now - addedAt <= tenDaysMs;
    });
}
function getTrendingGames(playsMap) {
    return exports.games.filter(g => g.tags.includes('trending')).sort((a, b) => {
        var _a, _b;
        const aPlays = (_a = playsMap === null || playsMap === void 0 ? void 0 : playsMap[a.id]) !== null && _a !== void 0 ? _a : a.plays;
        const bPlays = (_b = playsMap === null || playsMap === void 0 ? void 0 : playsMap[b.id]) !== null && _b !== void 0 ? _b : b.plays;
        return bPlays - aPlays;
    });
}
function getUpAndComingGames(playsMap) {
    const now = Date.now();
    return [...exports.games].sort((a, b) => {
        var _a, _b;
        const aPlays = (_a = playsMap === null || playsMap === void 0 ? void 0 : playsMap[a.id]) !== null && _a !== void 0 ? _a : a.plays;
        const bPlays = (_b = playsMap === null || playsMap === void 0 ? void 0 : playsMap[b.id]) !== null && _b !== void 0 ? _b : b.plays;
        const aDays = a.createdAt ? Math.max(1, (now - new Date(a.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 30;
        const bDays = b.createdAt ? Math.max(1, (now - new Date(b.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 30;
        const aVelocity = aPlays / aDays;
        const bVelocity = bPlays / bDays;
        return bVelocity - aVelocity;
    });
}
function getMostVisitedGames(playsMap) {
    const list = [...exports.games];
    if (playsMap) {
        return list.sort((a, b) => { var _a, _b; return ((_a = playsMap[b.id]) !== null && _a !== void 0 ? _a : b.plays) - ((_b = playsMap[a.id]) !== null && _b !== void 0 ? _b : a.plays); });
    }
    return list.sort((a, b) => b.plays - a.plays);
}
function getRecommendedGames() {
    return exports.games.filter(g => g.rating >= 4.5).sort((a, b) => {
        if (b.rating === a.rating)
            return b.plays - a.plays;
        return b.rating - a.rating;
    });
}
function searchGames(query) {
    const q = query.toLowerCase().trim();
    if (!q)
        return [];
    return exports.games.filter(g => g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.tags.some(t => t.toLowerCase().includes(q)));
}
function getRelatedGames(gameId, limit = 6) {
    const game = getGameById(gameId);
    if (!game)
        return [];
    return exports.games
        .filter(g => g.id !== gameId && g.category === game.category)
        .slice(0, limit);
}
function getCategoryById(id) {
    return exports.categories.find(c => c.id === id);
}
function getGameCountByCategory(categoryId) {
    return exports.games.filter(g => g.category === categoryId).length;
}
function formatPlays(plays) {
    if (plays >= 1000000)
        return `${(plays / 1000000).toFixed(1)}M`;
    if (plays >= 1000)
        return `${(plays / 1000).toFixed(0)}K`;
    return plays.toString();
}
