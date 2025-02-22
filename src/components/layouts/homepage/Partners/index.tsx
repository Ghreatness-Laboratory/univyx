import { motion } from "framer-motion";
import Partner1 from "../../../../assets/images/homepage/partner-1.svg";
import Partner2 from "../../../../assets/images/homepage/partner-2.svg";
import Partner3 from "../../../../assets/images/homepage/partner-3.svg";
import Partner4 from "../../../../assets/images/homepage/partner-4.svg";
import Partner5 from "../../../../assets/images/homepage/partner-5.svg";
import Partner6 from "../../../../assets/images/homepage/partner-6.svg";
import Partner7 from "../../../../assets/images/homepage/partner-7.svg";
import Partner8 from "../../../../assets/images/homepage/partner-8.svg";

import PartnerCard from "./PartnerCard";

const partners = [
  {
    image: Partner1,
    name: "",
  },
  {
    image: Partner2,
    name: "",
  },
  {
    image: Partner3,
    name: "",
  },
  {
    image: Partner4,
    name: "",
  },
  {
    image: Partner5,
    name: "",
  },
  {
    image: Partner6,
    name: "",
  },
  {
    image: Partner7,
    name: "",
  },
  {
    image: Partner8,
    name: "",
  },
];

const marqueeVariants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    },
  },
};

export default function Partners() {
  return (
    <div>
      <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[45px] md:gap-8 px-6 lg:px-0 py-12 md:py-[100px] overflow-hidden">
        <div className="flex flex-col gap-[15px] text-center">
          <h1 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium  leading-[44px] md:leading-[60px] tracking-[-0.72px] mdLtracking-[-0.96px]">
            Trusted by thousand businesses
          </h1>
          <p className="text-secondary text-base font-normal">
            More 15,000 Companies & partners trusted & choice Itekseo
          </p>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap marquee"
            variants={marqueeVariants}
            animate="animate"
          >
            {partners.concat(partners).map((partner, index) => (
              <div key={index} className="flex-shrink-0">
                <PartnerCard image={partner.image} name={partner.name} />
              </div>
            ))}
          </motion.div>
          <motion.div
            className="flex gap-8 whitespace-nowrap marquee"
            variants={marqueeVariants}
            animate="animate"
          >
            {partners.concat(partners.reverse()).map((partner, index) => (
              <div key={index} className="flex-shrink-0">
                <PartnerCard image={partner.image} name={partner.name} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
