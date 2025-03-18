import Slider from "react-slick";
import type { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Frame1 from "../../../../assets/images/homepage/school-logos/images.jpeg";
import Frame2 from "../../../../assets/images/homepage/school-logos/images (1).jpeg";
import Frame3 from "../../../../assets/images/homepage/school-logos/images (2).jpeg";
import Frame4 from "../../../../assets/images/homepage/school-logos/images (3).jpeg";
import Frame5 from "../../../../assets/images/homepage/school-logos/images (4).jpeg";
import Frame6 from "../../../../assets/images/homepage/school-logos/images (5).jpeg";
import Frame7 from "../../../../assets/images/homepage/school-logos/images (6).jpeg";
import Frame8 from "../../../../assets/images/homepage/school-logos/images (7).jpeg";
import Frame9 from "../../../../assets/images/homepage/school-logos/Bells-University-of-Technology.png";

const frames = [Frame1, Frame2, Frame3, Frame4, Frame5, Frame6, Frame7, Frame8, Frame9];

export default function ImageSlider(): JSX.Element {
   const settings: Settings = {
      dots: false,
      infinite: true,
      speed: 500, // Faster transitions
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500, // Faster autoplay
      cssEase: "ease-in-out",
      arrows: false,
      responsive: [
         {
            breakpoint: 1280,
            settings: {
               slidesToShow: 4,
               slidesToScroll: 1,
            },
         },
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 1,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            },
         },
      ],
   };

   return (
      <div className="py-8 mx-auto w-full max-w-[1200px] px-6 overflow-hidden">
         <Slider {...settings} className="w-full">
            {frames.map((image, index) => (
               <div key={index} className="px-3"> {/* Added more spacing */}
                  <img 
                     src={image} 
                     alt={`Slider Image ${index + 1}`} 
                     width={500} 
                     height={300} 
                     className="h-[130px] sm:h-[150px] md:h-[190px] w-full object-contain" 
                  />
               </div>
            ))}
         </Slider>
      </div>
   );
}
