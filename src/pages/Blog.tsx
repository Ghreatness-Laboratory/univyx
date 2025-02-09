import { motion } from "framer-motion";
import Blogs from "../components/layouts/blogs/Blogs";
import MemberStories from "../components/layouts/blogs/MemberStories";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Blog() {
  return (
    <main data-testid="blog-page">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Blogs />
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
