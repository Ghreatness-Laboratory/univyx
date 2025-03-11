import { motion } from "framer-motion";
import { Course } from "../../../../types/universityProfile";

interface CourseCardProps {
  course: Course;
  isFirst?: boolean;
}
export default function CourseCard({ course, isFirst }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: isFirst ? 0 : 0.2 }}
      className="pb-4 "
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        key={course.id}
        className="border rounded-lg p-4 hover:shadow-sm transition-shadow h-40 flex flex-col justify-between"
      >
        <div>
          <h5 className="font-medium text-primary mb-2">{course.name}</h5>
          <p className="text-secondary text-sm">{course.description}</p>
        </div>
        <div className="mt-2 text-xs ">
          Duration: {course.duration}
        </div>
      </motion.div>
    </motion.div>
  );
}
