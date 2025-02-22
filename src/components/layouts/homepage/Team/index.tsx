import { useState } from "react";
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
    <div>
      <section className="flex flex-col py-12 md:py-[100px]">
        <div className="max-w-[1120px] w-full mx-auto px-6 md:px-4 flex flex-col items-center gap-3 md:gap-8">
          <h1 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px] text-center">
            The great minds behind our work
          </h1>

          <ul className="flex max-md:flex-col items-center gap-2 md:gap-10 px-6 md:px-10">
            {TeamMemberRoles.map((role, index) => (
              <li
                key={index}
                className={`text-secondary text-xl leading-[30px] font-normal cursor-pointer 
                  ${selectedRole === role ? "text-primary font-semibold" : ""}`}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </li>
            ))}
          </ul>
        </div>

        <TeamMemberCards selectedRole={selectedRole} />
      </section>
    </div>
  );
}
