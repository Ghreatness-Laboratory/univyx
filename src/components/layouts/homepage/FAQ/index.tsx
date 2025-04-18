import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Accordion from "./Accordian";

const questions_and_answer = [
  {
    question: "What is Univyx all about?",
    answer:
      "Univyx is a pioneering platform designed to transform the student experience in private universities, providing a comprehensive ecosystem of community, resources, opportunities, and gaming.",
  },
  {
    question: "Is Univyx only for private university students?",
    answer:
      "Yes, Univyx is specifically designed for private university students aged 18-25, addressing their unique needs and challenges.",
  },
  {
    question: "What features does Univyx offer?",
    answer:
      "Univyx offers academic resources, community forums, gaming competitions, a marketplace for student entrepreneurs, remote internship opportunities, and tech networking.",
  },
  {
    question: "How can I sign up for Univyx?",
    answer:
      "You can sign up by visiting our website and creating an account using your private university email address.",
  },
  {
    question: "Are there gaming tournaments on Univyx?",
    answer:
      "Yes, Univyx hosts both intra and inter-university gaming competitions, fostering teamwork and healthy competition among students.",
  },
  {
    question: "Does Univyx provide academic resources?",
    answer:
      "Yes, Univyx provides access to past questions, notes, and other study materials to help students excel academically.",
  },
  {
    question: "How can I get support if I have an issue?",
    answer:
      "You can reach out to our support team through the help center on our website or via email at support@univyx.com.",
  },
  {
    question: "Can I sell my products on Univyx?",
    answer:
      "Absolutely! Univyx Store is a marketplace for student entrepreneurs to sell their products and services to the university community.",
  },
  {
    question: "How does Univyx help with career development?",
    answer:
      "Univyx provides access to remote internship opportunities and connections with tech professionals for mentorship and career growth.",
  },
];

export default function FAQ() {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3;

  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const filteredQuestions = questions_and_answer.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  const currentQuestions = filteredQuestions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <section className="max-w-[1120px] w-full mx-auto flex max-lg:flex-col justify-between gap-3 md:gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
        <motion.div
          className="md:max-w-md flex flex-col gap-5 max-md:text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px]">
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            className="text-secondary text-base font-normal"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Find answers to common questions about Univyx, our features, and how
            we can enhance your university experience.
          </motion.p>
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.form
            action="#"
            className="relative mt-2 mb-8"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.input
              type="text"
              name="FAQ"
              id="faq"
              placeholder="Search..."
              className="py-3 md:py-5 pr-5 pl-14 rounded-[10px] border border-[#D6D6D6] text-secondary text-lg md:text-xl font-normal w-full outline-primary"
              aria-label="Search input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0);
              }}
              whileFocus={{ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.2)" }}
            />
            <motion.svg
              className="absolute left-5 top-[30%] md:top-[35%] -translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              animate={{
                rotate: searchTerm ? [0, -20, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                times: [0, 0.6, 1],
              }}
            >
              <path
                d="M15.5 15L21.5 21M10.5 17C6.63401 17 3.5 13.866 3.5 10C3.5 6.13401 6.63401 3 10.5 3C14.366 3 17.5 6.13401 17.5 10C17.5 13.866 14.366 17 10.5 17Z"
                stroke="#0D0D0D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.form>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="space-y-6 md:space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {currentQuestions.length > 0 ? (
                currentQuestions.map((content, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  >
                    <Accordion
                      content={content}
                      isOpen={openAccordionIndex === index}
                      onToggle={() => handleAccordionToggle(index)}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center text-center min-h-[40vh] space-y-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-16 h-16 text-gray-400"
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    <path
                      d="M15.5 15L21.5 21M10.5 17C6.63401 17 3.5 13.866 3.5 10C3.5 6.13401 6.63401 3 10.5 3C14.366 3 17.5 6.13401 17.5 10C17.5 13.866 14.366 17 10.5 17Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                  <motion.p
                    className="text-xl text-secondary font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Oops! No matching results found.
                  </motion.p>
                  <motion.p
                    className="text-gray-500 text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Try searching with different keywords.
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center gap-4 mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <motion.button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`p-2 rounded-full ${
                  currentPage === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primary hover:bg-gray-200"
                }`}
                whileHover={currentPage !== 0 ? { scale: 1.1 } : {}}
                whileTap={currentPage !== 0 ? { scale: 0.9 } : {}}
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </motion.button>

              <span className="text-lg text-secondary">
                Page {currentPage + 1} of {totalPages}
              </span>

              <motion.button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className={`p-2 rounded-full ${
                  currentPage >= totalPages - 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primary hover:bg-gray-200"
                }`}
                whileHover={currentPage < totalPages - 1 ? { scale: 1.1 } : {}}
                whileTap={currentPage < totalPages - 1 ? { scale: 0.9 } : {}}
              >
                <ChevronRightIcon className="h-6 w-6" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
