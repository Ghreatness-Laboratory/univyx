import { motion } from "framer-motion";
import { Library, Gamepad2, Radio } from "lucide-react";
import Button from "../../../common/Button";

const features = [
  {
    title: "Resource Hub",
    description:
      "Access a comprehensive library of past questions, study notes, and academic materials to enhance your learning experience.",
    icon: Library,
  },
  {
    title: "Gaming Platform",
    description:
      "Participate in exciting intra and inter-university gaming competitions that foster teamwork and healthy competition.",
    icon: Gamepad2,
  },
  {
    title: "Entertainment",
    description:
      "Stay updated with university news, articles, trending topics, and events to keep you informed and engaged.",
    icon: Radio,
  },
];

export default function FeaturesCard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -10 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="md:max-w-[575px] w-full flex flex-col gap-3 md:gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {features.map((feature, index) => {
        const IconComponent = feature.icon;

        return (
          <motion.div
            key={index}
            aria-label={feature.title}
            className="py-4 px-[30px] md:p-[30px] rounded-[20px] flex flex-col gap-5 items-center md:items-start text-center md:text-left bg-[#F9F9FB]"
            variants={cardVariants}
            whileHover={{
              y: -8,
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.06)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              className="w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-sm"
              variants={iconVariants}
            >
              <IconComponent
                size={32}
                strokeWidth={1.5}
                className="text-primary"
              />
            </motion.div>
            <div className="flex flex-col gap-3 w-full">
              <motion.h6
                className="text-primary text-2xl font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {feature.title}
              </motion.h6>
              <motion.p
                className="text-secondary text-base font-normal text-balance"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                {feature.description}
              </motion.p>
            </div>
          </motion.div>
        );
      })}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button
          href="?auth=signup"
          isIconOnly={false}
          className="py-4 px-[22px] max-sm:max-w-[338px] w-full grid place-self-center max-md:mt-4"
          ariaLabel="Explore All Features"
        >
          <p className="font-semibold text-[18px] leading-7 text-center">
            Explore All Features
          </p>
        </Button>
      </motion.div>
    </motion.div>
  );
}
