// File: components/gaming/RankingsSection.tsx
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { PlayerRanking, University } from "../../../../types/gaming";
import RankCard from "./RankCard";

interface RankingsSectionProps {
  playerRankings: PlayerRanking[];
  popularGames: string[];
  universities: University[];
}

const RankingsSection: React.FC<RankingsSectionProps> = ({
  playerRankings,
  popularGames,
  universities,
}) => {
  const [activeGame, setActiveGame] = useState<string>(
    popularGames[0] || "Valorant"
  );

  const gameRankings = playerRankings.filter(
    (player) => player.game === activeGame
  );

  return (
    <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900">
          University Rankings
        </h2>
        <p className="text-gray-600 mt-2">
          Top players across universities in different games
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex overflow-x-auto hide-scrollbar mb-6">
          <div className="flex gap-2">
            {popularGames.map((game) => (
              <button
                key={game}
                onClick={() => setActiveGame(game)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeGame === game
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {game}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-100 p-3 rounded-lg mb-2 font-medium text-gray-700">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-2">University</div>
            <div className="col-span-2">Win Rate</div>
            <div className="col-span-2 text-right">Score</div>
          </div>

          {gameRankings.slice(0, 10).map((player, index) => (
            <RankCard
              key={player.id}
              player={player}
              index={index}
              universities={universities}
            />
          ))}

          <div className="text-center mt-6">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 mx-auto">
              View All Rankings
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RankingsSection;
