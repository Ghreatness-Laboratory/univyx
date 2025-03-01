import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Accordian from "./Accordian";

const questions_and_answer = [
  {
    question: "What is Univyx all about?",
    answer:
      "Univyx is a digital platform designed to enhance student learning experiences by providing resources, collaboration tools, and academic insights.",
  },
  {
    question: "What features does Univyx offer?",
    answer:
      "Univyx offers personalized study plans, peer collaboration, AI-powered learning tools, and access to expert guidance.",
  },
  {
    question: "Is Univyx open to all universities?",
    answer:
      "Yes, Univyx is open to students from all universities. It aims to create a universal learning hub for students worldwide.",
  },
  {
    question: "How can I sign up for Univyx?",
    answer:
      "You can sign up by visiting our website and creating an account using your university email or personal email.",
  },
  {
    question: "Is there a mobile app available?",
    answer: "No.",
  },
  {
    question: "Does Univyx provide free resources?",
    answer:
      "Yes, Univyx provides a mix of free and premium resources, including open-source learning materials and expert courses.",
  },
  {
    question: "How can I get support if I have an issue?",
    answer:
      "You can reach out to our support team through the help center on our website or via email support@univyx.com.",
  },
  {
    question: "Can I collaborate with other students on projects?",
    answer:
      "Absolutely! Univyx provides collaboration tools that allow students to work on projects, share ideas, and discuss topics.",
  },
  {
    question: "Does Univyx support multiple languages?",
    answer:
      "Yes, Univyx supports multiple languages, making it accessible to students worldwide.",
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
      <section className="max-w-[753px] w-full mx-auto flex flex-col gap-3 md:gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
        <div className="flex flex-col gap-5 text-center">
          <h1 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px]">
            Frequently Asked Questions
          </h1>
          <p className="text-secondary text-base font-normal">
            Lorem ipsum dolor sit amet consectetur. Orci malesuada mi et mi
            pellentesque tincidunt at mollis facilisis. Nisl eu blandit nunc
            parturient adipiscing commodo.
          </p>
        </div>

        <div>
          <form action="#" className="relative mt-2 mb-8">
            <input
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
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M15.5 15L21.5 21M10.5 17C6.63401 17 3.5 13.866 3.5 10C3.5 6.13401 6.63401 3 10.5 3C14.366 3 17.5 6.13401 17.5 10C17.5 13.866 14.366 17 10.5 17Z"
                stroke="#0D0D0D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </form>

          <div className="space-y-8">
            {currentQuestions.length > 0 ? (
              currentQuestions.map((content, index) => (
                <div key={index}>
                  <Accordian
                    content={content}
                    isOpen={openAccordionIndex === index}
                    onToggle={() => handleAccordionToggle(index)}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-xl min-h-[20vh] text-secondary">
                No results found
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`p-2 rounded-full ${
                  currentPage === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primary hover:bg-gray-200"
                }`}
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>

              <span className="text-lg text-secondary">
                Page {currentPage + 1} of {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className={`p-2 rounded-full ${
                  currentPage >= totalPages - 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primary hover:bg-gray-200"
                }`}
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
