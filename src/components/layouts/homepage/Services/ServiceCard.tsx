import DesktopIcon from "../../../../assets/images/Desktop-icon.svg";
import Button from "../../../common/Button";

const services = [
  {
    title: "Resource Hub",
    description:
      "Access a comprehensive library of past questions, study notes, and academic materials to enhance your learning experience.",
  },
  {
    title: "Gaming Platform",
    description:
      "Participate in exciting intra and inter-university gaming competitions that foster teamwork and healthy competition.",
  },
  {
    title: "Entertainment",
    description:
      "Stay updated with university news, articles, trending topics, and events to keep you informed and engaged.",
  },
];

export default function ServiceCard() {
  return (
    <div className="md:max-w-[575px] w-full flex flex-col gap-3 md:gap-8">
      {services.map((service, index) => (
        <div
          key={index}
          aria-label={service.title}
          className="py-4 px-[30px] md:p-[30px] rounded-[20px] flex flex-col gap-5 items-center md:items-start text-center md:text-left bg-[#F9F9FB]"
        >
          <div className="w-14 h-14">
            <img
              src={DesktopIcon}
              alt="Desktop Icon"
              width={62}
              height={62}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <h6 className="text-primary text-2xl font-medium">
              {service.title}
            </h6>
            <p className="text-secondary text-base font-normal text-balance">
              {service.description}
            </p>
          </div>
        </div>
      ))}
      <Button
        href="?auth=signup"
        isIconOnly={false}
        className="py-4 px-[22px] max-sm:max-w-[338px] w-full grid place-self-center max-md:mt-4"
        ariaLabel="Explore All Features"
      >
        <p className="font-semibold text-[18px] leading-7 text-center">
          Explore All Features
        </p>
      </Button>
    </div>
  );
}
