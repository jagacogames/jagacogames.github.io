import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGameBySlug, getAllGameSlugs } from '@/data/games';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllGameSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function GameDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/games"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Games
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {game.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {game.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {game.genre.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full border border-cyan-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="space-y-2 text-gray-400">
                <p>
                  <span className="font-semibold text-white">Release Date:</span> {game.releaseDate}
                </p>
                <p>
                  <span className="font-semibold text-white">Platforms:</span> {game.platforms.join(', ')}
                </p>
              </div>
            </div>

            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-gray-500">
                <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4zm4-3c0-.55-.45-1-1-1s-1 .45-1 1v7c0 .55.45 1 1 1s1-.45 1-1V9zm4 1c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6z"/>
                </svg>
                <p className="text-center">Game Screenshot</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-white mb-4">About the Game</h2>
              <p className="text-gray-400 leading-relaxed">
                {game.fullDescription}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4">Key Features</h2>
              <ul className="space-y-3">
                {game.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-cyan-400 mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-4">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {game.screenshots.map((screenshot, index) => (
                  <div
                    key={index}
                    className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center"
                  >
                    <div className="text-gray-500 text-sm">Screenshot {index + 1}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-white mb-4">Get the Game</h3>
              {game.storeLinks && (
                <div className="space-y-3">
                  {game.storeLinks.steam && (
                    <a
                      href={game.storeLinks.steam}
                      className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg text-center transition-all"
                    >
                      Get on Steam
                    </a>
                  )}
                  {game.storeLinks.itch && (
                    <a
                      href={game.storeLinks.itch}
                      className="block w-full py-3 px-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-lg text-center transition-all"
                    >
                      Get on Itch.io
                    </a>
                  )}
                  {game.storeLinks.gog && (
                    <a
                      href={game.storeLinks.gog}
                      className="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg text-center transition-all"
                    >
                      Get on GOG
                    </a>
                  )}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-800">
                <h4 className="font-semibold text-white mb-3">Game Info</h4>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-gray-500">Genre</dt>
                    <dd className="text-gray-300">{game.genre.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Platforms</dt>
                    <dd className="text-gray-300">{game.platforms.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Release</dt>
                    <dd className="text-gray-300">{game.releaseDate}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
