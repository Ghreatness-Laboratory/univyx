import { Calendar, Clock } from "lucide-react";
import { EventProps } from "../../../../data/entertainment/events";

interface EventCardProps {
  event: EventProps;
  className?: string;
}
export default function EventCard({ event, className }: EventCardProps) {
  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="relative">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {event.category}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-xl mb-3 hover:text-orange-600 transition-colors">
          {event.title}
        </h3>
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
            <div className="text-gray-500 mr-2 mt-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <span>{event.location}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-5 line-clamp-3">
          {event.description}
        </p>
      </div>
    </div>
  );
}
