import Button from "../../../common/Button";
import DesktopIcon from "../../../../assets/images/Desktop-icon.svg";

const services = [
  {
    title: "UI/UX Design",
    description:
      "Whether you're looking to redesign an existing interface, optimise user flows, or create a brand new digital product.",
  },
  {
    title: "Web Design",
    description:
      "Business branding is a process that involves creating a unique identity & image for a company, product.",
  },
  {
    title: "Development",
    description:
      "We understand that the digital landscape is constantly evolving, which is why we stay ahead of the curve.",
  },
];

export default function ServiceCard() {
  return (
    <div className="md:max-w-[575px] w-full flex flex-col gap-3 md:gap-8">
      {services.map((service, index) => (
        <div
          key={index}
          aria-label={service.title}
          className="py-3 px-[30px] md:p-[30px] rounded-[20px] flex flex-col gap-5 items-center md:items-start text-center md:text-left bg-[#F9F9FB]"
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
            <p className="text-secondary text-base font-normal">
              {service.description}
            </p>
          </div>
        </div>
      ))}
      <Button
        href="/services"
        isIconOnly={false}
        className="py-4 px-[22px] max-sm:max-w-[338px] w-full grid place-self-center"
        ariaLabel="View More Services"
      >
        <p className="font-semibold text-[18px] leading-7">
          View More Services
        </p>
      </Button>
    </div>
  );
}
