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
    count: "500+",
    content:
      "our agency has successfully completed over 500 projects, showcasing our commitment to excellence and quality in every endeavor we undertake.",
  },
  {
    count: "200+",
    content:
      "With a dedicated team of over 200 happy employees, we prioritize their satisfaction and engagement, fostering a supportive.",
  },
  {
    count: "15k+",
    content:
      "Boasting over 15,000 five-star reviews, our agency is honored to have earned the trust and recognition of our clients.",
  },
];

export default function Stats() {
  return (
    <div className="max-w-[1120px] w-full mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-8">
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
