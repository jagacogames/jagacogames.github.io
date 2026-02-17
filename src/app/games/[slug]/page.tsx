import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getGameBySlug, getAllGameSlugs } from '@/lib/markdown';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';
import ScreenshotGallery from '@/components/ScreenshotGallery';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    return {
      title: 'Game Not Found',
      description: 'The requested game could not be found.',
    };
  }

  const ogImage = game.thumbnail || '/images/og-image.png';

  return {
    title: game.title,
    description: game.description,
    keywords: [game.title, ...game.genre, ...game.platforms, 'indie game', 'Jagaco Games'],
    openGraph: {
      title: game.title,
      description: game.description,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: game.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: game.title,
      description: game.description,
      images: [ogImage],
    },
  };
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        {/* Background Image */}
        {game.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={game.featuredImage}
              alt={game.title}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay with blur and darken effect */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          </div>
        )}

        {/* Fallback gradient if no featured image */}
        {!game.featuredImage && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#7FBA00] via-[#4A90E2] to-[#9C27B0]"></div>
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full animate-float" />
              <div className="absolute bottom-20 left-20 w-24 h-24 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }} />
            </div>
          </>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/games"
            className="inline-flex items-center text-white hover:text-[#FDB614] mb-8 transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Games
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase">
                {game.title}
              </h1>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {game.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {game.genre.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="space-y-2 text-white/90">
                <p>
                  <span className="font-bold text-white">Release Date:</span> {game.releaseDate}
                </p>
                <p>
                  <span className="font-bold text-white">Platforms:</span> {game.platforms.join(', ')}
                </p>
              </div>
            </div>

            <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center p-8">
              {game.thumbnail ? (
                <Image
                  src={game.thumbnail}
                  alt={game.title}
                  width={600}
                  height={400}
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="text-white/60">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4zm4-3c0-.55-.45-1-1-1s-1 .45-1 1v7c0 .55.45 1 1 1s1-.45 1-1V9zm4 1c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6z"/>
                  </svg>
                  <p className="text-center">Game Screenshot</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 uppercase">About the Game</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <ReactMarkdown
                  components={{
                    h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3" {...props} />,
                    h4: ({node, ...props}) => <h4 className="text-lg font-bold text-gray-900 mt-4 mb-2" {...props} />,
                    p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="ml-4" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                    em: ({node, ...props}) => <em className="italic" {...props} />,
                    a: ({node, ...props}) => <a className="text-[#E91E63] hover:text-[#C2185B] underline" {...props} />,
                    code: ({node, ...props}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm" {...props} />,
                  }}
                >
                  {game.fullDescription}
                </ReactMarkdown>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase">Key Features</h2>
              <ul className="space-y-4">
                {game.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-[#E91E63] mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase">Screenshots</h2>
              <ScreenshotGallery screenshots={game.screenshots} gameTitle={game.title} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#E8E8E8] rounded-lg p-6 sticky top-24">
              {game.storeLinks && (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Get the Game</h3>
                  <div className="space-y-3">
                    {game.storeLinks.steam && (
                      <a
                        href={game.storeLinks.steam}
                        className="block w-full py-3 px-4 bg-[#E91E63] hover:bg-[#C2185B] text-white font-bold rounded-lg text-center transition-all uppercase shadow-lg"
                      >
                        Get on Steam
                      </a>
                    )}
                    {game.storeLinks.itch && (
                      <a
                        href={game.storeLinks.itch}
                        className="block w-full py-3 px-4 bg-[#E91E63] hover:bg-[#C2185B] text-white font-bold rounded-lg text-center transition-all uppercase shadow-lg"
                      >
                        Get on Itch.io
                      </a>
                    )}
                    {game.storeLinks.gog && (
                      <a
                        href={game.storeLinks.gog}
                        className="block w-full py-3 px-4 bg-[#E91E63] hover:bg-[#C2185B] text-white font-bold rounded-lg text-center transition-all uppercase shadow-lg"
                      >
                        Get on GOG
                      </a>
                    )}
                    {game.storeLinks.web && (
                      <a
                        href={game.storeLinks.web}
                        className="block w-full py-3 px-4 bg-[#E91E63] hover:bg-[#C2185B] text-white font-bold rounded-lg text-center transition-all uppercase shadow-lg"
                      >
                        View on Web
                      </a>
                    )}
                  </div>
                </>
              )}

              <div className="mt-6 pt-6 border-t border-gray-300">
                <h4 className="font-bold text-gray-900 mb-3 uppercase">Game Info</h4>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-500 font-medium">Genre</dt>
                    <dd className="text-gray-700 mt-1">{game.genre.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 font-medium">Platforms</dt>
                    <dd className="text-gray-700 mt-1">{game.platforms.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 font-medium">Release</dt>
                    <dd className="text-gray-700 mt-1">{game.releaseDate}</dd>
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
