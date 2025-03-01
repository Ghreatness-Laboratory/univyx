import Features1 from "../../../../assets/images/homepage/features-1.png";
import Features2 from "../../../../assets/images/homepage/features-2.png";
import FeatureCard, { FeaturesProps } from "./FeatureCard";

const features: FeaturesProps[] = [
  {
    title: "Univyx- Elevate Your Dreams, Achieve More",
    content:
      "Univyx brings together academic resources, social networking, and career development in one comprehensive platform. Access study materials, connect with peers, participate in campus events, and discover internship opportunities tailored for private university students.",
    image: Features1,
  },
  {
    title: "Gaming & Esports Community",
    content:
      "Join a vibrant gaming community that fosters teamwork, sportsmanship, and healthy competition. Participate in intra and inter-university gaming tournaments, showcase your skills, and connect with fellow gamers who share your passion.",
    image: Features2,
  },
];

export default function Features() {
  return (
    <div id="features">
      <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] lg:px-0">
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
