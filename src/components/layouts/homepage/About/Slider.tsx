import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Frame9 from "../../../../assets/images/homepage/school-logos/Bells-University-of-Technology.png";
import Frame2 from "../../../../assets/images/homepage/school-logos/images (1).jpeg";
import Frame3 from "../../../../assets/images/homepage/school-logos/images (2).jpeg";
import Frame4 from "../../../../assets/images/homepage/school-logos/images (3).jpeg";
import Frame5 from "../../../../assets/images/homepage/school-logos/images (4).jpeg";
import Frame6 from "../../../../assets/images/homepage/school-logos/images (5).jpeg";
import Frame7 from "../../../../assets/images/homepage/school-logos/images (6).jpeg";
import Frame8 from "../../../../assets/images/homepage/school-logos/images (7).jpeg";
import Frame1 from "../../../../assets/images/homepage/school-logos/images.jpeg";
import { slickSettings } from "../../../../lib/slick";

const frames = [
  Frame1,
  Frame2,
  Frame3,
  Frame4,
  Frame5,
  Frame6,
  Frame7,
  Frame8,
  Frame9,
];

export default function ImageSlider(): JSX.Element {
  return (
    <div className="py-16 mx-auto w-full max-w-[1200px] px-6 overflow-hidden">
      <Slider {...slickSettings} className="w-full">
        {frames.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slider Image ${index + 1}`}
              width={500}
              height={300}
              className="h-[130px] sm:h-[150px] md:h-[190px] w-full object-contain rounded-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
