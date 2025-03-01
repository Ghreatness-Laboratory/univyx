import { motion } from "framer-motion";

interface AccordionProps {
  content: {
    question: string;
    answer: string;
  };
  isOpen: boolean;
  onToggle: () => void;
}

const fadeInDown = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function Accordion({
  content,
  isOpen,
  onToggle,
}: AccordionProps) {
  return (
    <div
      className={`px-4 md:px-5 py-4 md:p-6 flex flex-col gap-3 rounded-xl transition-all duration-300 shadow-md border 
      ${isOpen ? "bg-white border-gray-300" : "bg-gray-50 border-gray-200"}`}
    >
      <div
        className="flex gap-2 justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <h6 className="text-primary text-lg md:text-xl font-medium">
          {content.question}
        </h6>
        <button
          aria-expanded={isOpen}
          aria-controls={`answer-${content.question}`}
        >
          {isOpen ? (
            <motion.svg
              initial={{ rotate: 0 }}
              animate={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 12h12"
                stroke="#0D0D0D"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </motion.svg>
          ) : (
            <motion.svg
              initial={{ rotate: 180 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 12h12M12 6v12"
                stroke="#0D0D0D"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </motion.svg>
          )}
        </button>
      </div>
      {isOpen && (
        <motion.p
          id={`answer-${content.question}`}
          className="text-secondary text-base"
          variants={fadeInDown}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {content.answer}
        </motion.p>
      )}
    </div>
  );
}
