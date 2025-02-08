import { motion } from "framer-motion";
import Company1 from "../../../../assets/images/aboutUs/company-1.svg";
import Company2 from "../../../../assets/images/aboutUs/company-2.svg";
import Company3 from "../../../../assets/images/aboutUs/company-3.svg";
import Company4 from "../../../../assets/images/aboutUs/company-4.svg";
import Company5 from "../../../../assets/images/aboutUs/company-5.svg";
import Company6 from "../../../../assets/images/aboutUs/company-6.svg";
import Company7 from "../../../../assets/images/aboutUs/company-7.svg";
import Company8 from "../../../../assets/images/aboutUs/company-8.svg";
import CompanyCard from "./CompanyCard";

const companies = [
  {
    image: Company1,
    name: "",
  },
  {
    image: Company2,
    name: "",
  },
  {
    image: Company3,
    name: "",
  },
  {
    image: Company4,
    name: "",
  },
  {
    image: Company5,
    name: "",
  },
  {
    image: Company6,
    name: "",
  },
  {
    image: Company7,
    name: "",
  },
  {
    image: Company8,
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

export default function Company() {
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
            {companies.concat(companies).map((company, index) => (
              <div key={index} className="flex-shrink-0">
                <CompanyCard image={company.image} name={company.name} />
              </div>
            ))}
          </motion.div>
          <motion.div
            className="flex gap-8 whitespace-nowrap marquee"
            variants={marqueeVariants}
            animate="animate"
          >
            {companies.concat(companies.reverse()).map((company, index) => (
              <div key={index} className="flex-shrink-0">
                <CompanyCard image={company.image} name={company.name} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
