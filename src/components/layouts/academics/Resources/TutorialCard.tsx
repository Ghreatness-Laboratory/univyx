import { Resource } from "../../../../types/academics";
import Button from "../../../common/Button";

export default function TutorialCard({ resource }: { resource: Resource }) {
  return (
    <div
      className={`flex ${
        resource.isRowReverse
          ? "flex-col md:flex-row-reverse"
          : "flex-col md:flex-row"
      } items-center gap-8 md:p-10 bg-[#F9F9FB] rounded-[30px] md:rounded-[20px]`}
    >
      <div className="w-full h-full">
        <img
          src={resource.image || "/placeholder-tutorial.jpg"}
          alt={resource.title}
          width={490}
          height={434}
          className="w-full h-full object-cover rounded-[30px]"
        />
      </div>
      <div className="flex flex-col items-center md:items-start gap-3 md:gap-[30px] max-w-[518px] text-center md:text-left px-6 md:px-0">
        <h2 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px]">
          {resource.title}
        </h2>
        <p className="text-secondary text-base font-normal">
          {resource.description}
        </p>
        <Button
          href={resource.url}
          target="_blank"
          className="py-2.5 px-[14px]"
          ariaLabel="Start Tutorial"
        >
          <p>Start Tutorial</p>
        </Button>
      </div>
    </div>
  );
}
