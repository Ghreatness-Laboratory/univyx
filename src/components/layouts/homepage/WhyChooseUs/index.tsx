import Button from "../../../common/Button";
import CreativeAndUniqueSolutions from "./CreativeAndUniqueSolutions";

export default function WhyChooseUs() {
  return (
    <div>
      <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[30px] md:gap-[50px] px-6 lg:px-0 py-12 md:py-[100px]">
        <div className="flex max-md:flex-col items-center gap-3 justify-between">
          <h1 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium  leading-[44px] md:leading-[60px] tracking-[-0.72px] mdLtracking-[-0.96px] max-w-[567px] text-center md:text-left">
            Creative and Unique Solutions
          </h1>
          <Button
            href="/about-us"
            className="flex items-center justify-center px-4 py-2.5 gap-1.5 min-w-40"
            isIconOnly={false}
            ariaLabel="Learn More About Us"
          >
            <p className="text-base font-semibold">Learn More</p>
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </div>

        <CreativeAndUniqueSolutions />
      </section>
    </div>
  );
}
