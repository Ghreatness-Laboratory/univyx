import { Link } from "react-router-dom";
import TeamMember1 from "../../../../assets/images/homepage/team-member-1.png";
import TeamMember2 from "../../../../assets/images/homepage/team-member-2.png";
import TeamMember3 from "../../../../assets/images/homepage/team-member-3.png";

interface TeamMemberProps {
  id: number;
  name: string;
  role: string;
  description: string;
  photo: string;
  social: [
    {
      facebookLink: string;
      instagramLink: string;
      twitterLink: string;
    }
  ];
}

interface TeamMemberCardProps {
  selectedRole: string;
}

const teamMembers: TeamMemberProps[] = [
  {
    id: 1,
    name: "William B. Harris",
    role: "Designer",
    description:
      "Our talented UX/UI designers are the creative minds responsible for crafting intuitive and visually interfaces....",
    photo: TeamMember1,
    social: [
      {
        facebookLink: "facebook-url",
        instagramLink: "instagram-url",
        twitterLink: "twitter-url",
      },
    ],
  },
  {
    id: 2,
    name: "William B. Harris",
    role: "Developer",
    description:
      "Our talented UX/UI designers are the creative minds responsible for crafting intuitive and visually interfaces....",
    photo: TeamMember2,
    social: [
      {
        facebookLink: "facebook-url",
        instagramLink: "instagram-url",
        twitterLink: "twitter-url",
      },
    ],
  },
  {
    id: 3,
    name: "William B. Harris",
    role: "Software Developer",
    description:
      "Our talented UX/UI designers are the creative minds responsible for crafting intuitive and visually interfaces....",
    photo: TeamMember3,
    social: [
      {
        facebookLink: "facebook-url",
        instagramLink: "instagram-url",
        twitterLink: "twitter-url",
      },
    ],
  },
  {
    id: 4,
    name: "William B. Harris",
    role: "Web Designer",
    description:
      "Our talented UX/UI designers are the creative minds responsible for crafting intuitive and visually interfaces....",
    photo: TeamMember1,
    social: [
      {
        facebookLink: "facebook-url",
        instagramLink: "instagram-url",
        twitterLink: "twitter-url",
      },
    ],
  },
];

