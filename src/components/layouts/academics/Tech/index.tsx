import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Tech1 from "../../../../assets/images/academics/image 4.png";
import Tech2 from "../../../../assets/images/academics/image 5.png";
import Tech3 from "../../../../assets/images/academics/image 6.png";

interface TechProps {
  name: string;
  date: string;
  image: string;
  link: string;
}

const techs: TechProps[] = [
  {
    name: "Building Your Tech Network in University",
    date: "Sep 4, 2024",
    image: Tech1,
    link: "",
  },
  {
    name: "Student-Led Innovations Shaping Campus Life",
    date: "Aug 28, 2024",
    image: Tech2,
    link: "",
  },
  {
    name: "From Campus Projects to Startup Success",
    date: "Aug 15, 2024",
    image: Tech3,
    link: "",
  },
  {
    name: "Emerging Tech Skills Every Student Should Master",
    date: "Aug 5, 2024",
    image: Tech1,
    link: "",
  },
];

export default function Tech() {
  return (
    <div data-testid="tech">
      <section className="max-w-[1120px] w-full mx-auto flex flex-col gap-[50px] py-12 md:py-[100px] px-6 lg:px-0">
        <div>
          <h3 className="text-primary text-4xl md:text-5xl font-semibold">
            Tech Networking
          </h3>
          <p className="text-secondary text-lg mt-1">
            Connect with tech professionals, innovators, and entrepreneurs
            within your university ecosystem
          </p>
        </div>

        <div className="flex gap-8 overflow-x-auto hide-scrollbar">
          {techs.map((tech, index) => (
            <div
              key={index}
              className="w-[352px] rounded-2xl border border-[#D6D6D6] flex-shrink-0"
            >
              <img
                src={tech.image}
                alt={`Tech article: ${tech.name}`}
                className="rounded-t-2xl max-h-[246px]"
              />
              <div className="p-[30px] flex flex-col gap-[30px] ">
                <h3 className="font-medium text-2xl leading-8 text-primary">
                  {tech.name}
                </h3>
                <p className="flex items-center justify-between text-[#616161]">
                  {tech.date}
                  <Link
                    to={tech.link}
                    className="p-2 hover:bg-primary rounded-full group transition-all duration-200 cursor-pointer"
                  >
                    <ChevronDoubleRightIcon className="size-5 text-primary group-hover:text-white" />
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
