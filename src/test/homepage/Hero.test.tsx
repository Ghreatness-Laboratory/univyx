import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "../../components/layouts/homepage/Hero";

describe("Hero Section", () => {
  it("renders the hero heading with correct text", () => {
    render(<Hero />);
    const heading = screen.getByTestId("hero-heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(
      "Revolutionalizing the student experience"
    );
  });

  it("renders both paragraphs with the correct text", () => {
    render(<Hero />);
    const firstParagraph = screen.getByText(
      "Professional creative design agency only in Indonesia."
    );
    const secondParagraph = screen.getByText(
      "Welcome to our platform, where private university students can connect, have fun, and game together. Join us today!"
    );

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it("renders the hero image with correct attributes", () => {
    render(<Hero />);
    const image = screen.getByRole("img", { name: "Hero Image" });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("hero-image.png")
    );
    expect(image).toHaveAttribute("alt", "Hero Image");
    expect(image).toHaveAttribute("width", "1120");
    expect(image).toHaveAttribute("height", "581");
  });
});
