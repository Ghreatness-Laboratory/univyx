import { UniversityData } from "../../../../types/universityProfile";
import UniversityCard from "./UniversityCard";

interface UniversityCarouselProps {
  universities: UniversityData[];
  selectedUniversity: number| null;
  onSelectUniversity: (id: number) => void;
}

export default function UniversityCarousel({
  universities,
  onSelectUniversity,
}: UniversityCarouselProps) {
  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">Universities</h2>
      <div className="flex gap-4 pb-4 overflow-x-scroll hide-scrollbar">
        {universities.map((university) => (
          <UniversityCard
            key={university.id}
            university={university}
            onClick={() => onSelectUniversity(university.id)}
          />
        ))}
      </div>
      <div className="mt-2 text-center text-xs text-secondary">
        Scroll horizontally to view more universities
      </div>
    </div>
  );
}