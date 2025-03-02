import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import AboutUs from "../../components/layouts/homepage/About";
import Slider from "../../components/layouts/homepage/About/Slider";
import Stats from "../../components/layouts/homepage/About/Stats";

describe("AboutUs Component", () => {
  it("renders the About Us section with correct headings and link", () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );

    const aboutUsLink = screen.getByRole("link", { name: /About Us/i });
    expect(aboutUsLink).toBeInTheDocument();
    expect(aboutUsLink).toHaveAttribute("href", "/about-us");

    const desktopHeading = screen.getByText(
      /Discover a Unique Combination of Networking, Entertainment, and Gaming/i
    );
    expect(desktopHeading).toBeInTheDocument();

    const mobileHeading = screen.getByText(/Transforming Dreams into Reality/i);
    expect(mobileHeading).toBeInTheDocument();

    expect(screen.getByTestId("slider")).toBeInTheDocument();
    expect(screen.getByTestId("stats")).toBeInTheDocument();
  });
});

describe("Stats Component", () => {
  it("renders all statistics with the correct count and content", () => {
    render(<Stats />);

    const statistics = [
      "#1",
      "500+",
      "200+",
      "15k+",
      "As the foremost agency in our domain, we continuously lead by example, setting benchmarks for innovation, reliability, and customer-centricity.",
      "our agency has successfully completed over 500 projects, showcasing our commitment to excellence and quality in every endeavor we undertake.",
      "With a dedicated team of over 200 happy employees, we prioritize their satisfaction and engagement, fostering a supportive.",
      "Boasting over 15,000 five-star reviews, our agency is honored to have earned the trust and recognition of our clients.",
    ];

    statistics.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});

describe("Slider Component", () => {
  it("renders the slider images correctly", () => {
    render(<Slider />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(6); // Because of the duplication of frames
    images.forEach((image) => {
      expect(image).toHaveAttribute("src");
      expect(image).toHaveAttribute("alt");
    });
  });
});
