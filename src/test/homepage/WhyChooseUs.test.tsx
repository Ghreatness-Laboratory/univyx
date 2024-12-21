import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, test } from "vitest";
import WhyChooseUs from "../../components/layouts/homepage/WhyChooseUs";
import CreativeAndUniqueSolutions from "../../components/layouts/homepage/WhyChooseUs/CreativeAndUniqueSolutions";

describe("WhyChooseUs Component", () => {
  it("renders the main heading correctly", () => {
    render(
      <MemoryRouter>
        <WhyChooseUs />
      </MemoryRouter>
    );
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Creative and Unique Solutions");
  });

  test('renders the "Learn More" button with the correct link', () => {
    render(
      <MemoryRouter>
        <WhyChooseUs />
      </MemoryRouter>
    );

    const learnMoreButton = screen.getByRole("link", { name: /learn more/i });

    expect(learnMoreButton).toBeInTheDocument();
    expect(learnMoreButton).toHaveAttribute("href", "/about-us");
  });

  it('renders the "See More" button inside Solution component', () => {
    render(
      <MemoryRouter>
        <CreativeAndUniqueSolutions />
      </MemoryRouter>
    );

    const buttons = screen.getAllByLabelText(/See More/i);
    expect(buttons.length).toBe(4);
  });

  test("renders the CreativeAndUniqueSolutions section correctly", () => {
    render(<CreativeAndUniqueSolutions />);

    const discoveryTitle = screen.getByText(/Discovery/);
    expect(discoveryTitle).toBeInTheDocument();
    const discoveryContent = screen.getByText(
      /We begin by comprehending your goals/
    );
    expect(discoveryContent).toBeInTheDocument();

    const planningTitle = screen.getByText(/Planning/);
    expect(planningTitle).toBeInTheDocument();
    const planningContent = screen.getByText(
      /Effective planning is the cornerstone/
    );
    expect(planningContent).toBeInTheDocument();

    const testingTitles = screen.getAllByText(/Testing/);
    expect(testingTitles).toHaveLength(2); // Should find both the <h3> and <p> elements
    expect(testingTitles[0]).toBeInTheDocument(); // Verify the <h3> element
    expect(testingTitles[1]).toBeInTheDocument(); // Verify the <p> element

    const controlTitle = screen.getByText(/Control/);
    expect(controlTitle).toBeInTheDocument();
    const controlContent = screen.getByText(
      /In an ever-changing world, having control/
    );
    expect(controlContent).toBeInTheDocument();
  });
});
