import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import TeamMemberCard from "../../components/layouts/homepage/Team/TeamMemberCard";

describe("TeamMemberCard component", () => {
  // Helper function to render component with router
  const renderComponent = (selectedRole: string) => {
    return render(
      <MemoryRouter>
        <TeamMemberCard selectedRole={selectedRole} />
      </MemoryRouter>
    );
  };

  it('renders all team members when selectedRole is "All"', () => {
    renderComponent("All");

    const memberNames = screen.getAllByText("William B. Harris");
    expect(memberNames).toHaveLength(4);
  });

  it("filters team members correctly based on selected role", () => {
    renderComponent("Designer");

    const memberNames = screen.getAllByText("William B. Harris");
    expect(memberNames).toHaveLength(1);

    const memberDescriptions = screen.getAllByText(
      /Our talented UX\/UI designers/
    );
    expect(memberDescriptions).toHaveLength(1);
  });

  it("renders social media links for each team member", () => {
    renderComponent("All");

    const facebookLinks = screen.getAllByRole("link", { name: "" }); // Links have empty aria-label due to SVG content
    expect(facebookLinks.length).toBeGreaterThan(0);
  });

  it("renders member images with required aria attributes", () => {
    renderComponent("All");

    const images = screen.getAllByRole("img", { name: "Team Member Photo" });

    images.forEach((image) => {
      expect(image).toHaveAttribute("aria-required");
      expect(image).toHaveAttribute("alt", "Team Member Photo");
    });
  });

  it("renders no team members when selected role does not exist", () => {
    renderComponent("NonexistentRole");

    const memberNames = screen.queryAllByText("William B. Harris");
    expect(memberNames).toHaveLength(0);
  });

  it("applies correct responsive classes to team member cards", () => {
    renderComponent("All");

    const cards = screen
      .getAllByRole("img", { name: "Team Member Photo" })
      .map((img) => img.closest('div[class*="flex items-center"]'));

    cards.forEach((card) => {
      expect(card).toHaveClass("flex", "items-center", "gap-[13.01px]");
    });
  });

  it("renders team member descriptions correctly", () => {
    renderComponent("All");

    const descriptions = screen.getAllByText(/Our talented UX\/UI designers/);
    expect(descriptions[0]).toHaveClass(
      "text-secondary",
      "text-[9px]",
      "sm:text-base"
    );
  });
});
