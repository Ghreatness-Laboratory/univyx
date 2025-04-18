import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SolutionImage1 from "../../../../assets/images/homepage/why-choose-us-Frame 1.png";
import SolutionImage2 from "../../../../assets/images/homepage/why-choose-us-Frame 2.png";
import SolutionImage3 from "../../../../assets/images/homepage/why-choose-us-Frame 3.png";
import SolutionImage4 from "../../../../assets/images/homepage/why-choose-us-Frame 4.png";
import Button from "../../../common/Button";

interface SolutionProps {
  title: string;
  content: string;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const solutions = [
  {
    title: "Gaming Hub",
    content:
      "Connect with fellow gamers, participate in tournaments, and showcase your skills in an inclusive community that celebrates esports and gaming culture.",
    image: SolutionImage1,
  },
  {
    title: "Academics",
    content:
      "Access past questions, notes, and study materials to excel in your academic journey. Knowledge shared is knowledge multiplied.",
    image: SolutionImage2,
  },
  {
    title: "Business",
    content:
      "Discover entrepreneurial opportunities, gain insights from industry leaders, and turn ideas into successful ventures.",
    image: SolutionImage3,
  },
  {
    title: "Entertainment",
    content:
      "Stay in the loop with the latest university news, trending topics, and events, ensuring you're always engaged and informed.",
    image: SolutionImage4,
  },
];

const Solution = ({
  title,
  content,
  isActive,
  onClick,
  index,
}: SolutionProps) => {
  return (
    <motion.div
      className="flex max-lg:flex-col lg:items-center gap-3 justify-between"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <motion.h3
        className="text-primary text-[30px] leading-[38px] font-medium w-[187px]"
        animate={{
          color: isActive ? "#000000" : "#1F2937",
          fontWeight: isActive ? "600" : "500",
        }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-secondary text-base font-normal lg:max-w-[347px] w-full"
        animate={{ opacity: isActive ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </motion.p>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          isIconOnly={true}
          onClick={onClick}
          className={`p-2 rounded-full transition-all w-fit ${
            isActive ? "bg-[#64748B]" : "bg-white"
          }`}
          ariaLabel="See More"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 20 20"
            fill="none"
            transition={{
              repeat: isActive ? Infinity : 0,
              repeatType: "loop",
              duration: 1,
              repeatDelay: 1,
            }}
          >
            <path
              d="M4.1665 10H15.8332M15.8332 10L10.8332 5M15.8332 10L10.8332 15"
              stroke={isActive ? "#FFFFFF" : "#64748B"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default function CreativeAndUniqueSolutions() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <section className="max-w-[1120px] w-full mx-auto flex max-lg:flex-col gap-12 md:justify-between md:gap-8 items-center">
        <motion.div
          className="lg:max-w-[698px] w-full space-y-16 sm:space-y-10 lg:space-y-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, staggerChildren: 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {solutions.map((item, index) => (
            <Solution
              key={index}
              title={item.title}
              content={item.content}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          className="w-full md:h-[500px] lg:h-full lg:w-[390px]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={solutions[activeIndex].image}
              alt="Solution Image"
              width={390}
              height={650}
              className="w-full h-[500px] object-cover rounded-[20px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
