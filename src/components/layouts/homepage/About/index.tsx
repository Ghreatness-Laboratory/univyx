import { Link } from "react-router-dom";
import Slider from "./Slider";
import Stats from "./Stats";

export default function AboutUs() {
  return (
    <div id="about">
      <section className="flex flex-col py-12 md:py-[100px]">
        <div className="max-w-[1120px] w-full mx-auto px-6 md:px-4 flex flex-col">
          <Link to="?auth=signup">
            <span className="px-3 py-1.5 font-medium text-sm text-[#64748B] rounded-full border border-[#64748B] ">
              Join Us
            </span>
          </Link>
          <h1 className="text-2xl sm:text-4xl md:text-5xl text-[#132238] font-medium md:leading-[60px] md:tracking-[-0.96px] text-primary leading-[36px] tracking-[-0.72px] pt-1 md:pt-2">
            Discover a Unique Combination of Networking, Entertainment, and
            Gaming
          </h1>
        </div>

        <Slider />

        <Stats />
      </section>
    </div>
  );
}
