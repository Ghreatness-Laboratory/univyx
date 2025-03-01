interface StatisticsProps {
  count: string;
  content: string;
}

const statistics: StatisticsProps[] = [
  {
    count: "#1",
    content:
      "As the foremost agency in our domain, we continuously lead by example, setting benchmarks for innovation, reliability, and customer-centricity.",
  },
  {
    count: "10+",
    content:
      "With a network of dedicated partners, we drive impactful initiatives and innovative solutions that support student growth and success.",
  },
  {
    count: "20✦",
    content:
      "Our student ambassadors bridge connections between students, creating a vibrant, inclusive, and supportive campus environment.",
  },
  {
    count: "18+",
    content:
      "We collaborate with more than 18 renowned universities, fostering strong academic partnerships that provide students with valuable learning experiences.",
  },
];

export default function Stats() {
  return (
    <div
      data-testid="stats"
      className="max-w-[1120px] w-full mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-8"
    >
      {statistics.map((stats, index) => (
        <div
          key={index}
          className="flex flex-col self-start gap-6 max-md:gap-2 md:max-w-[256px] w-full text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px] ">
            {stats.count}
          </h1>
          <p className="text-secondary font-normal text-base ">
            {stats.content}
          </p>
        </div>
      ))}
    </div>
  );
}
