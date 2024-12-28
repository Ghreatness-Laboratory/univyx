import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Services from "../../components/layouts/homepage/Services";
import ServiceCard from "../../components/layouts/homepage/Services/ServiceCard";

describe("ServiceCard Component", () => {
  it("renders all service cards with the correct data", () => {
    render(
      <MemoryRouter>
        <ServiceCard />
      </MemoryRouter>
    );

    const serviceTitles = ["UI/UX Design", "Web Design", "Development"];

    serviceTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    const serviceDescriptions = [
      "Whether you're looking to redesign an existing interface, optimise user flows, or create a brand new digital product.",
      "Business branding is a process that involves creating a unique identity & image for a company, product.",
      "We understand that the digital landscape is constantly evolving, which is why we stay ahead of the curve.",
    ];

    serviceDescriptions.forEach((description) => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });

    const viewMoreLink = screen.getByRole("link", {
      name: /View More Services/i,
    });
    expect(viewMoreLink).toBeInTheDocument();
    expect(viewMoreLink).toHaveAttribute("href", "/services");
  });
});

describe("Services Component", () => {
  it("renders the Services section with the correct heading and description", () => {
    render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );

    const heading = screen.getByRole("heading", {
      name: /Your Next Innovation/i,
    });
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(
      /"Your Next Innovation" is your partner in bringing your vision to life\. We provide the resources, expertise, and support needed to turn\./i
    );
    expect(description).toBeInTheDocument();
  });
});
