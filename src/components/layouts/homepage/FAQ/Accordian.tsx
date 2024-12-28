interface AccordianProps {
  content: {
    question: string;
    answer: string;
  };
  isOpen: boolean;
  onToggle: () => void;
}

const fadeInDown = {
  animation: "fadeInDown 0.2s linear",
};

export default function Accordian({
  content,
  isOpen,
  onToggle,
}: AccordianProps) {
  return (
    <div
      className={`px-3 py-2 md:p-[30px] flex flex-col gap-2 md:gap-5 rounded-[10px] ${
        isOpen ? "bg-[#F9F9FB] border-none" : "border border-[#D6D6D6]"
      }`}
    >
      <div className="flex max-md:flex-col items-center max-md:items-start justify-between max-md:gap-5">
        <h6 className="text-primary text-2xl font-medium animate-fadeInDown">
          {content.question}
        </h6>
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`answer-${content.question}`}
        >
          {isOpen ? (
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6.5 12H18.5"
                stroke="#0D0D0D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6.5 12H12.5M12.5 12H18.5M12.5 12V18M12.5 12V6"
                stroke="#0D0D0D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <span className="sr-only">Toggle answer</span>
        </button>
      </div>
      {isOpen && (
        <p
          id={`answer-${content.question}`}
          className="text-secondary text-base font-normal"
          style={fadeInDown}
        >
          {content.answer}
        </p>
      )}
    </div>
  );
}
