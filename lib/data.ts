export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: string;
  embedUrl: string;
  rating: number;
  plays: number;
  discordUrl?: string;
  originalUrl?: string;
  developerLink?: string;
  developerName?: string;
  steamUrl?: string;
  downloadUrl?: string;
}

export interface Submission {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  embedUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  plays: number;
  rating: number;
  tags: string[];
  discordUrl?: string;
  originalUrl?: string;
  developerLink?: string;
  developerName?: string;
  steamUrl?: string;
}

export const categories: Category[] = [
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
  { id: 'strategy', name: 'Strategy', icon: 'strategy' },
];


const categoryColors: Record<string, { bg: string; fg: string }> = {
  action:     { bg: 'DC2626', fg: 'FECACA' },
  adventure:  { bg: '7C3AED', fg: 'DDD6FE' },
  arcade:     { bg: '2563EB', fg: 'BFDBFE' },
  board:      { bg: '92400E', fg: 'FDE68A' },
  card:       { bg: '065F46', fg: 'A7F3D0' },
  clicker:    { bg: 'DB2777', fg: 'FBCFE8' },
  driving:    { bg: 'EA580C', fg: 'FED7AA' },
  io:         { bg: '0891B2', fg: 'CFFAFE' },
  puzzle:     { bg: '4F46E5', fg: 'C7D2FE' },
  shooting:   { bg: '991B1B', fg: 'FECACA' },
  simulation: { bg: '15803D', fg: 'BBF7D0' },
  sports:     { bg: '1D4ED8', fg: 'BFDBFE' },
  strategy:   { bg: '6D28D9', fg: 'DDD6FE' },
};

function makeThumbnail(title: string, category: string): string {
  const colors = categoryColors[category] || { bg: '1A1B28', fg: 'A78BFA' };
  return `https://placehold.co/400x225/${colors.bg}/${colors.fg}?text=${encodeURIComponent(title)}&font=raleway`;
}

const EMBED_BASE = '/placeholder.html';

function makeEmbed(seed: string): string {
  return `${EMBED_BASE}?seed=${seed}`;
}




