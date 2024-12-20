import Image from "../../../assets/images/aboutUs/image.png";
import TimelineImage from "../../../assets/images/aboutUs/timeline-image.png";

export default function OurJourney() {
  return (
    <div>
      <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-6 md:gap-[50px] px-6 lg:px-0 py-12 md:py-[100px]">
        <div className="flex max-md:flex-col max-md:gap-6 md:items-center justify-between">
          <h1 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium  leading-[44px] md:leading-[60px] tracking-[-0.72px] mdLtracking-[-0.96px]">
            Our journey so far
          </h1>
          <p className="md:max-w-[486px] w-full text-secondary text-base font-normal max-md:p-2.5">
            At its core, transforming dreams into reality begins with a clear
            vision. It's about envisioning the future you desire and setting
            goals that align with your dreams. This vision serves as your
            guiding star, illuminating the path forward.
          </p>
        </div>

        <div className="flex max-md:flex-col gap-6 justify-between">
          <div className="flex gap-[15px]">
            <div>
              <img
                src={TimelineImage}
                alt="Timeline"
                width={2}
                height={462}
                className="w-full h-full object-cover"
                aria-required
              />
            </div>

            <div className="max-w-[294px] w-full flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <h6 className="text-primary text-2xl font-medium">
                  Personal Meeting
                </h6>
                <p className="max-sm:max-w-[268px] text-secondary text-base font-normal">
                  Our personal meetings provide a safe and confidential space
                  for you
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-primary text-2xl font-medium">
                  Anxiety Disorder
                </h6>
                <p className="max-sm:max-w-[268px] text-secondary text-base font-normal">
                  Our personal meetings provide a safe and confidential space
                  for you
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="ttext-primary text-2xl font-medium">
                  Family Counselling
                </h6>
                <p className="max-sm:max-w-[268px] text-secondary text-base font-normal">
                  Our personal meetings provide a safe and confidential space
                  for you
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <img
              src={Image}
              alt="About Us"
              width={486}
              height={386}
              className="w-full h-full rounded-[20px] object-cover"
              aria-required
            />
          </div>
        </div>
      </section>
    </div>
  );
}
