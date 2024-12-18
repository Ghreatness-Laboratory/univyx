import Frame1 from "../../../../assets/images/homepage/about-Frame 1.png";
import Frame2 from "../../../../assets/images/homepage/about-Frame 2.png";
import Frame3 from "../../../../assets/images/homepage/about-Frame 3.png";

const frames = [Frame2, Frame1, Frame3];

export default function Slider() {
  const duplicatedFrames = [...frames, ...frames];

  return (
    <div className="overflow-hidden relative py-6 md:py-[50px] mx-auto">
      <div className="flex gap-3 md:gap-8">
        {duplicatedFrames.map((image, index) => (
          <div key={index} className="flex-shrink-0">
            <img
              src={image}
              alt={`Slider Image ${index + 1}`}
              width={736}
              height={565}
              className="h-[147px] md:h-full w-full rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