export const games: Game[] = [
  { id: 'house-of-hazards', title: 'House of Hazards', description: 'Try to survive the House of Hazards! Watch out for traps set by your friends in this hilarious party game.', category: 'action', tags: ['new', 'popular'], thumbnail: '/images/house-of-hazards.png', embedUrl: 'https://unblockedgames66.gitlab.io/house-of-hazards/', rating: 4.8, plays: 450000 },
  { id: 'basket-random', title: 'Basket Random', description: 'A fun, chaotic, and completely random physics-based basketball game!', category: 'sports', tags: ['new', 'popular'], thumbnail: '/images/basket-random.png', embedUrl: 'https://unblockedgames66.gitlab.io/basket-random/', rating: 4.6, plays: 320000 },
  { id: 'boxing-random', title: 'Boxing Random', description: 'A fun, chaotic, and completely random physics-based boxing game.', category: 'sports', tags: ['new', 'popular', 'action'], thumbnail: '/images/boxing-random.png', embedUrl: 'https://unblockedgames66.gitlab.io/boxing-random/', rating: 4.4, plays: 250000 },
  { id: 'basketball-legends', title: 'Basketball Legends', description: 'A fun, chaotic, and completely random physics-based basketball game.', category: 'sports', tags: ['new', 'popular', 'action'], thumbnail: '/images/basketball-legends.png', embedUrl: 'https://unblockedgames66.gitlab.io/basketball-legends/', rating: 4.4, plays: 250000 },
  { id: 'soccer-random', title: 'Soccer Random', description: 'Experience soccer like never before in this completely unpredictable, physics-based soccer game!', category: 'sports', tags: ['new', 'popular', 'action'], thumbnail: '/images/soccer-random.png', embedUrl: 'https://unblockedgames66.gitlab.io/soccer-random/', rating: 4.5, plays: 210000 },
  { id: 'rooftop-snipers', title: 'Rooftop Snipers', description: 'A chaotic two-button sniper game. Try to shoot your opponent off the roof!', category: 'shooting', tags: ['popular', 'action'], thumbnail: '/images/rooftop-snipers.png', embedUrl: 'https://unblockedgames66.gitlab.io/rooftop-snipers/', rating: 4.7, plays: 500000 },
  { id: 'rooftop-snipers-2', title: 'Rooftop Snipers 2', description: 'The sequel to the classic! More chaos, more weapons, more fun!', category: 'shooting', tags: ['new', 'action'], thumbnail: '/images/rooftop-snipers-2.png', embedUrl: 'https://unblockedgames66.gitlab.io/rooftop-snipers-2/', rating: 4.6, plays: 180000 },
  { id: 'volley-random', title: 'Volley Random', description: 'Physics-based volleyball madness. Expect the unexpected in every serve!', category: 'sports', tags: ['new', 'popular'], thumbnail: '/images/volley-random.png', embedUrl: 'https://unblockedgames66.gitlab.io/volley-random/', rating: 4.5, plays: 195000 },
  { id: 'raft-wars-2', title: 'Raft Wars 2', description: 'Infiltrate the water park and find your buried treasure in this hilarious sequel!', category: 'shooting', tags: ['action', 'popular'], thumbnail: '/images/raft-wars-2.png', embedUrl: 'https://unblockedgames66.gitlab.io/raft-wars-2/', rating: 4.7, plays: 420000 },
  { id: 'boxing-physics-2', title: 'Boxing Physics 2', description: 'Experience the craziest boxing matches with bizarre physics and characters.', category: 'sports', tags: ['action', 'new'], thumbnail: '/images/boxing-physics-2.png', embedUrl: 'https://unblockedgames66.gitlab.io/boxing-physics-2/', rating: 4.3, plays: 115000 },
  { id: 'royale-dudes', title: 'Royale Dudes', description: 'A fast-paced 2D multiplayer battle royale game. Loot, shoot, and survive!', category: 'io', tags: ['action', 'popular', 'new'], thumbnail: '/images/royale-dudes.png', embedUrl: 'https://unblockedgames66.gitlab.io/royale-dudes/', rating: 4.6, plays: 890000 },
  { id: 'moto-x3m-3-pool-party', title: 'Moto X3M Pool Party', description: 'Take your dirt bike to the pool party! Perform stunts and avoid deadly traps.', category: 'driving', tags: ['action', 'popular'], thumbnail: '/images/moto3xm-pool-party.png', embedUrl: 'https://unblockedgames66.gitlab.io/moto-x3m-3-pool-party/', rating: 4.8, plays: 1200000 },
  { id: 'moto-x3m-6-spooky-land', title: 'Moto X3M Spooky Land', description: 'A terrifyingly fun dirt bike experience through a haunted landscape!', category: 'driving', tags: ['action', 'popular'], thumbnail: '/images/moto-x3m-spooky-land.png', embedUrl: 'https://unblockedgames66.gitlab.io/moto-x3m-6-spooky-land/', rating: 4.8, plays: 950000 },
  { id: 'moto-x3m-two', title: 'Moto X3M 2', description: 'The second installment of the legendary dirt bike racing series.', category: 'driving', tags: ['action'], thumbnail: '/images/moto-x3m-two.png', embedUrl: 'https://unblockedgames66.gitlab.io/moto-x3m-two/', rating: 4.7, plays: 600000 },
  { id: 'moto-x3m-4-winter', title: 'Moto X3M 4 Winter', description: 'Race your bike across icy mountains and festive tracks in this winter edition!', category: 'driving', tags: ['action', 'popular'], thumbnail: '/images/moto-x3m4-winter.png', embedUrl: 'https://unblockedgames66.gitlab.io/moto-x3m4-winter/', rating: 4.8, plays: 1050000 },
  { id: 'gartic-phone-io', title: 'Gartic Phone', description: 'The telephone game meets drawing! Hilarious fun with friends.', category: 'io', tags: ['popular', 'new'], thumbnail: '/images/gartic-phone-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/gartic-phone-io/', rating: 4.9, plays: 2500000 },
  { id: 'crossy-road', title: 'Crossy Road', description: 'Why did the chicken cross the road? Find out in this classic endless hopper!', category: 'arcade', tags: ['popular'], thumbnail: '/images/crossy-road.png', embedUrl: 'https://unblockedgames66.gitlab.io/crossy-road/', rating: 4.6, plays: 1200000 },
  { id: 'bob-the-robber-2', title: 'Bob The Robber 2', description: 'Sneak past guards and cameras to steal the loot!', category: 'puzzle', tags: ['popular'], thumbnail: '/images/bob-the-robber-2.png', embedUrl: 'https://unblockedgames66.gitlab.io/bob-the-robber-2/', rating: 4.5, plays: 800000 },
  { id: 'drive-mad', title: 'Drive Mad', description: 'Physics-based driving game where you must reach the finish line in one piece.', category: 'driving', tags: ['popular'], thumbnail: '/images/drive-mad.png', embedUrl: 'https://unblockedgames66.gitlab.io/drive-mad/', rating: 4.7, plays: 950000 },
  { id: 'pixel-smash-duel', title: 'Pixel Smash Duel', description: 'Intense pixelated duels. Knock your opponent off the platform!', category: 'action', tags: ['action'], thumbnail: '/images/pixel-smash-duel.png', embedUrl: 'https://unblockedgames66.gitlab.io/pixel-smash-duel/', rating: 4.4, plays: 150000 },
  { id: 'aquapark-io', title: 'Aquapark.io', description: 'Race down the massive water slide and knock others off!', category: 'io', tags: ['popular', 'action'], thumbnail: '/images/aquapark-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/aquapark-io/', rating: 4.5, plays: 2200000 },
  { id: 'hole-io', title: 'Hole.io', description: 'Consume everything in your path and become the biggest black hole!', category: 'io', tags: ['popular', 'action'], thumbnail: '/images/hole-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/hole-io/', rating: 4.7, plays: 3100000 },
  { id: 'idle-mining-empire', title: 'Idle Mining Empire', description: 'Manage your mining facilities and become an industrial tycoon.', category: 'clicker', tags: ['popular'], thumbnail: '/images/idle-mining-empire.png', embedUrl: 'https://unblockedgames66.gitlab.io/idle-mining-empire/', rating: 4.4, plays: 400000 },
  { id: 'idle-breakout', title: 'Idle Breakout', description: 'Breakout meets idle clicking. Upgrade your balls to destroy blocks faster.', category: 'clicker', tags: ['popular'], thumbnail: '/images/idle-breakout.png', embedUrl: 'https://unblockedgames66.gitlab.io/idle-breakout/', rating: 4.6, plays: 1200000 },
  { id: 'burger-clicker', title: 'Burger Clicker', description: 'Click to make burgers and build your fast food empire!', category: 'clicker', tags: [], thumbnail: '/images/burger-clicker.png', embedUrl: 'https://unblockedgames66.gitlab.io/burger-clicker/', rating: 4.2, plays: 300000 },
  { id: 'idle-restaurants', title: 'Idle Restaurants', description: 'Manage and upgrade your restaurant business.', category: 'clicker', tags: [], thumbnail: '/images/idle-restaurants.png', embedUrl: 'https://unblockedgames66.gitlab.io/idle-restaurants/', rating: 4.3, plays: 250000 },
  { id: 'flip-bottle', title: 'Flip Bottle', description: 'Can you master the bottle flip challenge?', category: 'arcade', tags: ['popular'], thumbnail: '/images/flip-bottle.png', embedUrl: 'https://unblockedgames66.gitlab.io/flip-bottle/', rating: 4.1, plays: 600000 },
  { id: 'baldis-basics', title: 'Baldi\'s Basics', description: 'A surreal horror educational game. Collect 7 notebooks and escape!', category: 'adventure', tags: ['popular', 'action'], thumbnail: '/images/baldis-basics.png', embedUrl: 'https://unblockedgames66.gitlab.io/baldis-basics/', rating: 4.6, plays: 1800000 },
  { id: 'granny', title: 'Granny', description: 'Escape the house before Granny catches you!', category: 'adventure', tags: ['popular', 'action'], thumbnail: '/images/granny.png', embedUrl: 'https://granny-games.com/', rating: 4.7, plays: 2100000 },
  { id: 'happy-wheels', title: 'Happy Wheels', description: 'A ragdoll physics-based platformer. Dodge deadly obstacles!', category: 'action', tags: ['popular'], thumbnail: '/images/happy-wheels.png', embedUrl: 'https://unblockedgames66.gitlab.io/happy-wheels/', rating: 4.8, plays: 4500000 },
  { id: 'sausage-flip', title: 'Sausage Flip', description: 'Fling the sausage to the finish line in this weirdly fun physics game.', category: 'arcade', tags: [], thumbnail: '/images/sausage-flip.png', embedUrl: 'https://unblockedgames66.gitlab.io/sausage-flip/', rating: 4.3, plays: 200000 },
  { id: 'slope-2-players', title: 'Slope 2 Players', description: 'Roll down the endless slope and compete with a friend!', category: 'arcade', tags: ['popular'], thumbnail: '/images/slope-2-players.png', embedUrl: 'https://unblockedgames66.gitlab.io/slope-2-players/', rating: 4.5, plays: 1500000 },
  { id: 'stack-bump-3d', title: 'Stack Bump 3D', description: 'Smash through the helix platforms and reach the bottom.', category: 'arcade', tags: [], thumbnail: '/images/stack-bump-3d.png', embedUrl: 'https://unblockedgames66.gitlab.io/stack-bump-3d/', rating: 4.2, plays: 400000 },
  { id: 'snake-io', title: 'Snake.io', description: 'Slither your way to the top in this competitive multiplayer snake game.', category: 'io', tags: ['popular'], thumbnail: '/images/snake-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/snake-io/', rating: 4.6, plays: 2800000 },
  { id: 'smash-karts-io', title: 'Smash Karts', description: 'Multiplayer kart battle arena! Collect weapons and blow up your opponents.', category: 'io', tags: ['popular', 'action', 'driving'], thumbnail: '/images/smash-karts-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/smash-karts-io/', rating: 4.8, plays: 1700000 },
  { id: 'getaway-shootout', title: 'Getaway Shootout', description: 'Race to the getaway vehicle while jumping and shooting your rivals.', category: 'arcade', tags: ['popular'], thumbnail: '/images/getaway-shootout.png', embedUrl: 'https://unblockedgames66.gitlab.io/getaway-shootout/', rating: 4.7, plays: 850000 },
  { id: 'drift-boss', title: 'Drift Boss', description: 'Timing is everything! Drift around tight corners to survive.', category: 'driving', tags: ['popular'], thumbnail: '/images/drift-boss.png', embedUrl: 'https://unblockedgames66.gitlab.io/drift-boss/', rating: 4.4, plays: 900000 },
  { id: 'johny-revenge', title: 'Johnny Revenge', description: 'Flip, shoot, and take down the bad guys in slow motion.', category: 'shooting', tags: ['action'], thumbnail: '/images/johny-revenge.png', embedUrl: 'https://unblockedgames66.gitlab.io/johny-revenge/', rating: 4.5, plays: 300000 },
  { id: 'johny-trigger', title: 'Johnny Trigger', description: 'More slow-motion shooting action as you clear out rooms of enemies.', category: 'shooting', tags: ['action', 'popular'], thumbnail: '/images/johny-trigger.png', embedUrl: 'https://unblockedgames66.gitlab.io/johny-trigger/', rating: 4.6, plays: 1100000 },
  { id: 'stickman-hook', title: 'Stickman Hook', description: 'Swing like Spider-Man through hundreds of challenging levels.', category: 'action', tags: ['popular'], thumbnail: '/images/stickman-hook.png', embedUrl: 'https://unblockedgames66.gitlab.io/stickman-hook/', rating: 4.8, plays: 3200000 },
  { id: 'getting-over-it', title: 'Getting Over It', description: 'A punishing climbing game. Can you reach the top without losing your mind?', category: 'adventure', tags: ['popular', 'action'], thumbnail: '/images/getting-over-it.png', embedUrl: 'https://unblockedgames66.gitlab.io/getting-over-it/', rating: 4.7, plays: 5000000 },
  { id: 'bloxd-io', title: 'Bloxd.io', description: 'A adventure game.', category: 'adventure', tags: ['popular', 'action'], thumbnail: '/images/bloxd-io.png', embedUrl: 'https://bloxd.io', rating: 4.7, plays: 5000000 },

  { id: 'snow-rider-3d', title: 'Snow Rider 3D', description: 'Ride your snow sled through icy slopes and endless obstacles.', category: 'sports', tags: ['new'], thumbnail: '/images/snow-rider-3d.png', embedUrl: 'https://snowrider.com/game/', developerLink: 'https://snowrider.com/game/', rating: 4.3, plays: 13000 },
  { id: 'pixel-gun-3d', title: 'Pixel Gun 3D', description: 'A fun multiplayer blocky shooter game.', category: 'shooting', tags: ['new', 'popular', 'featured'], thumbnail: '/images/pixel-gun-3d.png', embedUrl: 'https://pixelgun3d.com/', developerLink: 'https://pixelgun3d.com/', rating: 4.8, plays: 45000 },
  { id: 'retro-bowl', title: 'Retro Bowl', description: 'American football management game', category: 'sports', tags: ['new'], thumbnail: '/images/retro-bowl.png', embedUrl: 'https://retrobowlgame.org/retro-bowl.embed', rating: 4.5, plays:  0 },
{
    id: 'papas-pizzeria',
    title: "Papa's Pizzeria",
    description: "Run your own restaurant in Papa's Pizzeria and serve delicious food to your customers!",
    category: 'simulation',
    tags: ['simulation', 'casual'],
    thumbnail: '/images/papas-pizzeria.png',
    embedUrl: 'https://papaspizzeria.io/papas-pizzeria.embed',
    rating: 4.8,
    plays: 0
  },
  {
    id: 'papas-scooperia',
    title: "Papa's Scooperia",
    description: "Run your own restaurant in Papa's Scooperia and serve delicious food to your customers!",
    category: 'simulation',
    tags: ['simulation', 'casual'],
    thumbnail: '/images/papas-scooperia.png',
    embedUrl: 'https://papaspizzeria.io/papas-scooperia.embed',
    rating: 4.8,
    plays: 0
  },
  {
    id: 'papas-sushiria',
    title: "Papa's Sushiria",
    description: "Run your own restaurant in Papa's Sushiria and serve delicious food to your customers!",
    category: 'simulation',
    tags: ['simulation', 'casual'],
    thumbnail: '/images/papas-sushiria.png',
    embedUrl: 'https://papaspizzeria.io/papas-sushiria.embed',
    rating: 4.8,
    plays: 0
  },
  {
    id: 'papas-cheeseria',
    title: "Papa's Cheeseria",
    description: "Run your own restaurant in Papa's Cheeseria and serve delicious food to your customers!",
    category: 'simulation',
    tags: ['simulation', 'casual'],
    thumbnail: '/images/papas-cheeseria.png',
    embedUrl: 'https://papaspizzeria.io/papas-cheeseria.embed',
    rating: 4.8,
    plays: 0
  },
  {
    id: 'papas-wingeria',
    title: "Papa's Wingeria",
    description: "Run your own restaurant in Papa's Wingeria and serve delicious food to your customers!",
    category: 'simulation',
    tags: ['simulation', 'casual'],
    thumbnail: '/images/papas-wingeria.png',
    embedUrl: 'https://papaspizzeria.io/papas-wingeria.embed',
    rating: 4.8,
    plays: 0
  },
  {
    id: 'papas-cupcakeria',
    title: "Papa's Cupcakeria",
    description: "Run your own restaurant in Papa's Cupcakeria and serve delicious food to your customers!",
    category: 'simulation',
    tags: ['simulation', 'casual'],
    thumbnail: '/images/papas-cupcakeria.png',
    embedUrl: 'https://papaspizzeria.io/papas-cupcakeria.embed',
    rating: 4.8,
    plays: 0
  },
  {
    id: 'papas-pancakeria',
    title: "Papa's Pancakeria",
    description: "Run your own restaurant in Papa's Pancakeria and serve delicious food to your customers!",
    category: 'simulation',
    tags: ['simulation', 'casual'],
    thumbnail: '/images/papas-pancakeria.png',
    embedUrl: 'https://papaspizzeria.io/papas-pancakeria.embed',
    rating: 4.8,
    plays: 0
  },
  {
    id: 'papas-freezeria',
    title: "Papa's Freezeria",
    description: "Run your own restaurant in Papa's Freezeria and serve delicious food to your customers!",
    category: 'simulation',
    tags: ['simulation', 'casual'],
    thumbnail: '/images/papas-freezeria.png',
    embedUrl: 'https://papaspizzeria.io/papas-freezeria.embed',
    rating: 4.8,
    plays: 0
  },
  {
    id: 'papas-donuteria',
    title: "Papa's Donuteria",
    description: "Run your own restaurant in Papa's Donuteria and serve delicious food to your customers!",
    category: 'simulation',
    tags: ['simulation', 'casual'],
    thumbnail: '/images/papas-donuteria.png',
    embedUrl: 'https://papaspizzeria.io/papas-donuteria.embed',
    rating: 4.8,
    plays: 0
  },
  {
    id: 'papas-pastaria',
    title: "Papa's Pastaria",
    description: "Run your own restaurant in Papa's Pastaria and serve delicious food to your customers!",
    category: 'simulation',
    tags: ['simulation', 'casual'],
    thumbnail: '/images/papas-pastaria.png',
    embedUrl: 'https://papaspizzeria.io/papas-pastaria.embed',
    rating: 4.8,
    plays: 0
  },
  {
    id: 'papas-burgeria',
    title: "Papa's Burgeria",
    description: "Run your own restaurant in Papa's Burgeria and serve delicious food to your customers!",
    category: 'simulation',
    tags: ['simulation', 'casual'],
    thumbnail: '/images/papas-burgeria.png',
    embedUrl: 'https://papaspizzeria.io/papas-burgeria.embed',
    rating: 4.8,
    plays: 0
  },
  {
    id: 'papas-hot-doggeria',
    title: "Papa's Hot Doggeria",
    description: "Run your own restaurant in Papa's Hot Doggeria and serve delicious food to your customers!",
    category: 'simulation',
    tags: ['simulation', 'casual'],
    thumbnail: '/images/papas-hot-doggeria.png',
    embedUrl: 'https://papaspizzeria.io/papas-hot-doggeria.embed',
    rating: 4.8,
    plays: 0
  },
  {
    id: 'papas-bakeria',
    title: "Papa's Bakeria",
    description: "Run your own restaurant in Papa's Bakeria and serve delicious food to your customers!",
    category: 'simulation',
    tags: ['simulation', 'casual'],
    thumbnail: '/images/papas-bakeria.png',
    embedUrl: 'https://papaspizzeria.io/papas-bakeria.embed',
    rating: 4.8,
    plays: 0
  },
  {
    id: 'level-devil',
    title: 'Level Devil',
    description: 'Level Devil is a challenging puzzle platformer with unexpected traps.',
    category: 'puzzle',
    tags: ['platformer', 'hard', 'funny'],
    thumbnail: '/images/level-devil.png',
    embedUrl: 'https://leveldevil-trollgame.github.io/',
    rating: 4.8,
    plays: 3500
  },
  {
    id: 'worldguessr',
    title: 'Worldguessr',
    description: 'Explore the world and guess your location in this free alternative to Geoguessr.',
    category: 'puzzle',
    tags: ['exploration', 'geography', 'multiplayer'],
    thumbnail: '/images/worldguessr.png',
    embedUrl: 'https://www.worldguessr.com/',
    rating: 4.9,
    plays: 5000
  },
];

