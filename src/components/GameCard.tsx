import Link from 'next/link';
import { Game } from '@/types';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.slug}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-cyan-400 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        <div className="aspect-video bg-gray-700 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4zm4-3c0-.55-.45-1-1-1s-1 .45-1 1v7c0 .55.45 1 1 1s1-.45 1-1V9zm4 1c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6z"/>
            </svg>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
          <p className="text-gray-400 text-sm mb-4 flex-grow">{game.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {game.genre.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-700 text-cyan-400 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            Release: {game.releaseDate}
          </div>
        </div>
      </div>
    </Link>
  );
}
