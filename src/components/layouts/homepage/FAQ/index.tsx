import { useState } from "react";
import Accordian from "./Accordian";

const questions_and_answer = [
  {
    question: "What is Univyx all about?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
  },
  {
    question: "What features does it offer?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
  },
  {
    question: "Is is open to all universities?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
  },
];

export default function FAQ() {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const filteredQuestions = questions_and_answer.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <section className="max-w-[753px] w-full mx-auto flex flex-col gap-3 md:gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
        <div className="flex flex-col gap-5 text-center">
          <h1 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px]">
            Frequently asked questions.
          </h1>
          <p className="text-secondary text-base font-normal">
            Lorem ipsum dolor sit amet consectetur. Orci malesuada mi et mi
            pellentesque tincidunt at mollis facilisis. Nisl eu blandit nunc
            parturient adipiscing commodo.
          </p>
        </div>

        <div>
          <form action="#" className="relative mb-8">
            <input
              type="text"
              name="FAQ"
              id="faq"
              placeholder="Search"
              className="py-[30px] pr-[30px] pl-[70px] rounded-[10px] border border-[#D6D6D6] text-secondary text-2xl font-normal w-full outline-primary"
              aria-label="Search input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-[30px] top-1/2 -translate-y-1/2"
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
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((content, index) => (
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
        </div>
      </section>
    </div>
  );
}
