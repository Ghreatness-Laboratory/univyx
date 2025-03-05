import { College } from "../../../../types/universityProfile";

interface CollegeCardProps {
  college: College;
  isActive: boolean;
  onClick: () => void;
}

export default function CollegeCard({
  college,
  isActive,
  onClick,
}: CollegeCardProps) {
  return (
    <div
      className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
        isActive ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <h3
        className={`text-base font-semibold ${
          isActive ? "text-primary" : "text-secondary"
        }`}
      >
        {college.name}
      </h3>
      <p className="text-sm text-secondary mt-1">
        {college.courses.length} Courses
      </p>
    </div>
  );
}
