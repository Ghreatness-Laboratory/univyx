import HeroImage from "../../../assets/images/homepage/hero-image.png";

export default function Hero() {
  return (
    <div>
      <section className="max-w-[1120px] w-full mx-auto flex flex-col px-6 lg:px-0 py-12 md:py-[100px]">
        <h3
          className="max-w-[902px] w-full text-primary font-semibold text-4xl md:text-7xl leading-[44px] md:leading-[90px] tracking-[-0.72px] md:tracking-[-1.44px]"
          data-testid="hero-heading"
        >
          Revolutionalizing the student experience
        </h3>
        <div className="flex max-sm:flex-col gap-3 md:items-center justify-between text-secondary text-base font-normal mt-5 mb-[50px] ">
          <p className="max-w-[277px]">
            Professional creative design agency only in Indonesia.
          </p>
          <p className="max-w-[372px]">
            Welcome to our platform, where private university students can
            connect, have fun, and game together. Join us today!
          </p>
        </div>
        <div className="max-w-[1120px] w-full max-h-[581px]">
          <img
            src={HeroImage}
            alt="Hero Image"
            width={1120}
            height={581}
            className="rounded-[20px]"
            aria-label="Hero Image"
          />
        </div>
      </section>
    </div>
  );
}
