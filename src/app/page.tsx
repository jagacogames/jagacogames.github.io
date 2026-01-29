import Link from 'next/link';
import { games } from '@/data/games';
import GameCard from '@/components/GameCard';

export default function Home() {
  const featuredGames = games.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              JAGACO STUDIOS
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Crafting unique indie gaming experiences that inspire, challenge, and entertain
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/games"
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
              >
                Explore Our Games
              </Link>
              <Link
                href="/blog"
                className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Who We Are
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              We are a passionate indie game development studio dedicated to creating innovative and memorable gaming experiences.
              From dark fantasy adventures to relaxing exploration games, we believe in the power of games to tell stories,
              evoke emotions, and bring people together.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Featured Games
            </h2>
            <Link
              href="/games"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Follow our development journey and get the latest news about our games, behind-the-scenes content,
            and development insights.
          </p>
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-white text-cyan-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Read Our Blog
          </Link>
        </div>
      </section>
    </div>
  );
}
