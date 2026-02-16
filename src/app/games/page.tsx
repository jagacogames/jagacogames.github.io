import { getAllGames } from '@/lib/markdown';
import GameCard from '@/components/GameCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Games',
  description: 'Explore our collection of unique indie games. From intense action to relaxing exploration, we create diverse experiences for every type of player.',
  openGraph: {
    title: 'Our Games | Jagaco Games',
    description: 'Explore our collection of unique indie games. From intense action to relaxing exploration, we create diverse experiences for every type of player.',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jagaco Games - Our Games',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Games | Jagaco Games',
    description: 'Explore our collection of unique indie games. From intense action to relaxing exploration, we create diverse experiences for every type of player.',
    images: ['/images/og-image.png'],
  },
};

export default function GamesPage() {
  const games = getAllGames();
  return (
    <>
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#7FBA00] via-[#4A90E2] to-[#9C27B0] pt-32 pb-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full animate-float" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 uppercase tracking-tight">
              OUR GAMES
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Explore our collection of unique indie games. From intense action to relaxing exploration,
              we create diverse experiences for every type of player.
            </p>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
