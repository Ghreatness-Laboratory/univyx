import { motion } from "framer-motion";
import { BookOpen, LucideIcon, Telescope, UserCheck, Zap } from "lucide-react"; // Import LucideIcon type
import { useState } from "react";
import { universitiesData } from "../../../../data/academics/universitiesProfile";
import UniversityCarousel from "./UniversityCarousel";
import UniversityProfile from "./UniversityProfle";

const GuidanceCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white border border-primary/10 rounded-xl p-5 shadow-sm flex flex-col items-center text-center space-y-3 transform transition-all"
  >
    <div className="bg-primary/10 p-3 rounded-full">
      <Icon className="text-primary w-8 h-8" />
    </div>
    <h3 className="font-bold text-primary text-lg">{title}</h3>
    <p className="text-secondary text-sm">{description}</p>
  </motion.div>
);

export default function UniversitiesProfile() {
  const [selectedUniversity, setSelectedUniversity] = useState<number | null>(
    null
  );

  const handleSelectUniversity = (id: number) => {
    setSelectedUniversity(id);
  };

  const guidanceCards = [
    {
      icon: Zap,
      title: "Discover Your Path",
      description: "Swipe through universities that match your academic dreams",
    },
    {
      icon: Telescope,
      title: "Explore in Depth",
      description:
        "Dive into detailed profiles and uncover hidden opportunities",
    },
    {
      icon: BookOpen,
      title: "Course Insights",
      description: "Check out departments, courses, and admission requirements",
    },
    {
      icon: UserCheck,
      title: "Connect & Grow",
      description: "Meet student ambassadors and get real campus insights",
    },
  ];

  return (
    <div data-testid="university-profile">
      <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
        <div>
          <h1 className="text-primary text-[32px] md:text-5xl font-bold leading-tight">
            Your University, Your Future
          </h1>
          <p className="text-secondary text-lg mt-3 max-w-3xl">
            Explore top private universities in Nigeria. Select a university to
            view detailed information about programs, admission requirements,
            and connect with student ambassadors.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-4 gap-4"
        >
          {guidanceCards.map((card, index) => (
            <GuidanceCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </motion.div>

        <UniversityCarousel
          universities={universitiesData}
          selectedUniversity={selectedUniversity}
          onSelectUniversity={handleSelectUniversity}
        />

        {selectedUniversity && (
          <UniversityProfile
            university={
              universitiesData.find((uni) => uni.id === selectedUniversity)!
            }
          />
        )}
      </section>
    </div>
  );
}
