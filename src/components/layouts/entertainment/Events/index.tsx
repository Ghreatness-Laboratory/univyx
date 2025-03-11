import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { events } from "../../../../data/entertainment/events";
import EventCard from "./EventCard";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Events() {
  const [view, setView] = useState<"grid" | "calendar">("grid");
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const filteredEvents = events.filter((event) =>
    event.date.startsWith(selectedMonth)
  );

  return (
    <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Event Announcements
          </h2>
          <p className="text-secondary  max-w-xl">
            Never miss out on campus events, festivals, workshops, and
            gatherings
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4 items-center">
          <div className="flex">
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-1.5 rounded-l-lg transition-colors ${
                view === "grid"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3H10V10H3V3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 3H21V10H14V3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 14H10V21H3V14Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 14H21V21H14V14Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`px-3 py-1.5 rounded-r-lg transition-colors ${
                view === "calendar"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border-t border-b border-r border-gray-200"
              }`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 2V6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 2V6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 10H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <Select
            className="w-32"
            classNamePrefix="select"
            options={months.map((month) => ({ value: month, label: month }))}
            defaultValue={{ value: "March", label: "March" }}
            onChange={(option) => option && setSelectedMonth(option.value)}
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "0.5rem",
                border: "1px solid #D1D5DB",
                paddingLeft: "0.5rem",
                boxShadow: "none",
                "&:hover": {
                  border: "1px solid #F59E0B",
                },
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#F59E0B"
                  : state.isFocused
                  ? "#FEF3C7"
                  : "white",
                color: state.isSelected ? "white" : "#1F2937",
              }),
            }}
          />
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-2">
              No events found for {selectedMonth}.
            </p>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold text-slate-800">
              Events Calendar - {selectedMonth} 2025
            </h3>
          </div>
          <div className="grid grid-cols-7 text-center border-b">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="py-3 border-r font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 border-b">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const hasEvent = filteredEvents.some((event) =>
                event.date.includes(`${selectedMonth} ${day}`)
              );
              return (
                <div
                  key={day}
                  className={`h-32 p-2 border-r border-b relative ${
                    hasEvent ? "bg-orange-50" : ""
                  }`}
                >
                  <span className="text-sm font-medium">{day}</span>
                  {hasEvent && (
                    <div className="mt-1">
                      <div className="bg-orange-500 text-white text-xs p-1 rounded">
                        {
                          filteredEvents.find((event) =>
                            event.date.includes(`${selectedMonth} ${day}`)
                          )?.title
                        }
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="text-center">
        <Link
          to={"/entertainment/news"}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors inline-flex items-center"
        >
          See all upcoming events <ChevronRight size={18} className="ml-1" />
        </Link>
      </div>
    </section>
  );
}
