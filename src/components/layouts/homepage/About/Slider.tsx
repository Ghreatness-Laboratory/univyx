import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Frame1 from "../../../../assets/images/homepage/about-Frame 1.png";

const frames = [Frame1, Frame1, Frame1, Frame1, Frame1, Frame1, Frame1];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % frames.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      data-testid="slider"
      className="overflow-hidden relative py-6 md:pt-[50px] mx-auto"
    >
      <motion.div
        className="flex gap-3 md:gap-8"
        animate={{ x: `-${(currentIndex % frames.length) * (100 / 2)}%` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {frames.map((image, index) => (
          <div key={index} className="flex-shrink-0">
            <img
              src={image}
              alt={`Slider Image ${index + 1}`}
              width={736}
              height={565}
              className="h-[147px] md:h-[90%] w-full rounded-md"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
