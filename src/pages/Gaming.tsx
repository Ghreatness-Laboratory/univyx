import { motion } from "framer-motion";
import Header from "../components/layouts/gaming/Header";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Gaming() {
  return (
    <main data-testid="gaming-page">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Header />
      </motion.div>
    </main>
  );
}
