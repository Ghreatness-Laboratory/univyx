import FeaturesCard from "./FeaturesCard";

export default function Features() {
  return (
    <div id="services">
      <section className="max-w-[1120px] w-full mx-auto flex justify-between max-md:flex-col max-lg:gap-7 sm:px-6 lg:px-0 py-12 md:py-[100px]">
        <div className="md:max-w-[364px] w-full px-6 md:px-0 max-md:text-center">
          <div className="flex flex-col gap-1">
            <span className="text-secondary text-sm font-normal">Features</span>
            <h1 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium  leading-[44px] md:leading-[60px] tracking-[-0.72px] mdLtracking-[-0.96px]">
              Your Campus Connect.
            </h1>
          </div>
          <p className="text-secondary text-base font-normal pt-1">
            "Your Campus Connect" is your hub for university life enhancement.
            We provide the community, resources, and opportunities needed to
            excel.
          </p>
        </div>

        <FeaturesCard />
      </section>
    </div>
  );
}
