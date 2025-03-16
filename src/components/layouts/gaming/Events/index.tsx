// File: components/gaming/UpcomingEventsSection.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { GamingEvent } from "../../../../types/gaming";
import EventCard from "./EventCard";

interface UpcomingEventsSectionProps {
  upcomingEvents: GamingEvent[];
}

const Events: React.FC<UpcomingEventsSectionProps> = ({ upcomingEvents }) => {
  return (
    <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">Upcoming Events</h2>
          <p className="text-gray-600 mt-2">
            Latest gaming tournaments and meetups happening on campus
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={24} className="text-gray-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ChevronRight size={24} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4">
        {upcomingEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default Events;
