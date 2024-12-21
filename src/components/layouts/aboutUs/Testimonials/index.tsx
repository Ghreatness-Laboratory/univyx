import TestimonialProfilePic1 from "../../../../assets/images/aboutUs/testimonial-profile-pic-1.png";
import TestimonialProfilePic2 from "../../../../assets/images/aboutUs/testimonial-profile-pic-2.png";
import Button from "../../../common/Button";
import TestimonialCard, { TestimonialCardProps } from "./TestimonialCard";

const testimonials: TestimonialCardProps[] = [
  {
    name: "Artemisia Udinese",
    profession: "Marketing Specialist",
    comment:
      "As a long-time user of WDK AI ToolKit, I can confidently say that their solutions have revolutionised the way we operate. From the outset, the team provided exceptional support.",
    image: TestimonialProfilePic1,
    rating: 5,
  },
  {
    name: "Artemisia Udinese",
    profession: "Marketing Specialist",
    comment:
      "As a long-time user of WDK AI ToolKit, I can confidently say that their solutions have revolutionised the way we operate. From the outset, the team provided exceptional support.",
    image: TestimonialProfilePic2,
    rating: 5,
  },
];
export default function Testimonials() {
  return (
    <div>
      <section className="max-w-[1120px] w-full mx-auto flex max-lg:flex-col gap-[43px] md:gap-8 px-6 lg:px-0 py-12 md:py-[100px]">
        <div className="flex flex-col max-w-[352px] w-full">
          <span className="text-[14px] text-[#64748B] font-medium leading-5 mb-1">
            Testimonial
          </span>
          <h1 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium  leading-[44px] md:leading-[60px] tracking-[-0.72px] mdLtracking-[-0.96px]">
            Success stories
          </h1>
          <p className="text-secondary text-base font-normal pt-5 pb-10">
            The team at WDK AI ToolKit provided unparalleled support throughout
            our project.
          </p>
          <Button
            href=""
            className="flex items-center justify-center px-4 py-2.5 gap-1.5"
            isIconOnly={false}
            ariaLabel="View all testimonials"
          >
            <p className="text-base font-semibold">View All</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4.1665 10H15.8332M15.8332 10L10.8332 5M15.8332 10L10.8332 15"
                stroke="#FCFCFC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>

        <div className="flex max-md:flex-col gap-[43px] md:gap-8">
          {testimonials.map((content, index) => (
            <div key={index}>
              <TestimonialCard
                name={content.name}
                profession={content.profession}
                comment={content.comment}
                image={content.image}
                rating={content.rating}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
