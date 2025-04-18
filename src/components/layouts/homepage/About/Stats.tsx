import { motion } from "framer-motion";

interface StatisticsProps {
  count: string;
  content: string;
}

const statistics: StatisticsProps[] = [
  {
    count: "#1",
    content:
      "As the foremost agency in our domain, we continuously lead by example, setting benchmarks for innovation, reliability, and customer-centricity.",
  },
  {
    count: "10+",
    content:
      "With a network of dedicated partners, we drive impactful initiatives and innovative solutions that support student growth and success.",
  },
  {
    count: "20✦",
    content:
      "Our student ambassadors bridge connections between students, creating a vibrant, inclusive, and supportive campus environment.",
  },
  {
    count: "18+",
    content:
      "We collaborate with more than 18 renowned universities, fostering strong academic partnerships that provide students with valuable learning experiences.",
  },
];

export default function Stats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const countVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    }
  };

  return (
    <motion.div
      data-testid="stats"
      className="max-w-[1120px] w-full mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {statistics.map((stats, index) => (
        <motion.div
          key={index}
          className="flex flex-col self-start gap-6 max-md:gap-2 md:max-w-[256px] w-full text-center md:text-left"
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px]"
            variants={countVariants}
          >
            {stats.count}
          </motion.h1>
          <motion.p 
            className="text-secondary font-normal text-base max-md:text-balance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          >
            {stats.content}
          </motion.p>
        </motion.div>
      ))}
    </motion.div>
  );
}