games.forEach(g => {
  if (!g.thumbnail) {
    g.thumbnail = makeThumbnail(g.title, g.category);
  }
});

export function getAllGames(): Game[] {
  return games;
}

export function getGameById(id: string): Game | undefined {
  return games.find(g => g.id === id);
}

export function getGamesByCategory(categoryId: string): Game[] {
  return games.filter(g => g.category === categoryId);
}

export function getFeaturedGames(): Game[] {
  return games.filter(g => g.tags.includes('featured'));
}

export function getPopularGames(): Game[] {
  return games.filter(g => g.tags.includes('popular'));
}

export function getNewGames(): Game[] {
  return games.filter(g => g.tags.includes('new'));
}

export function getTrendingGames(): Game[] {

  return [...games].sort((a, b) => (b.plays * b.rating) - (a.plays * a.rating));
}

export function getUpAndComingGames(): Game[] {

  return games.filter(g => g.tags.includes('new')).sort((a, b) => b.rating - a.rating);
}

export function getMostVisitedGames(): Game[] {

  return [...games].sort((a, b) => b.plays - a.plays);
}

export function getRecommendedGames(): Game[] {

  return games.filter(g => g.rating >= 4.5).sort((a, b) => {
    if (b.rating === a.rating) return b.plays - a.plays;
    return b.rating - a.rating;
  });
}

export function searchGames(query: string): Game[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return games.filter(g =>
    g.title.toLowerCase().includes(q) ||
    g.description.toLowerCase().includes(q) ||
    g.category.toLowerCase().includes(q) ||
    g.tags.some(t => t.toLowerCase().includes(q))
  );
}

export function getRelatedGames(gameId: string, limit: number = 6): Game[] {
  const game = getGameById(gameId);
  if (!game) return [];
  return games
    .filter(g => g.id !== gameId && g.category === game.category)
    .slice(0, limit);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getGameCountByCategory(categoryId: string): number {
  return games.filter(g => g.category === categoryId).length;
}

export function formatPlays(plays: number): string {
  if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
  if (plays >= 1000) return `${(plays / 1000).toFixed(0)}K`;
  return plays.toString();
}
