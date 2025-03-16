import { motion } from "framer-motion";
import InterUniversityTournamentsSection from "../components/layouts/gaming/InterUniSection";
import IntraUniversityTournamentsSection from "../components/layouts/gaming/IntraUniSection";
import RankingsSection from "../components/layouts/gaming/Ranking/Ranking";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

import Events from "../components/layouts/gaming/Events";
import Header from "../components/layouts/gaming/Header";
import { games } from "../data/gaming/games";
import { playerRankings } from "../data/gaming/playerRankings";
import { tournaments } from "../data/gaming/tournaments";
import { universities } from "../data/gaming/university";
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
        <InterUniversityTournamentsSection
          interTournaments={tournaments.filter(
            (tournament) => tournament.type === "inter"
          )}
          popularGames={games}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <IntraUniversityTournamentsSection
          tournaments={tournaments.filter(
            (tournament) => tournament.type === "intra"
          )}
          universities={universities}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <RankingsSection
          playerRankings={playerRankings}
          popularGames={games}
          universities={universities}
        />
      </motion.div>
    </main>
  );
}
