import React from "react";
import { GamingEvent } from "../../../../types/gaming";

interface EventCardProps {
  event: GamingEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-80 object-cover transition-transform hover:scale-102"
      />

      <div className="p-4">
        <h3 className="text-base font-semibold truncate">{event.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{event.date}</p>
      </div>
    </div>
  );
};

export default EventCard;
