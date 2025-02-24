import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import { universities } from "../../../../data/academics/universities";
import FeatureCard from "./FeatureCard";

type SelectOption = { value: string; label: string };

type StatCardProps = {
  value: string;
  label: string;
};

const StatCard = ({ value, label }: StatCardProps) => {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-primary mb-2">{value}</div>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

export default function ResourceSection() {
  const [selectedUniversity, setSelectedUniversity] =
    useState<SelectOption | null>(null);
  const navigate = useNavigate();

  const universityOptions: SelectOption[] = universities.map((uni) => ({
    value: uni.id.toString(),
    label: uni.name,
  }));

  const handleSelectChange = (newValue: SingleValue<SelectOption>) => {
    setSelectedUniversity(newValue);
  };

  return (
    <div data-testid="access-resources">
      <div className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
        <div className="text-center">
          <h1 className="text-primary text-4xl md:text-5xl font-semibold mb-3">
            Academic Notes & Resources
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Access a comprehensive collection of lecture notes, study materials,
            and academic resources contributed by students and faculty.
          </p>
        </div>

        <div className="flex max-md:flex-col gap-4 max-w-2xl w-full mx-auto">
          <Select
            options={universityOptions}
            value={selectedUniversity}
            onChange={handleSelectChange}
            className="md:w-3/4"
            placeholder="Select University"
          />
          <button
            disabled={!selectedUniversity}
            onClick={() =>
              selectedUniversity &&
              navigate(`/academics/${selectedUniversity.value}`)
            }
            className="md:w-1/4 px-6 py-2 bg-primary text-white rounded-md disabled:opacity-90 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            aria-label="Get Notes"
          >
            Get Resources
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            }
            title="Digital Library Access"
            description="Access thousands of academic journals, research papers, and e-books from leading publishers."
          />
          <FeatureCard
            icon={
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
                />
              </svg>
            }
            title="Study Groups"
            description="Join virtual study groups and connect with peers from your university for collaborative learning."
          />
          <FeatureCard
            icon={
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            }
            title="Research Support"
            description=" Get assistance with research methodologies, data analysis, and
              academic writing."
          />
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 mt-8 grid md:grid-cols-4 gap-8">
          <StatCard value="15+" label="Partner Universities" />
          <StatCard value="50K+" label="Study Resources" />
          <StatCard value="100K+" label="Active Students" />
          <StatCard value="95%" label="Satisfaction Rate" />
        </div>
      </div>
    </div>
  );
}
