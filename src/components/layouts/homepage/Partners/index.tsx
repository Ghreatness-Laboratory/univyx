import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
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

const slickSettingsForward = {
  dots: false,
  infinite: true,
  speed: 5000,
  autoplaySpeed: 0,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  cssEase: "linear",
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

const slickSettingsBackward = {
  ...slickSettingsForward,
  rtl: true,
};

export default function Partners() {
  const extendedPartners = [...partners, ...partners];

  return (
    <div>
      <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[45px] md:gap-8 px-6 lg:px-0 py-12 md:py-[100px] overflow-hidden">
        <div className="flex flex-col gap-[15px] text-center">
          <h1 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] mdLtracking-[-0.96px]">
            Trusted by thousand businesses
          </h1>
          <p className="text-secondary text-base font-normal">
            More 15,000 Companies & partners trusted & choice Itekseo
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="mb-6">
            <Slider {...slickSettingsForward}>
              {extendedPartners.map((partner, index) => (
                <div key={`forward-${index}`} className="px-4">
                  <PartnerCard image={partner.image} name={partner.name} />
                </div>
              ))}
            </Slider>
          </div>

          <div>
            <Slider {...slickSettingsBackward}>
              {extendedPartners.map((partner, index) => (
                <div key={`backward-${index}`} className="px-4">
                  <PartnerCard image={partner.image} name={partner.name} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
}
