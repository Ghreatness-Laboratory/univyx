import { motion } from "framer-motion";
import FeaturesCard from "./FeaturesCard";

export default function Features() {
  return (
    <div id="services">
      <section className="max-w-[1120px] w-full mx-auto flex justify-between max-md:flex-col max-lg:gap-7 sm:px-6 lg:px-0 py-12 md:py-[100px]">
        <motion.div
          className="md:max-w-[364px] w-full px-6 md:px-0 max-md:text-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-col gap-1">
            <motion.span
              className="text-secondary text-sm font-normal"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Features
            </motion.span>
            <motion.h1
              className="text-primary text-4xl md:text-5xl font-semibold md:font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] mdLtracking-[-0.96px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Your Campus Connect.
            </motion.h1>
          </div>
          <motion.p
            className="text-secondary text-base font-normal pt-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            viewport={{ once: true }}
          >
            "Your Campus Connect" is your hub for university life enhancement.
            We provide the community, resources, and opportunities needed to
            excel.
          </motion.p>
        </motion.div>
        <FeaturesCard />
      </section>
    </div>
  );
}
