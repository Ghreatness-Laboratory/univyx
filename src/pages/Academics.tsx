import { motion } from "framer-motion";
import General from "../components/layouts/academics/General";
import Tech from "../components/layouts/academics/Tech";
import ResourceSection from "../components/layouts/academics/resourceSection";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Academics() {
  return (
    <div data-testid="academics-page">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <General />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <ResourceSection />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Tech />
      </motion.div>
    </div>
  );
}
