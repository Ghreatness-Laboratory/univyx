import Button from "../../../common/Button";

export interface GetStartedProps {
  title: string;
  content: string;
  image: string;
  isRowReverse?: boolean;
}

export default function GetStartedCard(feature: GetStartedProps) {
  return (
    <div
      className={`flex ${
        feature.isRowReverse
          ? "flex-col md:flex-row-reverse"
          : "flex-col md:flex-row"
      } items-center gap-8 p-6 md:p-10 bg-[#F9F9FB] rounded-[30px] md:rounded-[20px]`}
    >
      <div className="w-full h-full">
        <img
          src={feature.image}
          alt="Features"
          width={490}
          height={434}
          className="w-full h-full object-cover rounded-[30px]"
        />
      </div>
      <div
        className={`flex flex-col md:items-start gap-3 md:gap-[30px] max-w-[518px] ${
          feature.isRowReverse ? "items-end max-md:text-right" : "items-start"
        }`}
      >
        <h2 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px]">
          {feature.title}
        </h2>
        <p className="text-secondary text-base font-normal">
          {feature.content}
        </p>
        <Button
          href="?auth=signup"
          isIconOnly={false}
          ariaLabel="Get Started"
          className="py-2.5 px-[14px] "
        >
          <p>Get Started</p>
        </Button>
      </div>
    </div>
  );
}
