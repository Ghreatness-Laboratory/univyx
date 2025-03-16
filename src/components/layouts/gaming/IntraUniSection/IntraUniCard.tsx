// File: components/gaming/cards/IntraTournamentCard.tsx
import { motion } from "framer-motion";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import React from "react";
import { Tournament } from "../../../../types/gaming";

interface IntraTournamentCardProps {
  tournament: Tournament;
}

const IntraTournamentCard: React.FC<IntraTournamentCardProps> = ({
  tournament,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all flex flex-col md:flex-row"
    >
      <div className="md:w-1/4">
        <img
          src={tournament.image}
          alt={tournament.title}
          className="w-full h-48 md:h-full object-cover"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl mb-2">{tournament.title}</h3>
              <div className="flex items-center mb-2">
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mr-2">
                  {tournament.game}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Intra-University
                </span>
              </div>
            </div>
            <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full uppercase font-semibold">
              {tournament.status}
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {tournament.description}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={14} className="mr-1" />
              <span>{tournament.date}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={14} className="mr-1" />
              <span>{tournament.venue}</span>
            </div>
            <div className="text-green-600 font-semibold text-sm">
              Prize: {tournament.prizePool}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-primary font-medium hover:underline text-sm flex items-center">
              View details
              <ChevronRight size={16} />
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
              Register
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IntraTournamentCard;
