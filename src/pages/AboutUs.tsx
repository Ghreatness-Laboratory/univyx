import { motion } from "framer-motion";
import Company from "../components/layouts/aboutUs/Company";
import OurCoreBeliefs from "../components/layouts/aboutUs/OurCoreBeliefs";
import OurJourney from "../components/layouts/aboutUs/OurJourney";
import Testimonials from "../components/layouts/aboutUs/Testimonials";
import FAQ from "../components/layouts/homepage/FAQ";
import Team from "../components/layouts/homepage/Team";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function AboutUs() {
  return (
    <main data-testid="about-us-page">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <OurJourney />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <OurCoreBeliefs />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Team />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Testimonials />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Company />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <FAQ />
      </motion.div>
    </main>
  );
}