export default function TeamMemberCard({ selectedRole }: TeamMemberCardProps) {
  const filteredMembers =
    selectedRole === "All"
      ? teamMembers
      : teamMembers.filter((member) => member.role === selectedRole);

  return (
    <div className="relative my-3 md:my-[50px]">
      <div
        className="flex gap-6 overflow-x-auto hide-scrollbar scroll-smooth"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {filteredMembers.map((member, index) => (
          <div
            key={index}
            className="flex items-center gap-[13.01px] sm:gap-6 p-3 sm:p-5 md:p-[30px] rounded-[10px] sm:rounded-[20px] min-w-[300px] max-w-[521px] sm:flex-shrink-0 w-full bg-[#F9F9FB] border border-[#D6D6D6] mx-auto"
          >
            <div className="w-[108px] h-[108px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] flex-shrink-0 overflow-hidden">
              <img
                src={member.photo}
                alt="Team Member Photo"
                role="img"
                aria-label={`Photo of ${member.name}`}
                className="w-full h-full object-cover rounded-[10px] sm:rounded-[20px]"
              />
            </div>

            <div className="flex flex-col flex-shrink-0 max-w-[150px] sm:max-w-[280px] md:max-w-[240px] lg:max-w-[237px]">
              <h6 className="text-primary text-[13px] sm:text-2xl leading-[17.35px] sm:leading-6 font-medium">
                {member.name}
              </h6>
              <p className="text-secondary text-[9px] sm:text-base leading-[13.01px] md:leading-6 font-normal pt-[7.59px] sm:pt-[14px] pb-[17.35px] sm:pb-8">
                {member.description}
              </p>
              <div className="flex-gap">
                {member.social.map((platform, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-[5.42px] sm:gap-2.5 "
                  >
                    {platform.facebookLink && (
                      <Link
                        to={platform.facebookLink}
                        className="w-4 sm:w-5 h-4 sm:h-5 grid place-items-center border-[0.687px] border-primary rounded-full"
                      >
                        <svg
                          className="w-[6px] sm:w-[8px] h-[10px] sm:h-[13px]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="13"
                          viewBox="0 0 8 13"
                          fill="none"
                        >
                          <path
                            d="M6.73386 7.48567L7.06319 5.35994H5.0345V3.97822C5.0345 3.39696 5.31772 2.82899 6.22339 2.82899H7.1587V1.0188C6.61402 0.930562 6.06365 0.882826 5.51203 0.875977C3.84231 0.875977 2.75222 1.89566 2.75222 3.73907V5.35994H0.901367V7.48567H2.75222V12.6273H5.0345V7.48567H6.73386Z"
                            fill="#0D0D0D"
                          />
                        </svg>
                      </Link>
                    )}
                    {platform.instagramLink && (
                      <Link
                        to={platform.instagramLink}
                        className="w-5 sm:w-6 h-5 sm:h-6 grid place-items-center border-[0.687px] border-primary rounded-full"
                      >
                        <svg
                          className="w-[10px] sm:w-[13px] h-[12px] sm:h-[14px]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                        >
                          <path
                            d="M10.4345 12.9547C11.2793 12.6283 11.9471 11.9604 12.2735 11.1157C12.428 10.7155 12.5362 10.259 12.5655 9.5911C12.5725 9.43467 12.5779 9.30334 12.5829 9.17162V4.70951C12.5795 4.61643 12.5756 4.51947 12.5706 4.41055C12.5412 3.7427 12.4331 3.28382 12.2786 2.88597C12.119 2.46378 11.8734 2.08563 11.552 1.7716C11.2376 1.45216 10.8571 1.20418 10.4396 1.04736C10.0394 0.892851 9.58282 0.784698 8.91498 0.755342C8.24211 0.723282 8.0285 0.715942 6.32238 0.715942C4.61626 0.715942 4.40227 0.723282 3.7321 0.752638C3.06425 0.781994 2.60537 0.890147 2.20752 1.04465C1.78533 1.20418 1.40718 1.44984 1.09277 1.7716C0.773712 2.08602 0.525731 2.46649 0.368522 2.88365C0.214017 3.28382 0.105864 3.74038 0.0765078 4.40823C0.0444479 5.0811 0.0371094 5.2947 0.0371094 7.00121C0.0371094 8.70772 0.0444477 8.92133 0.0738036 9.59149C0.10316 10.2593 0.211314 10.7186 0.366205 11.1161C0.525732 11.5383 0.773712 11.9164 1.09277 12.2308C1.40718 12.5499 1.78765 12.7982 2.2052 12.9551C2.60537 13.1096 3.06193 13.2177 3.72978 13.2471C4.39995 13.2768 4.61355 13.2842 6.32006 13.2842C8.02657 13.2842 8.23979 13.2768 8.91034 13.2471C9.57819 13.2177 10.0367 13.1092 10.4345 12.9547ZM6.3247 12.1543C4.64754 12.1543 4.4463 12.147 3.78579 12.1176C3.17202 12.0906 2.84061 11.9875 2.61966 11.9017C2.34735 11.8009 2.09937 11.6414 1.89774 11.4328C1.68916 11.2289 1.52924 10.9836 1.42881 10.7109C1.34306 10.4899 1.23993 10.1558 1.21289 9.54475C1.18354 8.88193 1.1762 8.683 1.1762 7.00585C1.1762 5.32869 1.18354 5.12745 1.21289 4.46733C1.23993 3.85356 1.34306 3.52214 1.42881 3.3012C1.52963 3.0285 1.68916 2.78052 1.90044 2.57928C2.104 2.37069 2.34966 2.21117 2.62198 2.11035C2.84292 2.0246 3.17704 1.92147 3.78811 1.89443C4.45094 1.86507 4.64986 1.85774 6.32663 1.85774C8.0034 1.85774 8.20502 1.86507 8.86553 1.89443C9.47931 1.92147 9.81072 2.0246 10.0317 2.11035C10.304 2.21117 10.552 2.37069 10.7532 2.57928C10.9618 2.78322 11.1217 3.0285 11.2221 3.3012C11.3079 3.52214 11.411 3.85587 11.438 4.46733C11.4674 5.13016 11.4747 5.32908 11.4747 7.00585C11.4747 8.68261 11.4674 8.87922 11.438 9.54205C11.411 10.1558 11.3079 10.4872 11.2221 10.7082C11.0108 11.2559 10.5763 11.6904 10.029 11.9013C9.80802 11.9871 9.47429 12.0902 8.86283 12.1173C8.2 12.1466 8.00147 12.1543 6.3247 12.1543Z"
                            fill="#0D0D0D"
                          />
                          <path
                            d="M6.32251 3.77208C4.53991 3.77208 3.09374 5.21825 3.09374 7.00085C3.09374 8.78346 4.53991 10.2296 6.32251 10.2296C8.10511 10.2296 9.5509 8.78346 9.5509 7.00085C9.5509 5.21825 8.10473 3.77208 6.32251 3.77208ZM6.32251 9.09478C5.16604 9.09478 4.22819 8.15694 4.22819 7.00047C4.22819 5.844 5.16604 4.90615 6.32251 4.90615C7.47898 4.90615 8.41683 5.844 8.41683 7.00047C8.41683 8.15694 7.47898 9.09478 6.32251 9.09478Z"
                            fill="#0D0D0D"
                          />
                          <path
                            d="M10.4315 3.64443C10.4315 3.22804 10.0939 2.89083 9.67753 2.89083C9.26114 2.89083 8.92393 3.22843 8.92393 3.64443C8.92393 4.06044 9.26153 4.39803 9.67753 4.39803C10.0935 4.39803 10.4315 4.06082 10.4315 3.64443Z"
                            fill="#0D0D0D"
                          />
                        </svg>
                      </Link>
                    )}
                    {platform.twitterLink && (
                      <Link
                        to={platform.twitterLink}
                        className="w-5 sm:w-6 h-5 sm:h-6 grid place-items-center border-[0.687px] border-primary rounded-full"
                      >
                        <svg
                          className="w-[10px] sm:w-[11px] h-[11px] sm:h-[12px]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="12"
                          viewBox="0 0 11 12"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_3029_1730)">
                            <path
                              d="M6.28974 5.21219L10.1221 0.849731H9.21428L5.88523 4.63682L3.2283 0.849731H0.163086L4.18176 6.57702L0.163086 11.1512H1.07092L4.58421 7.15102L7.39073 11.1512H10.4559M1.39857 1.52014H2.79325L9.2136 10.5137H7.81857"
                              fill="#0D0D0D"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_3029_1730">
                              <rect
                                width="10.2929"
                                height="10.3015"
                                fill="white"
                                transform="translate(0.163574 0.849243)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
