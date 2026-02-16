import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engine & Technology - Jagaco Games',
  description: 'Learn about Fire Engine and Matchbox Editor, our custom game development technology built for creating unique gaming experiences.',
};

export default function EnginePage() {
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
              OUR TECHNOLOGY
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Custom-built game engine and development tools designed to optimize our workflow and bring our creative visions to life.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Fire Engine Section */}
          <section className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 uppercase">
                  Fire Engine
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Our proprietary <strong>Fire Engine</strong> is a custom-built 2D/3D game engine that powers all our game development. The engine is currently strongly specialized in 2D isometric games like you'd see in RTS's and 'God' games, with ongoing expansion toward broader 3D capabilities.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Built from the ground up with our specific needs in mind, Fire Engine gives us complete control over performance, rendering, and gameplay mechanics. This allows us to create unique gaming experiences that wouldn't be possible with off-the-shelf solutions.
                </p>
                <div className="bg-[#E8E8E8] rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Key Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#E91E63] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Specialized 2D isometric rendering optimized for RTS games</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#E91E63] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Expanding 3D capabilities for future projects</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#E91E63] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">High-performance rendering pipeline</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#E91E63] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Cross-platform support (PC, Mobile, Web)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#E91E63] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Custom scripting and gameplay systems</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-12 shadow-xl">
                  <Image
                    src="/images/tech/fire-engine-logo.png"
                    alt="Fire Engine Logo"
                    width={400}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Matchbox Editor Section */}
          <section className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-12 shadow-xl">
                  <Image
                    src="/images/tech/matchbox-editor-logo.png"
                    alt="Matchbox Editor Logo"
                    width={400}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 uppercase">
                  Matchbox Editor
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  The <strong>Matchbox Editor</strong> serves as our comprehensive development suite, consolidating multiple specialized tools into one integrated platform. It's the command center where all our game content comes to life.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  By bringing together various tools and workflows into a single, cohesive editor, we've dramatically streamlined our development process. What used to require multiple applications and manual file management now happens seamlessly in one place.
                </p>
                <div className="bg-[#E8E8E8] rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Integrated Tools</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#E91E63] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Texture atlas generation and management</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#E91E63] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Scenario and mission editing capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#E91E63] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Animation editing and timeline tools</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#E91E63] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Level design and world building tools</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#E91E63] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Fully automated asset pipeline</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#E91E63] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">RPG-style conversation building and editing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="bg-gradient-to-br from-[#7FBA00] via-[#4A90E2] to-[#9C27B0] rounded-3xl p-12 md:p-16 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase">
                Our Development Philosophy
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90">
                "Our custom engine and editor have allowed us to optimize our workflow to the max."
              </p>
              <p className="text-lg leading-relaxed text-white/90 mb-6">
                At Jagaco, we believe in having complete control over our development pipeline. While many studios rely on off-the-shelf engines, we've invested years in building custom technology that perfectly suits our needs.
              </p>
              <p className="text-lg leading-relaxed text-white/90">
                This long-term investment in proprietary technology gives us the flexibility to innovate, the performance to excel, and the capability to bring unique gaming experiences to life that simply wouldn't be possible otherwise.
              </p>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mt-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 uppercase">
              Why Custom Technology?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#E8E8E8] rounded-xl p-8 text-center">
                <div className="w-20 h-20 bg-[#7FBA00] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase">Performance</h3>
                <p className="text-gray-600 leading-relaxed">
                  Optimized specifically for our games and target platforms, ensuring smooth gameplay and efficient resource usage.
                </p>
              </div>

              <div className="bg-[#E8E8E8] rounded-xl p-8 text-center">
                <div className="w-20 h-20 bg-[#4A90E2] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase">Flexibility</h3>
                <p className="text-gray-600 leading-relaxed">
                  Complete control means we can implement any feature, no matter how unique or experimental our vision may be.
                </p>
              </div>

              <div className="bg-[#E8E8E8] rounded-xl p-8 text-center">
                <div className="w-20 h-20 bg-[#9C27B0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase">Workflow</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tools designed around our team's needs create a streamlined pipeline from concept to finished game.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
