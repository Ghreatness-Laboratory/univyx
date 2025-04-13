import {
  ChevronLeft,
  ChevronRight,
  Filter,
  School,
  Search,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Tournament, University } from "../../../../types/gaming";
import TournamentCard from "./TournamentCard";

interface TournamentsSectionProps {
  tournaments: Tournament[];
  universities: University[];
  popularGames: string[];
}

const Tournaments: React.FC<TournamentsSectionProps> = ({
  tournaments,
  universities,
  popularGames,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedGame, setSelectedGame] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTournaments, setFilteredTournaments] =
    useState<Tournament[]>(tournaments);
  const itemsPerPage = 4;

  const universityOptions = universities.map((uni) => ({
    value: uni.id,
    label: uni.name,
  }));

  const typeOptions = [
    { value: "all", label: "All Tournaments" },
    { value: "inter", label: "Inter-University" },
    { value: "intra", label: "Intra-University" },
  ];

  const gameOptions = popularGames.map((game) => ({
    value: game,
    label: game,
  }));

  useEffect(() => {
    let filtered = tournaments;

    if (searchTerm) {
      filtered = filtered.filter(
        (tournament) =>
          tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tournament.game.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType && selectedType.value !== "all") {
      filtered = filtered.filter(
        (tournament) => tournament.type === selectedType.value
      );
    }

    if (selectedUniversity) {
      filtered = filtered.filter(
        (tournament) =>
          tournament.university ===
          universities.find((u) => u.id === selectedUniversity.value)?.name
      );
    }

    if (selectedGame && selectedGame.value !== "all") {
      filtered = filtered.filter(
        (tournament) => tournament.game === selectedGame.value
      );
    }

    setFilteredTournaments(filtered);
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedType,
    selectedUniversity,
    selectedGame,
    selectedStatus,
    tournaments,
    universities,
  ]);

  const indexOfLastTournament = currentPage * itemsPerPage;
  const indexOfFirstTournament = indexOfLastTournament - itemsPerPage;
  const currentTournaments = filteredTournaments.slice(
    indexOfFirstTournament,
    indexOfLastTournament
  );
  const totalPages = Math.ceil(filteredTournaments.length / itemsPerPage);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType(null);
    setSelectedUniversity(null);
    setSelectedGame(null);
    setSelectedStatus(null);
  };

  return (
    <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
      <div>
        <h2 className="text-4xl md:text-5xl font-semibold">
          Gaming Tournaments
        </h2>
        <p className="text-secondary text-lg mt-1">
          Compete in tournaments both within and across universities
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="w-full md:w-48">
          <Select
            placeholder="Tournament Type"
            options={typeOptions}
            value={selectedType}
            onChange={(option) => setSelectedType(option)}
            className="text-sm"
            isClearable
          />
        </div>

        <div className="w-full md:w-48">
          <Select
            placeholder="University"
            options={universityOptions}
            value={selectedUniversity}
            onChange={(option) => setSelectedUniversity(option)}
            className="text-sm"
            isClearable
          />
        </div>

        <div className="w-full md:w-48">
          <Select
            placeholder="Game"
            options={gameOptions}
            value={selectedGame}
            onChange={(option) => setSelectedGame(option)}
            className="text-sm"
            isClearable
          />
        </div>

        <button
          onClick={resetFilters}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <Filter size={18} />
          Reset
        </button>
      </div>

      {currentTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <School size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600">
            No tournaments found matching your criteria
          </p>
          {(searchTerm ||
            selectedType ||
            selectedUniversity ||
            selectedGame ||
            selectedStatus) && (
            <button
              onClick={resetFilters}
              className="mt-4 text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {filteredTournaments.length > itemsPerPage && (
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} className="text-gray-500" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Tournaments;
