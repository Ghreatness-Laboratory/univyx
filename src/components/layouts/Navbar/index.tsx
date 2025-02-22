import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UnivyxLogo from "../../../assets/images/univyx-logo.svg";
import Button from "../../common/Button";

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
    href: "/entertainment",
    menu: "Entertainment",
  },
  {
    href: "/academics",
    menu: "Academics",
  },
  {
    href: "/gaming",
    menu: "Gaming",
  },
  {
    href: "/shop",
    menu: "Shop",
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

const fadeInDown = (time: number) => ({
  animation: `fadeInDown ${time}s linear`,
});

const slideIn = (time: number) => ({
  animation: `slideIn ${time}s ease-in-out`,
});

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
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      const fixedHeight = 500;
      if (window.scrollY > fixedHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMobileNavbar = () => {
    setMobileNavbar(!mobileNavbar);
    if (!mobileNavbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const handleDropDownMenu = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleMobileLinkClick = (href: string) => {
    navigate(href);
    setMobileNavbar(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div
      className={`bg-white transition-all duration-300 ${
        isSticky ? "sticky top-0 z-50 shadow-md" : ""
      }`}
      style={isSticky ? slideIn(0.5) : fadeInDown(0.8)}
    >
      <nav
        className="max-w-[1150px] w-full mx-auto px-4 py-1 flex justify-between items-center relative"
        aria-label="Main navigation"
      >
        <div className="px-1">
          <img
            src={UnivyxLogo}
            alt="Univyx logo and title"
            width={200}
            height={100}
            className="hidden md:block"
          />
          <img
            src={UnivyxLogo}
            alt="Ghreatness Labs logo and title"
            width={120}
            height={90}
            className="block md:hidden"
          />
        </div>

        <ul className="hidden lg:flex items-center relative">
          {navlinks.map((link, index) => {
            const isActive = location.pathname === link.href;
            const isMenuActive =
              "relative text-[#64748B] px-3 transition-all duration-2000ms ease-in-out bottom-1";
            const isDropdownMenu =
              link.menu === "Academics" ||
              link.menu === "Gaming" ||
              link.menu === "Entertainment";

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
                      className="py-2"
                      isIconOnly={true}
                      ariaLabel={`Toggle ${link.menu} dropdown menu`}
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
                    style={fadeInDown(0.2)}
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
            href="?auth=signup"
            className="hidden md:block py-2.5 px-3.5"
            isIconOnly={false}
            ariaLabel="Go to Login page"
            data-testid="login-link"
          >
            <p>Join Us</p>
          </Button>
          <Button
            className="block md:hidden py-2.5 px-3.5"
            isIconOnly={true}
            ariaLabel="Toggle mobile menu"
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
          className="fixed lg:hidden top-0 h-[100vh] w-full bg-white z-50"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-end gap-2 py-3 px-6 font-bold leading-6">
            <h6>MENU</h6>
            <Button
              className="block py-2.5 px-3.5"
              isIconOnly={true}
              ariaLabel="Close mobile menu"
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
                        ariaLabel={`Toggle ${link.menu} mobile dropdown menu`}
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
                      style={fadeInDown(0.2)}
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
