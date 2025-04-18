import { motion } from "framer-motion";
import Button from "../../../common/Button";
import CreativeAndUniqueSolutions from "./CreativeAndUniqueSolutions";

export default function WhyChooseUs() {
  return (
    <div>
      <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[30px] md:gap-[50px] px-6 lg:px-0 py-12 md:py-[100px]">
        <div className="flex max-md:flex-col items-center gap-3 justify-between">
          <motion.h1 
            className="text-primary text-4xl md:text-5xl font-semibold md:font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px] max-w-[567px] text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Your ultimate university companion
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              href="?auth=signup"
              className="flex items-center justify-center px-4 py-2.5 gap-1.5 min-w-40 my-6"
              isIconOnly={false}
              ariaLabel="Sign Up for Univyx"
            >
              <p className="text-base font-semibold">Join Now</p>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 1.5, 
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
              >
                <path
                  d="M4.1665 10H15.8332M15.8332 10L10.8332 5M15.8332 10L10.8332 15"
                  stroke="#FCFCFC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </Button>
          </motion.div>
        </div>

        <CreativeAndUniqueSolutions />
      </section>
    </div>
  );
}