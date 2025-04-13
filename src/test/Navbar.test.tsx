import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Navbar from "../components/layouts/common/Navbar";

vi.mock("../../assets/images/logo(large).svg", () => ({
  default: "large-logo-mock",
}));

vi.mock("../../assets/images/logo(small).svg", () => ({
  default: "small-logo-mock",
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Navbar component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.innerWidth = 1024;
    fireEvent(window, new Event("resize"));
  });

  it("should toggle mobile navigation menu when hamburger button is clicked", () => {
    const { getByLabelText, queryByLabelText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const hamburgerButton = getByLabelText("Toggle mobile menu");
    expect(queryByLabelText("Mobile navigation")).not.toBeInTheDocument();

    fireEvent.click(hamburgerButton);
    expect(queryByLabelText("Mobile navigation")).toBeInTheDocument();

    const closeButton = getByLabelText("Close mobile menu");
    fireEvent.click(closeButton);
    expect(queryByLabelText("Mobile navigation")).not.toBeInTheDocument();
  });

  it("should close dropdown menu when clicking outside", () => {
    const { queryByText, getByLabelText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const servicesButton = getByLabelText("Toggle Services dropdown menu");
    fireEvent.click(servicesButton);

    const dropdownItem = queryByText("Page 1");
    expect(dropdownItem).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(queryByText("Page 1")).not.toBeInTheDocument();
  });

  // it("should navigate to correct path when a navigation link is clicked", () => {
  //   const { getByText } = render(
  //     <MemoryRouter>
  //       <Navbar />
  //     </MemoryRouter>
  //   );

  //   const linkText = "Services";
  //   const linkElement = getByText(linkText);
  //   fireEvent.click(linkElement);
  //   expect(mockNavigate).toHaveBeenCalledWith("/services");
  // });

  // it("should render desktop logo on large screens and mobile logo on small screens", () => {
  //   const { getByAltText, rerender } = render(
  //     <MemoryRouter>
  //       <Navbar />
  //     </MemoryRouter>
  //   );

  //   // Simulate large screen
  //   window.innerWidth = 1024;
  //   fireEvent(window, new Event("resize"));
  //   rerender(
  //     <MemoryRouter>
  //       <Navbar />
  //     </MemoryRouter>
  //   );
  //   const desktopLogo = getByAltText("Ghreatness Labs logo and title");
  //   expect(desktopLogo).toHaveAttribute("src", "large-logo-mock");
  //   expect(desktopLogo).toHaveClass("hidden", "md:block");

  //   // Simulate small screen
  //   window.innerWidth = 480;
  //   fireEvent(window, new Event("resize"));
  //   rerender(
  //     <MemoryRouter>
  //       <Navbar />
  //     </MemoryRouter>
  //   );
  //   const mobileLogo = getByAltText("Ghreatness Labs logo and title");
  //   expect(mobileLogo).toHaveAttribute("src", "small-logo-mock");
  //   expect(mobileLogo).toHaveClass("block", "md:hidden");
  // });

  // it("should close mobile navbar and navigate when a mobile link is clicked while dropdown is open", () => {
  //   const { getByText, getByLabelText, queryByLabelText } = render(
  //     <MemoryRouter>
  //       <Navbar />
  //     </MemoryRouter>
  //   );

  //   // Open mobile menu
  //   const hamburgerButton = getByLabelText("Toggle mobile menu");
  //   fireEvent.click(hamburgerButton);
  //   expect(queryByLabelText("Mobile navigation")).toBeInTheDocument();

  //   // Open dropdown
  //   const dropdownButton = getByLabelText(
  //     "Toggle Services mobile dropdown menu"
  //   );
  //   fireEvent.click(dropdownButton);

  //   // Click a link
  //   const mobileLink = getByText("Services");
  //   fireEvent.click(mobileLink);

  //   // Check if mobile menu is closed and navigation occurred
  //   expect(queryByLabelText("Mobile navigation")).not.toBeInTheDocument();
  //   expect(mockNavigate).toHaveBeenCalledWith("/services");
  // });

  // it("should have correct ARIA labels and accessibility attributes", () => {
  //   const { getByLabelText, getByTestId } = render(
  //     <MemoryRouter>
  //       <Navbar />
  //     </MemoryRouter>
  //   );

  //   expect(getByLabelText("Main navigation")).toBeInTheDocument();
  //   expect(getByLabelText("Toggle mobile menu")).toBeInTheDocument();
  //   expect(getByLabelText("Go to Login page")).toBeInTheDocument();
  //   expect(getByTestId("login-link")).toBeInTheDocument();

  //   fireEvent.click(getByLabelText("Toggle mobile menu"));
  //   expect(getByLabelText("Mobile navigation")).toBeInTheDocument();
  //   expect(getByLabelText("Close mobile menu")).toBeInTheDocument();

  //   expect(
  //     getByLabelText("Toggle Services mobile dropdown menu")
  //   ).toBeInTheDocument();
  //   expect(
  //     getByLabelText("Toggle About Us mobile dropdown menu")
  //   ).toBeInTheDocument();
  // });

  it("should toggle dropdown visibility when dropdown buttons are clicked", () => {
    const { getByLabelText, queryByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const servicesDropdown = getByLabelText("Toggle Services dropdown menu");
    expect(queryByText("Page 1")).not.toBeInTheDocument();

    fireEvent.click(servicesDropdown);
    expect(queryByText("Page 1")).toBeInTheDocument();

    fireEvent.click(servicesDropdown);
    expect(queryByText("Page 1")).not.toBeInTheDocument();

    // Test About Us dropdown
    const aboutUsDropdown = getByLabelText("Toggle About Us dropdown menu");
    fireEvent.click(aboutUsDropdown);
    expect(queryByText("Page 1")).toBeInTheDocument();

    fireEvent.click(aboutUsDropdown);
    expect(queryByText("Page 1")).not.toBeInTheDocument();
  });
});
