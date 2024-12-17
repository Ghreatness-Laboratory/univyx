import Features1 from "../../../../assets/images/homepage/features-1.png";
import Features2 from "../../../../assets/images/homepage/features-2.png";
import FeatureCard, { FeaturesProps } from "./FeatureCard";

const features: FeaturesProps[] = [
  {
    title: "Taking Your Goals to New Heights",
    content:
      "Understanding a product's capabilities requires a comprehensive assessment of its features, functionality, flexibility & integration. Understanding a product's capabilities requires a comprehensive assessment of its features, functionality, flexibility.",
    image: Features1,
  },
  {
    title: "Taking Your Goals to New Heights",
    content:
      "Understanding a product's capabilities requires a comprehensive assessment of its features, functionality, flexibility & integration. Understanding a product's capabilities requires a comprehensive assessment of its features, functionality, flexibility.",
    image: Features2,
  },
];

export default function Features() {
  return (
    <div>
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
