import { Game } from '@/types';

export const games: Game[] = [
  {
    id: '1',
    slug: 'shadow-realm',
    title: 'Shadow Realm',
    description: 'A dark fantasy adventure through mysterious realms filled with ancient secrets.',
    fullDescription: 'Shadow Realm is an immersive dark fantasy adventure that takes players on an epic journey through mysterious dimensions. Uncover ancient secrets, battle formidable foes, and discover the truth behind the realm\'s dark history. With stunning visuals and engaging gameplay mechanics, Shadow Realm offers an unforgettable gaming experience.',
    genre: ['Adventure', 'RPG', 'Dark Fantasy'],
    platforms: ['PC', 'PlayStation', 'Xbox'],
    releaseDate: '2025-Q3',
    thumbnail: '/images/shadow-realm-thumb.jpg',
    screenshots: [
      '/images/shadow-realm-1.jpg',
      '/images/shadow-realm-2.jpg',
      '/images/shadow-realm-3.jpg',
    ],
    storeLinks: {
      steam: '#',
      itch: '#',
    },
    features: [
      'Expansive open world with dynamic weather systems',
      'Deep character customization and skill trees',
      'Engaging story with multiple endings',
      'Challenging boss battles and dungeon crawling',
      'Beautiful hand-crafted environments',
    ],
  },
  {
    id: '2',
    slug: 'pixel-pioneers',
    title: 'Pixel Pioneers',
    description: 'A charming retro-style platformer with modern mechanics and tight controls.',
    fullDescription: 'Pixel Pioneers combines classic platforming action with modern game design sensibilities. Jump, dash, and explore your way through beautifully crafted pixel art levels. With precise controls and creative level design, Pixel Pioneers delivers pure platforming joy that both veterans and newcomers will love.',
    genre: ['Platformer', 'Action', 'Indie'],
    platforms: ['PC', 'Nintendo Switch'],
    releaseDate: '2024-12',
    thumbnail: '/images/pixel-pioneers-thumb.jpg',
    screenshots: [
      '/images/pixel-pioneers-1.jpg',
      '/images/pixel-pioneers-2.jpg',
      '/images/pixel-pioneers-3.jpg',
    ],
    storeLinks: {
      steam: '#',
      itch: '#',
    },
    features: [
      'Over 50 hand-crafted levels across 5 unique worlds',
      'Tight, responsive controls perfected for speedrunning',
      'Hidden secrets and collectibles in every level',
      'Retro-inspired chiptune soundtrack',
      'Time trial mode with online leaderboards',
    ],
  },
  {
    id: '3',
    slug: 'cosmic-drift',
    title: 'Cosmic Drift',
    description: 'Navigate through space in this relaxing exploration game with stunning visuals.',
    fullDescription: 'Cosmic Drift offers a serene journey through the cosmos. Pilot your spacecraft through beautiful nebulas, discover distant planets, and uncover the mysteries of deep space. With no combat or time pressure, Cosmic Drift is a meditative experience focused on exploration and wonder.',
    genre: ['Exploration', 'Simulation', 'Relaxing'],
    platforms: ['PC', 'Mac'],
    releaseDate: '2025-Q1',
    thumbnail: '/images/cosmic-drift-thumb.jpg',
    screenshots: [
      '/images/cosmic-drift-1.jpg',
      '/images/cosmic-drift-2.jpg',
      '/images/cosmic-drift-3.jpg',
    ],
    storeLinks: {
      steam: '#',
      gog: '#',
    },
    features: [
      'Procedurally generated universe with billions of stars',
      'Photo-realistic space environments',
      'Relaxing ambient soundtrack',
      'Ship customization and upgrades',
      'Discovery journal to catalog your findings',
    ],
  },
  {
    id: '4',
    slug: 'rogue-circuit',
    title: 'Rogue Circuit',
    description: 'A fast-paced roguelike with cyberpunk aesthetics and strategic combat.',
    fullDescription: 'Rogue Circuit is a thrilling roguelike set in a dystopian cyberpunk future. Each run is unique with procedurally generated levels, diverse enemy types, and powerful upgrades. Master the strategic combat system, experiment with different builds, and see how far you can push into the corrupted network.',
    genre: ['Roguelike', 'Action', 'Cyberpunk'],
    platforms: ['PC', 'Steam Deck'],
    releaseDate: '2025-Q2',
    thumbnail: '/images/rogue-circuit-thumb.jpg',
    screenshots: [
      '/images/rogue-circuit-1.jpg',
      '/images/rogue-circuit-2.jpg',
      '/images/rogue-circuit-3.jpg',
    ],
    storeLinks: {
      steam: '#',
      itch: '#',
    },
    features: [
      'Procedurally generated levels ensure no two runs are the same',
      'Over 100 unique upgrades and synergies',
      'Fast-paced, skill-based combat',
      'Unlockable characters with different playstyles',
      'Daily challenges and leaderboards',
    ],
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find(game => game.slug === slug);
}

export function getAllGameSlugs(): string[] {
  return games.map(game => game.slug);
}
