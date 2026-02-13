import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts, getAllGames } from '@/lib/markdown';
import GameCard from '@/components/GameCard';
import BlogCard from '@/components/BlogCard';
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  const latestGames = getAllGames().slice(0, 3);
  const recentPosts = getAllBlogPosts().slice(0, 3);

  return (
    <div>
      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* What is Jagaco Section */}
      <section className="bg-[#FDB614] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">
                WHAT IS JAGACO
              </h2>
              <p className="text-gray-800 leading-relaxed">
                Proin facilibus tristique est et vulputate. Etiam lorem lorem, ultricies et semper sit amet. Etiam lorem lorem, ultricies et semper sit amet. Etiam lorem lorem, ultricies et semper sit.
              </p>
            </div>

            <div className="animate-fade-in-up stagger-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">
                OUR MISSION
              </h2>
              <p className="text-gray-800 leading-relaxed">
                Proin facilibus tristique est et vulputate. Etiam lorem lorem, ultricies et semper sit amet. Etiam lorem lorem, ultricies et semper sit amet. Etiam lorem lorem, ultricies et semper sit.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end animate-scale-in stagger-2">
              <div className="w-64 h-64 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center text-white text-lg font-bold">
                [Desk Illustration]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Games Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 uppercase">
            OUR GAMES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {latestGames.map((game) => (
              <div key={game.id} className="animate-fade-in-up">
                <GameCard game={game} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/games">
              <button className="px-8 py-3 bg-[#E91E63] hover:bg-[#C2185B] text-white font-bold rounded-full uppercase transition-colors shadow-lg">
                SEE MORE
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dev Pillars Section */}
      <section className="py-16 md:py-24 bg-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="bg-[#FDB614] p-8 rounded-lg shadow-lg animate-slide-in-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase">
                DEV PILLARS AND TOOLING
              </h3>
              <p className="text-gray-800 text-sm leading-relaxed">
                Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo. Suspendisse est augue, suscipit sit amet libero sed, ornare consectetur diam.
              </p>
            </div>

            <div className="text-center animate-fade-in-up stagger-1">
              <div className="inline-block mb-6">
                <div className="w-24 h-32 mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500 via-orange-400 to-yellow-300 rounded-full blur-xl opacity-75"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">🔥</div>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-3">Code base</h4>
              <p className="text-gray-600 text-sm max-w-xs mx-auto">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
              </p>
            </div>

            <div className="text-center animate-fade-in-up stagger-2">
              <div className="inline-block mb-6">
                <div className="w-24 h-32 mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full blur-xl opacity-75"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">🔥</div>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-3">Flexibility</h4>
              <p className="text-gray-600 text-sm max-w-xs mx-auto">
                Sed posuere consectetur est at lobortis. Maecenas sed diam eget risus varius blandit sit amet non magna.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 uppercase">
            BLOG
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div key={post.slug} className="animate-fade-in-up">
                  <BlogCard post={post} />
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link href="/blog">
              <button className="px-8 py-3 bg-[#E91E63] hover:bg-[#C2185B] text-white font-bold rounded-full uppercase transition-colors shadow-lg">
                SEE MORE
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 md:py-24 bg-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 uppercase">
            WE ARE JAGACO
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            At Jagaco we work with a diverse team of developers and a small core team. More you'll find the folks who make it all happen.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center animate-scale-in">
              <div className="w-32 h-32 mx-auto rounded-lg mb-4 overflow-hidden">
                <Image
                  src="/images/team/Vincent.webp"
                  alt="Vincent Broeren"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-sm uppercase">VINCENT BROEREN</h3>
              <p className="text-gray-600 text-xs">CODIN PALADIN</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center animate-scale-in stagger-1">
              <div className="w-32 h-32 mx-auto rounded-lg mb-4 overflow-hidden">
                <Image
                  src="/images/team/Remco.webp"
                  alt="Remco Brilstra"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-sm uppercase">REMCO BRILSTRA</h3>
              <p className="text-gray-600 text-xs">CODE ROGUE</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center animate-scale-in stagger-2">
              <div className="w-32 h-32 mx-auto rounded-lg mb-4 overflow-hidden">
                <Image
                  src="/images/team/Wilco.webp"
                  alt="Wilco van Starreburg"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-sm uppercase">WILCO VAN STARREBURG</h3>
              <p className="text-gray-600 text-xs">PIXEL WIZARD</p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center animate-scale-in stagger-6">
              <div className="w-32 h-32 mx-auto rounded-lg mb-4 overflow-hidden">
                <Image
                  src="/images/team/Mathijs.webp"
                  alt="Mathijs Koning"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-sm uppercase">MATHIJS KONING</h3>
              <p className="text-gray-600 text-xs">AUDIO DUDE</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Thanks Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase">
            SPECIAL THANKS
          </h2>
          <p className="text-gray-600 mb-4">
            Sed posuere consectetur est at lobortis. Etiam porta sem malesuada magna mollis euismod. Aenean eu leo quam.
          </p>
          <p className="text-gray-900 font-bold text-xl mb-8">
            ARE WE MISSING ANYONE?
          </p>
          <p className="text-gray-600">
            Feel like you should be part of this epic team? Although we don't have vacancies at the moment, we'd love to hear from you!
          </p>
        </div>
      </section>
    </div>
  );
}
