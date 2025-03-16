// File: components/gaming/IntraUniversityTournamentsSection.tsx
import { ChevronLeft, ChevronRight, School, Trophy } from "lucide-react";
import React, { useState } from "react";
import { Tournament, University } from "../../../../types/gaming";
import Select from 'react-select';
import IntraTournamentCard from "./IntraUniCard";

interface IntraUniversityTournamentsSectionProps {
  tournaments: Tournament[];
  universities: University[];
}

const IntraUniversityTournamentsSection: React.FC<
  IntraUniversityTournamentsSectionProps
> = ({ tournaments, universities }) => {
  const [selectedUniversity, setSelectedUniversity] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const universityOptions = universities.map((uni) => ({
    value: uni.id,
    label: uni.name,
  }));

  const filteredTournaments = tournaments.filter(
    (tournament) =>
      !selectedUniversity ||
      tournament.university ===
        universities.find((u) => u.id === selectedUniversity.value)?.name
  );

  const indexOfLastTournament = currentPage * itemsPerPage;
  const indexOfFirstTournament = indexOfLastTournament - itemsPerPage;
  const currentTournaments = filteredTournaments.slice(
    indexOfFirstTournament,
    indexOfLastTournament
  );
  const totalPages = Math.ceil(filteredTournaments.length / itemsPerPage);

  return (
    <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900">
          Intra-University Tournaments
        </h2>
        <p className="text-gray-600 mt-2">
          Compete against fellow students from your university
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Your University
          </label>
          <Select
            options={universityOptions}
            placeholder="Select university..."
            value={selectedUniversity}
            onChange={(option) => setSelectedUniversity(option)}
            className="w-full md:w-72"
          />
        </div>

        {selectedUniversity ? (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2">
                {universities.find((u) => u.id === selectedUniversity.value)
                  ?.logo && (
                  <img
                    src={
                      universities.find(
                        (u) => u.id === selectedUniversity.value
                      )?.logo
                    }
                    alt={selectedUniversity.label}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <h3 className="text-xl font-semibold">
                  {selectedUniversity.label} Tournaments
                </h3>
              </div>
            </div>

            {currentTournaments.length > 0 ? (
              <div className="space-y-4">
                {currentTournaments.map((tournament) => (
                  <IntraTournamentCard
                    key={tournament.id}
                    tournament={tournament}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Trophy size={48} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600">
                  No tournaments found for {selectedUniversity.label}
                </p>
              </div>
            )}

            {/* Pagination */}
            {filteredTournaments.length > itemsPerPage && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                  >
                    <ChevronLeft size={20} className="text-gray-500" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
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
                    )
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                  >
                    <ChevronRight size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10">
            <School size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">
              Select your university to view tournaments
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default IntraUniversityTournamentsSection;
