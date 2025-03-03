import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { techs } from "../../../../data/academics/tech";

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

        <div className="flex gap-8 overflow-x-auto hide-scrollbar pb-4">
          {techs.map((tech, index) => (
            <div
              key={index}
              className="w-[360px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0"
            >
              <div className="relative">
                <img
                  src={tech.image}
                  alt={tech.name}
                  className="w-full h-52 object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {tech.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl mb-3">{tech.name}</h3>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="text-gray-500 mr-2" />
                    <span>{tech.date}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock size={16} className="text-gray-500 mr-2" />
                    <span>{tech.time}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <MapPin size={16} className="text-gray-500 mr-2 mt-0.5" />
                    <span>{tech.venue}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {tech.description}
                </p>
                <div className="flex justify-end">
                  <Link
                    to={tech.link}
                    className="p-2 hover:bg-primary rounded-full group transition-all duration-200 cursor-pointer"
                  >
                    <ChevronDoubleRightIcon className="size-5 text-primary group-hover:text-white" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
