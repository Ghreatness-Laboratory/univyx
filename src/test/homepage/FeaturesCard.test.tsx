import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import FeatureCard from "../../components/layouts/homepage/Features/FeatureCard";

describe("FeatureCard Component", () => {
  const feature = {
    title: "Sample Feature Title",
    content: "Sample feature description content.",
    image: "/path/to/image.png",
    isRowReverse: false,
  };

  const renderWithRouter = (ui: React.ReactNode) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it("renders the feature title", () => {
    renderWithRouter(<FeatureCard {...feature} />);
    const title = screen.getByRole("heading", { level: 2 });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Sample Feature Title");
  });

  it("renders the feature content", () => {
    renderWithRouter(<FeatureCard {...feature} />);
    const content = screen.getByText("Sample feature description content.");

    expect(content).toBeInTheDocument();
  });

  it("renders the feature image with correct attributes", () => {
    renderWithRouter(<FeatureCard {...feature} />);
    const image = screen.getByRole("img", { name: "Features" });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/path/to/image.png");
    expect(image).toHaveAttribute("alt", "Features");
  });

  it("renders the 'Get Started' button with correct properties", () => {
    renderWithRouter(<FeatureCard {...feature} />);
    const button = screen.getByRole("link", { name: "Get Started" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/login");
  });
});
