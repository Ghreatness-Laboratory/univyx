import Features1 from "../../../../assets/images/homepage/features-1.png";
import Features2 from "../../../../assets/images/homepage/features-2.png";
import FeatureCard, { FeaturesProps } from "./FeatureCard";

const features: FeaturesProps[] = [
  {
    title: "Univyx- Elevate Your Dreams, Achieve More",
    content:
      "Univyx is your gateway to limitless possibilities where ambitions take flight and goals turn into achievements. Push beyond boundaries, embrace new challenges and let every step forward bring you closer to success. With Univyx, the journey to greatness never stops!",
    image: Features1,
  },
  {
    title: "Taking Your Goals to New Heights",
    content:
      "Dream bigger, aim higher and push beyond boundaries. Every step forward brings you closer to success. Take your goals to new heights and make them a reality. The journey may be challenging, but the view from the top is worth it!",
    image: Features2,
  },
];

export default function Features() {
  return (
    <div id="features">
      <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] md:px-6 lg:px-0">
        <FeatureCard
          title={features[0].title}
          content={features[0].content}
          image={features[0].image}
          isRowReverse={false}
        />
        <FeatureCard
          title={features[1].title}
          content={features[1].content}
          image={features[1].image}
          isRowReverse={true}
        />
      </section>
    </div>
  );
}
