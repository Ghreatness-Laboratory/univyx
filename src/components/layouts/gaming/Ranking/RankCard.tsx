import React from "react";
import { PlayerRanking, University } from "../../../../types/gaming";

interface PlayerRankCardProps {
  player: PlayerRanking;
  index: number;
  universities: University[];
}

const RankCard: React.FC<PlayerRankCardProps> = ({
  player,
  index,
  universities
}) => {
  // Find university details
  const university = universities.find(
    (uni) => uni.id === player.university
  );

  return (
    <div className="grid grid-cols-12 gap-4 p-3 rounded-lg mb-2 hover:bg-gray-50 transition-colors border border-gray-100">
      {/* Rank number */}
      <div className="col-span-1 flex items-center justify-center">
        <span className={`font-bold text-lg ${index < 3 ? "text-primary" : "text-gray-500"}`}>
          {index + 1}
        </span>
      </div>

      {/* Player info */}
      <div className="col-span-5 flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
          {player.avatar ? (
            <img
              src={player.avatar}
              alt={player.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary text-white text-lg font-bold">
              {player.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{player.name}</h3>
          <p className="text-sm text-gray-500">{player.name}</p>
        </div>
      </div>

      {/* University */}
      <div className="col-span-2 flex items-center">
        <span className="text-gray-700 text-sm md:text-base">
          {university?.shortName || university?.name || "Unknown"}
        </span>
      </div>

      {/* Win Rate */}
      <div className="col-span-2 flex items-center">
        <div className="w-full">
          <div className="flex justify-between mb-1">
            <span className="text-gray-700">{player.winRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${player.winRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="col-span-2 flex items-center justify-end">
        <span className="font-semibold text-gray-900">{player.points.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default RankCard;