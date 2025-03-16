// File: components/gaming/InterUniversityTournamentsSection.tsx
import { Filter, Search } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Tournament } from "../../../../types/gaming";
import Select from 'react-select';
import InterTournamentCard from "./InterUniCard";

interface InterUniversityTournamentsSectionProps {
  interTournaments: Tournament[];
  popularGames: string[];
}

const InterUniversityTournamentsSection: React.FC<
  InterUniversityTournamentsSectionProps
> = ({ interTournaments, popularGames }) => {
  interface FormData {
    search: string;
  }

  const { register, handleSubmit } = useForm<FormData>();

  const onSearch = (data: { search: string }) => {
    console.log("Search data:", data);
    // Would handle search functionality here
  };

  return (
    <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900">
          Inter-University Tournaments
        </h2>
        <p className="text-gray-600 mt-2">
          Compete against other universities and represent your school
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <form
          onSubmit={handleSubmit(onSearch)}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search tournaments..."
              className="w-full border border-gray-300 rounded-lg py-2 px-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              {...register("search")}
            />
          </div>
          <div className="w-full md:w-48">
            <Select
              placeholder="Game"
              options={popularGames.map((game) => ({
                value: game,
                label: game,
              }))}
              className="text-sm"
            />
          </div>
          <div className="w-full md:w-48">
            <Select
              placeholder="Status"
              options={[
                { value: "upcoming", label: "Upcoming" },
                { value: "ongoing", label: "Ongoing" },
                { value: "completed", label: "Completed" },
              ]}
              className="text-sm"
            />
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
            <Filter size={18} />
            Filter
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interTournaments.map((tournament) => (
            <InterTournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterUniversityTournamentsSection;
