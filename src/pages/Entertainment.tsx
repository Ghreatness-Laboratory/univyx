import { motion } from "framer-motion";
import Articles from "../components/layouts/entertainment/Articles";
import Events from "../components/layouts/entertainment/Events";
import Header from "../components/layouts/entertainment/Header";
import News from "../components/layouts/entertainment/News";
import TrendingTopics from "../components/layouts/entertainment/TrendingTopics";

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
        <Header />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <News />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Articles />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Events />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <TrendingTopics />
      </motion.div>
    </main>
  );
}
