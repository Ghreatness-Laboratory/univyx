import { InstagramLogo, TiktokLogo, WhatsappLogo, X } from "phosphor-react";
import { Link } from "react-router-dom";
import UnivyxLogo from "../../../assets/images/univyx-logo.svg";

const footerMenu = [
  { href: "#features", menu: "Features" },
  { href: "#about", menu: "About" },
  { href: "#services", menu: "Services" },
];

const socialMediaPlatforms = [
  {
    link: "https://www.instagram.com/univyx",
    icon: <InstagramLogo size={24} />,
    name: "Instagram",
  },
  {
    link: "https://whatsapp.com/channel/0029Vb2ER34F1YlKC4kehu3Y",
    icon: <WhatsappLogo size={24} />,
    name: "WhatsApp",
  },
  {
    link: "https://www.tiktok.com/@univyx_",
    icon: <TiktokLogo size={24} />,
    name: "TikTok",
  },
  { link: "https://x.com/univyx", icon: <X size={24} />, name: "X" },
];

export default function Footer() {
  const handleFooterLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    event.preventDefault();
    if (href.startsWith("#")) {
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      const navbarHeight = document.querySelector("nav")?.clientHeight || 0;

      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="footer">
      <section className="bg-[#F9F9FB]">
        <div className="max-w-[1120px] w-full mx-auto pb-16 md:pb-[50px] pt-12 md:pt-[100px] md:px-4 lg:px-0 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="max-w-[423px] w-full min-h-[148px] md:h-[286px] md:self-start flex flex-col justify-between gap-5">
            <div className="flex justify-center md:justify-normal">
              <span className="sr-only">Logo</span>
              <img
                src={UnivyxLogo}
                alt="Univyx logo and title"
                width={310}
                height={60}
                className="rounded-2xl"
              />
            </div>
            <div className="flex justify-center md:justify-normal gap-3 md:gap-5">
              {footerMenu.map((menu, index) => (
                <Link
                  key={index}
                  to={menu.href}
                  onClick={(event) => handleFooterLinkClick(event, menu.href)}
                  className="px-4 md:px-5 py-2 rounded-full font-semibold leading-6 border border-[var(--Text-Colors-200,#D6D6D6)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                >
                  {menu.menu}
                </Link>
              ))}
            </div>
          </div>

          <div className="max-w-[647px] w-full flex flex-col md:self-start gap-5 text-center md:text-left px-4 md:px-0">
            <h1 className="text-primary text-4xl md:text-5xl font-semibold md:font-medium leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px]">
              Working to create value and <br className="md:hidden" /> drive
              success for our clients.
            </h1>
            <p className="text-secondary font-normal leading-6">
              Welcome to our platform, where private university students can
              connect, have fun, and game together. Join us today!
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary py-8 px-4">
        <div className="max-w-[1120px] w-full mx-auto flex flex-col md:flex-row items-center gap-8 justify-between text-white text-lg font-normal text-center">
          <h6>Copyright @ {currentYear} Univyx, All rights reserved.</h6>
          <div className="flex items-center gap-[15px]">
            {socialMediaPlatforms.map((platform, index) => (
              <Link
                key={index}
                to={platform.link}
                className="p-2.5 border border-white rounded-full"
              >
                {platform.icon}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
}
