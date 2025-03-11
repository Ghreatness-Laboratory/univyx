import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UniversityData } from "../../../../types/universityProfile";
import CollegeCard from "./CollegeCard";
import CourseCard from "./CourseCard";
import Pagination from "./Pagination";

interface UniversityProfileProps {
  university: UniversityData;
}

export default function UniversityProfile({
  university,
}: UniversityProfileProps) {
  const [activeCollege, setActiveCollege] = useState<number | null>(
    university.colleges[0]?.id || null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topOffset = window.innerWidth < 768 ? 100 : 200;
    const elementPosition =
      profileRef.current?.getBoundingClientRect().top || 0;
    const offsetPosition = elementPosition + window.pageYOffset - topOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, [activeCollege]);

  const selectedCollege = university.colleges.find(
    (college) => college.id === activeCollege
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(
        prev + 1,
        Math.ceil((selectedCollege?.courses.length || 0) / coursesPerPage)
      )
    );
  };

  const paginatedCourses = selectedCollege?.courses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  return (
    <AnimatePresence>
      <motion.div
        ref={profileRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="mt-8 border rounded-lg overflow-hidden bg-white"
      >
        <div className="p-4 md:p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-primary mb-1">
                {university.name}
              </h2>
              <p className="text-secondary">{university.location}</p>
            </div>
            <Link
              to={university.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 text-sm py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors "
            >
              Visit Website <ExternalLink size={16} />
            </Link>
          </div>
          <p className="mt-4 text-secondary">{university.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 p-4 md:p-6">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold text-primary">Colleges</h3>
            {university.colleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                isActive={college.id === activeCollege}
                onClick={() => {
                  setActiveCollege(college.id);
                  setCurrentPage(1);
                }}
              />
            ))}
          </div>

          <div className="lg:col-span-2">
            {selectedCollege && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-primary mb-6">
                  {selectedCollege.name}
                </h3>

                <div className="mb-8">
                  <h4 className="font-semibold text-primary mb-4">
                    Admission Requirements
                  </h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {selectedCollege.admissionRequirements.map(
                      (requirement, index) => (
                        <li key={index} className="text-secondary text-sm">
                          {requirement}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="text-primary font-semibold mb-3">Courses</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {paginatedCourses?.map((course, index) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        isFirst={index === 0}
                      />
                    ))}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(
                      (selectedCollege?.courses.length || 0) / coursesPerPage
                    )}
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="p-4 md:p-6 border-t">
          <h3 className="text-xl font-semibold text-primary mb-6">
            Student Ambassadors
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {university.ambassadors.map((ambassador) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={ambassador.id}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={ambassador.image}
                    alt={ambassador.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-primary">
                    {ambassador.name}
                  </h4>
                  <p className="text-secondary mb-2">{ambassador.role}</p>
                  <p>
                    Email:{" "}
                    <span className="text-secondary">{ambassador.email}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
