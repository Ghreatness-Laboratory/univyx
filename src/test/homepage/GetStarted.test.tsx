import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Features from "../../components/layouts/homepage/GetStarted";
import { MemoryRouter } from "react-router-dom";

describe("Features Section", () => {
  it("renders both FeatureCards with correct titles", () => {
    render(
      <MemoryRouter>
        <Features />
      </MemoryRouter>
    );
    const titles = screen.getAllByRole("heading", { level: 2 });

    expect(titles.length).toBe(2);
    expect(titles[0]).toHaveTextContent("Taking Your Goals to New Heights");
    expect(titles[1]).toHaveTextContent("Taking Your Goals to New Heights");
  });

  it("renders images for each FeatureCard", () => {
    render(
      <MemoryRouter>
        <Features />
      </MemoryRouter>
    );
    const images = screen.getAllByRole("img", { name: "Features" });

    expect(images.length).toBe(2);
    images.forEach((image) => {
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src");
      expect(image).toHaveAttribute("alt", "Features");
    });
  });

  it("renders the content text for each FeatureCard", () => {
    render(
      <MemoryRouter>
        <Features />
      </MemoryRouter>
    );
    const paragraphs = screen.getAllByText(
      /Understanding a product's capabilities requires a comprehensive assessment/
    );

    expect(paragraphs.length).toBe(2);
    paragraphs.forEach((paragraph) => {
      expect(paragraph).toBeInTheDocument();
    });
  });

  it("renders a button with 'Get Started' in each FeatureCard", () => {
    render(
      <MemoryRouter>
        <Features />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("link", { name: "Get Started" });

    expect(buttons.length).toBe(2);
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "/login");
    });
  });
});
