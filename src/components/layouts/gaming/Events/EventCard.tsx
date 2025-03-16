// File: components/gaming/cards/EventCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { GamingEvent } from '../../../../types/gaming';

interface EventCardProps {
  event: GamingEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="w-[350px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0"
    >
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
          {event.category}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-xl mb-3">{event.title}</h3>
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center text-sm">
            <Calendar size={16} className="text-gray-500 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock size={16} className="text-gray-500 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-start text-sm">
            <MapPin size={16} className="text-gray-500 mr-2 mt-0.5" />
            <span>{event.venue}</span>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          {event.platforms.map((platform, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {platform}
            </span>
          ))}
        </div>
        
        <div className="text-green-600 font-semibold mb-4">
          Prize Pool: {event.prizePool}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>
        
        <button
          className="flex items-center gap-1 px-4 py-2 hover:bg-primary rounded-full group transition-all duration-200 cursor-pointer bg-primary w-fit text-white"
        >
          Register Now
          <ChevronRight className="size-4 text-white" />
        </button>
      </div>
    </motion.div>
  );
};

export default EventCard;