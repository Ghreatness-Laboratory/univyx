import { Link } from "react-router-dom";
import Slider from "./Slider";
import Stats from "./Stats";

export default function AboutUs() {
  return (
    <div>
      <section className="flex flex-col py-12 md:py-[100px]">
        <div className="max-w-[1120px] w-full mx-auto px-6 md:px-4 flex flex-col">
          <Link to={"/about-us"}>
            <span className="px-3 py-1.5 font-medium text-sm text-[#64748B] rounded-full border border-[#64748B] ">
              About Us
            </span>
          </Link>
          <h1 className="hidden md:block text-5xl text-[#132238] font-medium leading-[60px] tracking-[-0.96px] pt-1">
            Discover a Unique Combination of Networking, Entertainment, and
            Gaming
          </h1>
          <h1 className="block md:hidden text-primary text-[32px] sm:text-4xl leading-[44px] tracking-[-0.72px] font-semibold pt-1">
            Transforming Dreams into Reality
          </h1>
        </div>

        <Slider />

        <Stats />
      </section>
    </div>
  );
}
