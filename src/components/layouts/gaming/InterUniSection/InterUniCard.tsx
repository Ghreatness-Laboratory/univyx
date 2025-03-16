// File: components/gaming/cards/InterTournamentCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, ChevronRight } from 'lucide-react';
import { Tournament } from '../../../../types/gaming';

interface InterTournamentCardProps {
  tournament: Tournament;
}

const InterTournamentCard: React.FC<InterTournamentCardProps> = ({ tournament }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
    >
      <div className="relative">
        <img
          src={tournament.image}
          alt={tournament.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-70"></div>
        <div className="absolute bottom-3 left-4 text-white">
          <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
            {tournament.game}
          </span>
        </div>
        <div className="absolute top-3 right-4 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Inter-University
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{tournament.title}</h3>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={14} className="mr-1" />
            <span>{tournament.date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users size={14} className="mr-1" />
            <span>{tournament.participants} teams</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-green-600 font-semibold text-sm">
            Prize: {tournament.prizePool}
          </div>
          <div className="flex items-center">
            <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full uppercase font-semibold">
              {tournament.status}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <button className="text-primary font-medium hover:underline text-sm flex items-center">
            View details
            <ChevronRight size={16} />
          </button>
          <button className="bg-primary text-white px-3 py-1 rounded-lg text-sm">
            Register
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InterTournamentCard;