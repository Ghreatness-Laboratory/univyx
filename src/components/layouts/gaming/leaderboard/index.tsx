"use client";

import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";
import { gameLeaderboards } from "../../../../data/gaming/leaderboards";

export default function Leaderboards() {
  const [selectedGame, setSelectedGame] = useState(gameLeaderboards[0].gameId);
  const [expandedView, setExpandedView] = useState(false);
  const lastUpdated = "April 14, 2025";

  const currentLeaderboard = gameLeaderboards.find(
    (game) => game.gameId === selectedGame
  );

  const displayLeaderboard = expandedView
    ? currentLeaderboard?.leaderboard
    : currentLeaderboard?.leaderboard.slice(0, 3);

  return (
    <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-8 py-12 md:py-16 px-6 lg:px-0">
      <div>
        <h2 className="text-4xl md:text-5xl font-semibold">
          University Champions
        </h2>
        <p className="text-secondary text-lg mt-1">
          The elite universities dominating competitive gaming across
          tournaments
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {gameLeaderboards.map((game) => (
          <button
            key={game.gameId}
            onClick={() => setSelectedGame(game.gameId)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedGame === game.gameId
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {game.gameName}
          </button>
        ))}
      </div>

      <div className="text-sm text-gray-500 -mt-6">
        Last updated: {lastUpdated}
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gray-50 py-3 px-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-xl">
              {currentLeaderboard?.gameName} Leaderboard
            </h3>
            <div className="flex gap-2 items-center">
              <Trophy size={18} className="text-yellow-500" />
              <Star size={16} className="text-blue-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-7 md:col-span-8">University</div>
          <div className="col-span-2 md:col-span-1 text-center">
            <Users size={16} className="inline" />
          </div>
          <div className="col-span-2 text-right">Details</div>
        </div>

        {displayLeaderboard?.map((entry) => (
          <div
            key={entry.universityId}
            className={`grid grid-cols-12 gap-2 px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
              entry.rank === 1 ? "bg-yellow-50" : ""
            }`}
          >
            <div className="col-span-1 flex justify-center items-center">
              {entry.rank === 1 ? (
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold">
                  1
                </div>
              ) : entry.rank === 2 ? (
                <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
                  2
                </div>
              ) : entry.rank === 3 ? (
                <div className="w-7 h-7 rounded-full bg-orange-300 flex items-center justify-center text-white font-bold">
                  3
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium text-sm">
                  {entry.rank}
                </div>
              )}
            </div>

            <div className="col-span-7 md:col-span-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={entry.logo || "/placeholder.svg"}
                  alt={entry.universityName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-medium line-clamp-1">
                {entry.universityName}
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 flex items-center justify-center text-gray-600">
              {entry.members}
            </div>

            <div className="col-span-2 flex items-center justify-end">
              <button className="text-primary hover:text-primary-dark transition-colors flex items-center">
                View <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        ))}

        <div
          className="py-3 px-4 text-center text-primary font-medium cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setExpandedView(!expandedView)}
        >
          {expandedView ? (
            <div className="flex items-center justify-center">
              <span>Show Less</span>
              <ChevronUp size={18} className="ml-1" />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span>Show More</span>
              <ChevronDown size={18} className="ml-1" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
