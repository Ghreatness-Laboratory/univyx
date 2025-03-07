import { motion } from "framer-motion";
import AboutUs from "../components/layouts/homepage/About";
import FAQ from "../components/layouts/homepage/FAQ";
import Features from "../components/layouts/homepage/Features";
import GetStarted from "../components/layouts/homepage/GetStarted";
import Hero from "../components/layouts/homepage/Hero";
import Partners from "../components/layouts/homepage/Partners";
import Team from "../components/layouts/homepage/Team";
import WhyChooseUs from "../components/layouts/homepage/WhyChooseUs";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Home() {
  return (
    <main data-testid="home-page">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Hero />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <AboutUs />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Features />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <WhyChooseUs />
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
        <GetStarted />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <Partners />
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
