import { motion } from "framer-motion";
import Articles from "../components/layouts/entertainment/Articles";
import Events from "../components/layouts/entertainment/Events";
import News from "../components/layouts/entertainment/News";
import TrendingTopics from "../components/layouts/entertainment/TrendingTopics";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Entertainment() {
  return (
    <main data-testid="entertainment-page">
      <header className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:pt-[100px] pb-20 px-6 lg:px-0">
        <div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-3 md:mb-4">
              Campus Entertainment Hub
            </h1>
            <p className="text-base md:text-xl text-secondary mb-8">
              Your one-stop destination for everything happening on and around
              campus. Stay in the loop with campus events, activities, and
              trending spots.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 md:px-6 py-3 bg-primary text-white font-medium rounded-lg cursor-default">
                What's Happening Today?
              </button>
              <button className="flex gap-2 items-center px-4 md:px-6 py-3 border border-secondaary text-secondary shadow-sm font-medium rounded-lg cursor-default">
                Explore now
              </button>
            </div>
          </div>
        </div>
      </header>
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
