import { Link, useLocation, useNavigate } from "react-router-dom";
import DesktopLogo from "../../../assets/images/logo(large).svg";
import MobileLogo from "../../../assets/images/logo(small).svg";
import Button from "../../common/Button";
import { useEffect, useRef, useState } from "react";

interface Navlink {
  href: string;
  menu: string;
}

const navlinks: Navlink[] = [
  {
    href: "/",
    menu: "Home",
  },
  {
    href: "/contact-us",
    menu: "Contact Us",
  },
  {
    href: "/services",
    menu: "Services",
  },
  {
    href: "/about-us",
    menu: "About Us",
  },
  {
    href: "/blog",
    menu: "Blog",
  },
];

const dropdownItems = [
  {
    href: "/",
    menu: "Page 1",
  },
  {
    href: "/",
    menu: "Page 2",
  },
  {
    href: "/",
    menu: "Page 3",
  },
];

const fadeInDown = {
  animation: "fadeInDown 0.2s linear",
};

const ActiveMenuIndicator = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 5 5"
      fill="none"
      className="absolute left-1/2 transform -translate-x-1/2 bottom-0"
    >
      <circle cx="2.5" cy="2.5" r="2.5" fill="#64748B" />
    </svg>
  );
};

export default function Navbar() {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler for desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMobileNavbar = () => {
    setMobileNavbar(!mobileNavbar);
  };

  const handleDropDownMenu = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleMobileLinkClick = (href: string) => {
    navigate(href);
    setMobileNavbar(false);
  };

  return (
    <div className="bg-white">
      <nav
        className="max-w-[1150px] w-full mx-auto py-3 md:py-7 px-6 md:px-4 flex justify-between items-center relative"
        aria-label="navbar"
      >
        <span className="sr-only">Desktop navbar</span>
        <div className="px-1">
          <span className="sr-only">Logo</span>
          <img
            src={DesktopLogo}
            alt="Ghreatness Labs logo and title"
            width={165}
            height={34}
            className="hidden md:block"
            aria-required
          />
          <img
            src={MobileLogo}
            alt="Ghreatness Labs logo and title"
            width={123}
            height={25}
            className="block md:hidden"
            aria-required
          />
        </div>

        <ul className="hidden lg:flex items-center relative">
          {navlinks.map((link, index) => {
            const isActive = location.pathname === link.href;
            const isMenuActive =
              "relative text-[#64748B] px-3 transition-all duration-2000ms ease-in-out bottom-1";

            const isDropdownMenu =
              link.menu === "Services" || link.menu === "About Us";

            return (
              <li
                key={index}
                className={`relative flex items-center mr-3 group ${
                  isActive ? "relative" : ""
                }`}
              >
                {isActive && <ActiveMenuIndicator />}
                <div className="flex items-center">
                  <div
                    className={`py-2 px-3 font-semibold leading-5 ${
                      isActive ? isMenuActive : ""
                    }`}
                  >
                    <Link to={link.href}>{link.menu}</Link>
                  </div>
                  {isDropdownMenu && (
                    <Button
                      className="p-2"
                      isIconOnly={true}
                      ariaLabel="Drop-down menu"
                      onClick={() => handleDropDownMenu(link.menu)}
                    >
                      <svg
                        className={`${isActive ? "mb-2" : ""}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M16.3334 7.5L10.5001 13.3333L4.66675 7.5"
                          stroke={`${isActive ? "#64748B" : "#616161"}`}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  )}
                </div>

                {isDropdownMenu && activeDropdown === link.menu && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-md z-50 border"
                    style={fadeInDown}
                  >
                    <ul className="divide-y">
                      {dropdownItems.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          >
                            {item.menu}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div>
          <Button
            href="/login"
            className="hidden md:block py-2.5 px-3.5"
            isIconOnly={false}
            ariaLabel="Go to Login page"
          >
            <p>Join Us</p>
          </Button>
          <Button
            className="block md:hidden py-2.5 px-3.5"
            isIconOnly={true}
            ariaLabel="Open Hamburger Menu"
            onClick={handleMobileNavbar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 17H21M3 12H21M3 7H21"
                stroke="#0D0D0D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </nav>

      {mobileNavbar && (
        <nav
          className="fixed lg:hidden top-0 h-[100vh] w-full bg-white"
          aria-label="navbar"
        >
          <span className="sr-only">Mobile navbar</span>
          <div className="flex items-center justify-end gap-2 py-3 px-6 font-bold leading-6">
            <h6>MENU</h6>
            <Button
              className="block py-2.5 px-3.5"
              isIconOnly={true}
              ariaLabel="Close Hamburger Menu"
              onClick={handleMobileNavbar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                  stroke="#0D0D0D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
          <ul className="flex flex-col border-b">
            {navlinks.map((link, index) => {
              const isDropdownMenu =
                link.menu === "Services" || link.menu === "About Us";
              return (
                <li
                  key={index}
                  className={`flex flex-col border-t ${
                    isDropdownMenu ? "relative" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Link
                      to={link.href}
                      onClick={() => handleMobileLinkClick(link.href)}
                      className={`py-4 pl-6 font-medium leading-6`}
                    >
                      {link.menu}
                    </Link>
                    {isDropdownMenu && (
                      <Button
                        className="p-4 border-l"
                        isIconOnly={true}
                        ariaLabel="Drop-down menu"
                        onClick={() => handleDropDownMenu(link.menu)}
                      >
                        <svg
                          className={`${
                            activeDropdown === link.menu
                              ? "transform rotate-180"
                              : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                        >
                          <path
                            d="M16.3334 7.5L10.5001 13.3333L4.66675 7.5"
                            stroke="#616161"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    )}
                  </div>
                  {isDropdownMenu && activeDropdown === link.menu && (
                    <ul
                      className="flex flex-col border-t divide-y"
                      style={fadeInDown}
                    >
                      {dropdownItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          onClick={() => handleMobileLinkClick(item.href)}
                          className="py-4 pl-6 text-secondary font-normal text-sm animate-fadeInDown cursor-pointer"
                        >
                          {item.menu}
                        </Link>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
