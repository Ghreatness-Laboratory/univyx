import { motion } from "framer-motion";
import Blogs from "../components/layouts/entertainment/Blogs";
import MemberStories from "../components/layouts/entertainment/MemberStories";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Entertainment() {
  return (
    <main data-testid="entertainment-page">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Blogs />{" "}
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <MemberStories />
      </motion.div>
    </main>
  );
}
