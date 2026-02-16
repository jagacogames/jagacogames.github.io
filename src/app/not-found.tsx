import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="relative w-24 h-24">
            <Image
              src="/images/jagaco-logo.png"
              alt="Jagaco Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-[#FDB614] mb-4 animate-scale-in">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase animate-fade-in-up">
          Page Not Found
        </h2>

        <p className="text-gray-300 text-lg mb-8 animate-fade-in-up stagger-1">
          Looks like this page took a wrong turn in the game world.
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
          <Link
            href="/"
            className="bg-[#FDB614] text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors uppercase"
          >
            Go Home
          </Link>
          <Link
            href="/games"
            className="bg-white/10 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition-colors uppercase border border-white/20"
          >
            View Games
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-gray-400 text-sm animate-fade-in-up stagger-3">
          <p>Need help? Check out our <Link href="/blog" className="text-[#FDB614] hover:underline">blog</Link> or return to the <Link href="/" className="text-[#FDB614] hover:underline">homepage</Link>.</p>
        </div>
      </div>
    </div>
  );
}
