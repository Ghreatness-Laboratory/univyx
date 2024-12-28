import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Company from "../../components/layouts/aboutUs/Company";
import CompanyCard, {
  CompanyCardProps,
} from "../../components/layouts/aboutUs/Company/CompanyCard";

describe("CompanyCard Component", () => {
  const mockProps: CompanyCardProps = {
    image: "mock-image.svg",
    name: "Mock Company",
  };

  test("renders the CompanyCard component correctly", () => {
    render(<CompanyCard {...mockProps} />);

    const image = screen.getByAltText("Companies");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "mock-image.svg");

    const companyName = screen.getByText(/Mock Company/i);
    expect(companyName).toBeInTheDocument();
  });
});

describe("Company Component", () => {
  test("renders the Company component with heading and description", () => {
    render(<Company />);

    const heading = screen.getByText(/Trusted by thousand businesses/i);
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(
      /More 15,000 Companies & partners trusted & choice Itekseo/i
    );
    expect(description).toBeInTheDocument();
  });

  test("renders all CompanyCard components", () => {
    render(<Company />);

    const companyCards = screen.getAllByAltText("Companies");
    expect(companyCards).toHaveLength(8);
  });
});
