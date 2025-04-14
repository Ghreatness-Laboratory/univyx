import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

import Events from "../components/layouts/gaming/Events";
import Gallery from "../components/layouts/gaming/Gallery";
import Header from "../components/layouts/gaming/Header";
import Leaderboards from "../components/layouts/gaming/leaderboard";
import Tournaments from "../components/layouts/gaming/Tournament";
import {
  popularGames,
  tournaments,
  universities,
} from "../data/gaming/tournaments";
import { upcomingEvents } from "../data/gaming/upcomingEvents";

export default function Entertainment() {
  return (
    <main data-testid="gaming-page">
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
        <Events upcomingEvents={upcomingEvents} />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Tournaments
          tournaments={tournaments}
          universities={universities}
          popularGames={popularGames}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Leaderboards />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Gallery />
      </motion.div>
    </main>
  );
}
