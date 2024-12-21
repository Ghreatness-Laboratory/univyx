import { Link } from "react-router-dom";
import FacebookLogo from "../../../assets/images/facebook-logo.svg";
import InstagramLogo from "../../../assets/images/instagram-logo.svg";
import LinkedinLogo from "../../../assets/images/linkedin-logo.svg";
import FooterLogo from "../../../assets/images/logo(extralarge).svg";
import TwitterLogo from "../../../assets/images/twitter-logo.svg";
import Button from "../../common/Button";

const footerMenu = [
  {
    href: "/",
    menu: "Features",
  },
  {
    href: "/",
    menu: "About",
  },
  {
    href: "/",
    menu: "Services",
  },
];

const socialMediaPlatforms = [
  {
    link: "https://www.facebook.com",
    logo: FacebookLogo,
    name: "Facebook",
  },
  {
    link: "https://www.instagram.com",
    logo: InstagramLogo,
    name: "Instagram",
  },
  {
    link: "https://www.twitter.com",
    logo: TwitterLogo,
    name: "Twitter",
  },
  {
    link: "https://www.linkedin.com",
    logo: LinkedinLogo,
    name: "Linkedin",
  },
];

export default function Footer() {
  return (
    <footer aria-label="footer">
      <section className="bg-[#F9F9FB]">
        <div className="max-w-[1120px] w-full mx-auto pb-16 md:pb-[50px] pt-12 md:pt-[100px] md:px-4 lg:px-0 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="max-w-[423px] w-full h-[148px] md:h-[286px] md:self-start flex flex-col justify-between">
            <div className="flex justify-center md:justify-normal">
              <span className="sr-only">Logo</span>
              <img
                src={FooterLogo}
                alt="Ghreatness Labs logo and title"
                width={310}
                height={60}
                aria-required
              />
            </div>
            <div className="flex justify-center md:justify-normal gap-3 md:gap-5 ">
              {footerMenu.map((menu, index) => (
                <Link
                  key={index}
                  to={menu.href}
                  className="px-4 md:px-5 py-2 rounded-full font-semibold leading-6 border border-[var(--Text-Colors-200,#D6D6D6)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                >
                  {menu.menu}
                </Link>
              ))}
            </div>
          </div>

          <div className="max-w-[647px] w-full flex flex-col md:self-start gap-5 text-center md:text-left px-4 md:px-0">
            <h1 className="text-primary text-4xl md:text-5xl  font-semibold md:font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px]">
              Working to create value and <br className="md:hidden" /> drive
              success for our clients.
            </h1>
            <p className="text-secondary font-normal leading-6">
              We prioritize comprehending our clients' unique challenges,
              objectives, and aspirations, ensuring that our efforts are
              tailored to their specific requirements
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary py-8 px-4">
        <div className="max-w-[1120px] w-full mx-auto flex flex-col md:flex-row items-center gap-8 justify-between text-white text-lg font-normal text-center">
          <h6>Copyright @ 2024 Ghreatness, All rights reserved.</h6>
          <div className="flex items-center gap-[15px]">
            {socialMediaPlatforms.map((platform, index) => (
              <Button
                key={index}
                href={platform.link}
                isIconOnly={true}
                className="p-2.5 border border-white rounded-full"
                ariaLabel={`Visit ${platform.name}`}
              >
                <img
                  src={platform.logo}
                  alt="Social Media Platform"
                  width={15}
                  height={15}
                  className="w-[18px] h-[18px]"
                  aria-required
                />
              </Button>
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
}
