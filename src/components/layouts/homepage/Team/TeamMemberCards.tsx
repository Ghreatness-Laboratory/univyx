import { FacebookLogo, InstagramLogo, TwitterLogo } from "phosphor-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import TeamMember1 from "../../../../assets/images/homepage/team-member-1.png";
import TeamMember2 from "../../../../assets/images/homepage/team-member-2.png";
import TeamMember3 from "../../../../assets/images/homepage/team-member-3.png";

interface TeamMemberProps {
  id: number;
  name: string;
  role: string;
  photo: string;
  social: {
    facebookLink: string;
    instagramLink: string;
    twitterLink: string;
  };
}

interface TeamMemberCardsProps {
  selectedRole: string;
}

const teamMembers: TeamMemberProps[] = [
  {
    id: 1,
    name: "William B. Harris",
    role: "Designer",
    photo: TeamMember1,
    social: {
      facebookLink: "facebook-url",
      instagramLink: "instagram-url",
      twitterLink: "twitter-url",
    },
  },
  {
    id: 2,
    name: "William B. Harris",
    role: "Developer",
    photo: TeamMember2,
    social: {
      facebookLink: "facebook-url",
      instagramLink: "instagram-url",
      twitterLink: "twitter-url",
    },
  },
  {
    id: 3,
    name: "William B. Harris",
    role: "Software Developer",
    photo: TeamMember3,
    social: {
      facebookLink: "facebook-url",
      instagramLink: "instagram-url",
      twitterLink: "twitter-url",
    },
  },
  {
    id: 4,
    name: "William B. Harris",
    role: "Web Designer",
    photo: TeamMember1,
    social: {
      facebookLink: "facebook-url",
      instagramLink: "instagram-url",
      twitterLink: "twitter-url",
    },
  },
];

export default function TeamMemberCards({
  selectedRole,
}: TeamMemberCardsProps) {
  const sliderRef = useRef<Slider>(null);

  const filteredMembers =
    selectedRole === "All"
      ? teamMembers
      : teamMembers.filter((member) => member.role === selectedRole);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(filteredMembers.length, 3),
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(filteredMembers.length, 2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(filteredMembers.length, 2),
          slidesToScroll: 1,
        },
      },
    ],
    dotsClass: "slick-dots custom-dots",
    appendDots: (dots: React.ReactNode) => <ul>{dots}</ul>,
    customPaging: () => (
      <div className="w-2.5 h-2.5 bg-gray-300 rounded-full hover:bg-primary transition-colors duration-300 mt-6 md:mt-8"></div>
    ),
  };

  return (
    <div className="relative my-3 max-w-7xl w-full mx-auto px-6 md:px-4">
      {filteredMembers.length > 0 && (
        <>
          <Slider
            ref={sliderRef}
            {...settings}
            className="team-member-slider px-1 sm:px-0"
          >
            {filteredMembers.map((member, index) => (
              <div key={index} className="px-1 sm:px-3 w-full">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 sm:p-5 rounded-lg sm:rounded-xl bg-[#F9F9FB] h-full">
                  <div className="w-full h-[100px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] flex-shrink-0 overflow-hidden">
                    <img
                      src={member.photo}
                      alt={member.name}
                      role="img"
                      aria-label={`Photo of ${member.name}`}
                      className="w-full h-full object-cover rounded-md sm:rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col flex-1 mt-4 sm:mt-0 text-center sm:text-left">
                    <h6 className="text-primary text-base sm:text-xl leading-[17.35px] sm:leading-6 font-medium">
                      {member.name}
                    </h6>
                    <span className="text-secondary text-sm sm:text-base font-normal my-2">
                      {member.role}
                    </span>
                    <div className="flex max-md:justify-center gap-4 mt-2">
                      <div className="flex items-start gap-[5.42px] sm:gap-2.5">
                        {member.social.facebookLink && (
                          <Link
                            to={member.social.facebookLink}
                            aria-label="Facebook"
                          >
                            <FacebookLogo size={20} />
                          </Link>
                        )}
                        {member.social.instagramLink && (
                          <Link
                            to={member.social.instagramLink}
                            aria-label="Instagram"
                          >
                            <InstagramLogo size={20} />
                          </Link>
                        )}
                        {member.social.twitterLink && (
                          <Link
                            to={member.social.twitterLink}
                            aria-label="Twitter"
                          >
                            <TwitterLogo size={20} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </>
      )}

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-secondary text-lg">
            No team members with this role found.
          </p>
        </div>
      )}

      <style>
        {`
          .team-member-slider .slick-track {
            display: flex !important;
          }
          .team-member-slider .slick-slide {
            height: inherit !important;
            display: flex !important;
          }
          .team-member-slider .slick-slide > div {
            display: flex;
            height: 100%;
            width: 100%;
          }
          .custom-dots {
            bottom: -40px !important;
          }
          .custom-dots li {
            margin: 0 5px;
          }
          .custom-dots li.slick-active div {
            background-color: #0D0D0D;
          }
        `}
      </style>
    </div>
  );
}
