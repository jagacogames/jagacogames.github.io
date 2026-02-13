import Link from 'next/link';
import Image from 'next/image';
import { GameMetadata } from '@/types';

interface GameCardProps {
  game: GameMetadata;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col border border-gray-200">
        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden flex items-center justify-center">
          {game.thumbnail ? (
            <Image
              src={game.thumbnail}
              alt={game.title}
              width={400}
              height={225}
              className="object-contain w-full h-full p-4"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4zm4-3c0-.55-.45-1-1-1s-1 .45-1 1v7c0 .55.45 1 1 1s1-.45 1-1V9zm4 1c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6z"/>
              </svg>
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 uppercase hover:text-[#E91E63] transition-colors">{game.title}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow leading-relaxed">{game.description}</p>
          <div className="flex flex-wrap gap-2 mb-3 pt-4 border-t border-gray-200">
            {game.genre.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#E8E8E8] text-gray-700 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-xs text-gray-500">
            Release: {game.releaseDate}
          </div>
        </div>
      </div>
    </Link>
  );
}
