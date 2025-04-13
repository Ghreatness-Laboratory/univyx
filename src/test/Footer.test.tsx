import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi, expect as viExpect } from "vitest";
import Footer from "../components/layouts/common/Footer";

vi.mock("../assets/images/logo(extralarge).svg", () => ({
  default: "mocked-footer-logo",
}));

vi.mock("../assets/images/facebook-logo.svg", () => ({
  default: "mocked-facebook-logo",
}));

vi.mock("../assets/images/instagram-logo.svg", () => ({
  default: "mocked-instagram-logo",
}));

vi.mock("../assets/images/twitter-logo.svg", () => ({
  default: "mocked-twitter-logo",
}));

vi.mock("../assets/images/linkedin-logo.svg", () => ({
  default: "mocked-linkedin-logo",
}));

describe("Footer component", () => {
  const renderFooter = () => {
    return render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  };

  it("should render the Ghreatness Labs logo with correct attributes", () => {
    renderFooter();

    const logo = screen.getByAltText("Ghreatness Labs logo and title");
    viExpect(logo).toBeDefined();
    expect(logo.getAttribute("src")).toBe("mocked-footer-logo");
    expect(logo.getAttribute("width")).toBe("310");
    expect(logo.getAttribute("height")).toBe("60");
  });

  it("should render all navigation links with correct hrefs", () => {
    renderFooter();

    const expectedLinks = [
      { text: "Features", href: "/" },
      { text: "About", href: "/" },
      { text: "Services", href: "/" },
    ];

    expectedLinks.forEach(({ text, href }) => {
      const link = screen.getByText(text);
      viExpect(link).toBeDefined();
      expect(link.getAttribute("href")).toBe(href);
    });
  });

  it("should render all social media buttons with correct links", () => {
    const socialButtons = [
      "Visit Facebook",
      "Visit Instagram",
      "Visit Twitter",
      "Visit Linkedin",
    ];

    renderFooter();

    socialButtons.forEach((label) => {
      const button = screen.getByLabelText(label);
      expect(button).toBeInTheDocument();
    });
  });

  it("should render the copyright text", () => {
    renderFooter();

    const copyright = screen.getByText(
      "Copyright @ 2024 Ghreatness, All rights reserved."
    );
    viExpect(copyright).toBeDefined();
  });

  it("should render the company description text", () => {
    renderFooter();

    const description = screen.getByText(
      /We prioritize comprehending our clients'/
    );
    viExpect(description).toBeDefined();
  });
});
