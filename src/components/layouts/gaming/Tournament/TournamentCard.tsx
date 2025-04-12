import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React from "react";
import { Tournament } from "../../../../types/gaming";

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full"
    >
      <div className="relative">
        <div className="overflow-hidden w-full h-60">
          <img
            src={tournament.image}
            alt={tournament.title}
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-70"></div>
        <div className="absolute bottom-3 left-4 text-white">
          <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
            {tournament.game}
          </span>
        </div>
        <div
          className="absolute top-3 right-4 text-white text-xs font-semibold px-2 py-1 rounded-full"
          style={{
            backgroundColor:
              tournament.type === "inter" ? "#3B82F6" : "#8B5CF6",
          }}
        >
          {tournament.type === "inter"
            ? "Inter-University"
            : "Intra-University"}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-2">{tournament.title}</h3>

        {tournament.university && (
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-600">
              {tournament.university}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button className="text-primary font-medium hover:underline text-sm flex items-center">
            View details
            <ChevronRight size={16} />
          </button>
          <button className="bg-primary text-white px-3 py-2 rounded-lg text-sm">
            Register
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TournamentCard;
