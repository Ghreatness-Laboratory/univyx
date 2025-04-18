import { useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import TeamMemberCards from "./TeamMemberCards";

const TeamMemberRoles = [
  "All",
  "Designer",
  "Web Designer",
  "Developer",
  "Software Developer",
];

export default function Team() {
  const [selectedRole, setSelectedRole] = useState("All");

  return (
    <div className="bg-white">
      <section className="flex flex-col py-12 md:py-[100px]">
        <div className="px-6 md:px-4 flex flex-col items-center gap-3 md:gap-8">
          <h1 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px] text-center">
            The great minds behind our work
          </h1>

          <div className="w-full overflow-x-auto py-4 hide-scrollbar">
            <ul className="flex items-center gap-6 md:gap-10 px-4 md:px-10 min-w-max md:min-w-0 md:justify-center">
              {TeamMemberRoles.map((role, index) => (
                <li
                  key={index}
                  className={`text-secondary text-lg md:text-xl leading-[30px] font-normal cursor-pointer relative pb-1 transition-all duration-300
                    ${
                      selectedRole === role
                        ? "text-primary font-semibold"
                        : "hover:text-primary/70"
                    }`}
                  onClick={() => setSelectedRole(role)}
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <TeamMemberCards selectedRole={selectedRole} />
      </section>
    </div>
  );
}
