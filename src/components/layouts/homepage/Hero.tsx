import { motion } from "framer-motion";
import HeroImage from "../../../assets/images/homepage/hero-image.png";

export default function Hero() {
  return (
    <div className="bg-[#F9F9FB]">
      <section className="max-w-[1120px] w-full mx-auto flex flex-col px-6 lg:px-0 py-12 md:py-[100px]">
        <motion.h3
          className="max-w-[902px] w-full text-primary font-semibold text-4xl md:text-7xl leading-[44px] md:leading-[90px] tracking-[-0.72px] md:tracking-[-1.44px]"
          data-testid="hero-heading"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Revolutionalizing the student experience
        </motion.h3>
        <div className="flex max-sm:flex-col gap-3 md:items-center justify-between text-secondary text-base font-normal mt-5 mb-[50px] ">
          <motion.p
            className="max-w-[277px]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Creating student connections with innovation and elation.
          </motion.p>
          <motion.p
            className="max-w-[372px]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Welcome to our platform, where private university students can
            connect, have fun, and game together. Join us today!
          </motion.p>
        </div>
        <motion.div
          className="max-w-[1120px] w-full max-h-[581px]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img
            src={HeroImage}
            alt="Hero Image"
            width={1120}
            height={581}
            className="rounded-lg md:rounded-[20px]"
            aria-label="Hero Image"
          />
        </motion.div>
      </section>
    </div>
  );
}
