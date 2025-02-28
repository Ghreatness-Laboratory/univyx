import { motion } from "framer-motion";
import Newsletter from "../components/layouts/entertainment/Newsletter";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Shop() {
  return (
    <main data-testid="shop-page">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Newsletter />
      </motion.div>
    </main>
  );
}
