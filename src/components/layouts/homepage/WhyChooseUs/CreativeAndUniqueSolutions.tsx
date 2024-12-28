import SolutionImage from "../../../../assets/images/homepage/why-choose-us-Frame 1.png";
import Button from "../../../common/Button";

interface SolutionProps {
  title: string;
  content: string;
}

const solutions: SolutionProps[] = [
  {
    title: "Discovery",
    content:
      "We begin by comprehending your goals and objectives, ensuring that our solutions align with your vision.",
  },
  {
    title: "Planning",
    content:
      "Effective planning is the cornerstone of success, whether in business, personal goals, or life's many endeavour's.",
  },
  {
    title: "Testing",
    content:
      "Testing is a critical component in the development process, ensuring that products, systems.",
  },
  {
    title: "Control",
    content:
      "In an ever-changing world, having control over your environment, decisions, and outcomes is essential to achieving success.",
  },
];

const Solution = (props: SolutionProps) => {
  return (
    <div className="flex max-lg:flex-col lg:items-center gap-3 justify-between">
      <h3 className="text-primary text-[30px] leading-[38px] font-medium w-[167px]">
        {props.title}
      </h3>
      <p className="text-secondary text-base font-normal lg:max-w-[347px] w-full">
        {props.content}
      </p>
      <Button
        isIconOnly={true}
        className="p-4 rounded-full"
        ariaLabel="See More"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M4.1665 10H15.8332M15.8332 10L10.8332 5M15.8332 10L10.8332 15"
            stroke="#64748B"
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
  return (
    <div>
      <section className="max-w-[1120px] w-full mx-auto flex max-lg:flex-col gap-12 md:justify-between md:gap-8 items-center">
        <div className="lg:max-w-[698px] w-full space-y-16 sm:space-y-10 lg:space-y-16">
          {solutions.map((item, index) => (
            <Solution key={index} title={item.title} content={item.content} />
          ))}
        </div>

        <div className="w-full md:h-[500px] lg:h-full lg:w-[390px]">
          <img
            src={SolutionImage}
            alt="Solution Image"
            width={390}
            height={650}
            className="w-full h-full object-cover rounded-[20px]"
          />
        </div>
      </section>
    </div>
  );
}
