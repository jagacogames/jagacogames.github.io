import { games } from '@/data/games';
import GameCard from '@/components/GameCard';

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gray-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Games
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Explore our collection of unique indie games. From intense action to relaxing exploration,
            we create diverse experiences for every type of player.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}
