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

const Solution = ({ title, content, isActive, onClick }: SolutionProps) => {
  return (
    <div className="flex max-lg:flex-col lg:items-center gap-3 justify-between">
      <h3 className="text-primary text-[30px] leading-[38px] font-medium w-[187px]">
        {title}
      </h3>
      <p className="text-secondary text-base font-normal lg:max-w-[347px] w-full">
        {content}
      </p>
      <Button
        isIconOnly={true}
        onClick={onClick}
        className={`p-2 rounded-full transition-all w-fit ${
          isActive ? "bg-[#64748B]" : "bg-white"
        }`}
        ariaLabel="See More"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M4.1665 10H15.8332M15.8332 10L10.8332 5M15.8332 10L10.8332 15"
            stroke={isActive ? "#FFFFFF" : "#64748B"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </div>
  );
};

export default function CreativeAndUniqueSolutions() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <section className="max-w-[1120px] w-full mx-auto flex max-lg:flex-col gap-12 md:justify-between md:gap-8 items-center">
        <div className="lg:max-w-[698px] w-full space-y-16 sm:space-y-10 lg:space-y-16">
          {solutions.map((item, index) => (
            <Solution
              key={index}
              title={item.title}
              content={item.content}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div className="w-full md:h-[500px] lg:h-full lg:w-[390px]">
          <img
            src={solutions[activeIndex].image}
            alt="Solution Image"
            width={390}
            height={650}
            className="w-full h-[500px] object-cover rounded-[20px] transition-all duration-500"
          />
        </div>
      </section>
    </div>
  );
}
