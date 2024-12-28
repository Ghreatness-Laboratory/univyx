import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OurJourney from "../../components/layouts/aboutUs/OurJourney";

// Mock the image imports
vi.mock("../../assets/images/aboutUs/image.png", () => ({
  default: "mocked-image.png",
}));
vi.mock("../../assets/images/aboutUs/timeline-image.png", () => ({
  default: "mocked-timeline-image.png",
}));

describe("OurJourney Component", () => {
  it("renders the main heading", () => {
    render(<OurJourney />);
    const heading = screen.getByRole("heading", {
      name: /our journey so far/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the descriptive paragraph", () => {
    render(<OurJourney />);
    const paragraph = screen.getByText(
      /at its core, transforming dreams into reality begins with a clear vision/i
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("renders all timeline sections", () => {
    render(<OurJourney />);
    const sections = [
      "Personal Meeting",
      "Anxiety Disorder",
      "Family Counselling",
    ];

    sections.forEach((section) => {
      const heading = screen.getByRole("heading", { name: section });
      expect(heading).toBeInTheDocument();
    });
  });

  it("renders timeline and about us images with correct alt text", () => {
    render(<OurJourney />);

    const timelineImage = screen.getByAltText("Timeline");
    expect(timelineImage).toBeInTheDocument();
    expect(timelineImage).toHaveAttribute("src", "mocked-timeline-image.png");

    const aboutUsImage = screen.getByAltText("About Us");
    expect(aboutUsImage).toBeInTheDocument();
    expect(aboutUsImage).toHaveAttribute("src", "mocked-image.png");
  });
});
