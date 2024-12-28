import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Team from "../../components/layouts/homepage/Team";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock the TeamMemberCard component
vi.mock("../../components/layouts/homepage/Team/TeamMemberCard", () => ({
  default: ({ selectedRole }: { selectedRole: string }) => (
    <div data-testid="team-member-card">Role: {selectedRole}</div>
  ),
}));

describe("Team Component", () => {
  it("renders the header and roles correctly", () => {
    render(
      <MemoryRouter>
        <Team />
      </MemoryRouter>
    );

    expect(
      screen.getByText("The great minds behind our work")
    ).toBeInTheDocument();

    const roles = [
      "All",
      "Designer",
      "Web Designer",
      "Developer",
      "Software Developer",
    ];

    roles.forEach((role) => {
      expect(screen.getByText(role)).toBeInTheDocument();
    });
  });

  it("applies the correct style to the selected role", () => {
    render(
      <MemoryRouter>
        <Team />
      </MemoryRouter>
    );

    // Initial state: "All" should be selected
    const allRole = screen.getByText("All");
    expect(allRole).toHaveClass("text-primary font-semibold");

    // Other roles should not have the active style
    const designerRole = screen.getByText("Designer");
    expect(designerRole).not.toHaveClass("text-primary font-semibold");

    // Simulate clicking on "Designer" role
    fireEvent.click(designerRole);

    expect(designerRole).toHaveClass("text-primary font-semibold");
    expect(allRole).not.toHaveClass("text-primary font-semibold");
  });

  it("passes the selected role to the TeamMemberCard component", () => {
    render(
      <MemoryRouter>
        <Team />
      </MemoryRouter>
    );

    // Check initial role passed to TeamMemberCard
    expect(screen.getByTestId("team-member-card")).toHaveTextContent(
      "Role: All"
    );

    // Simulate clicking on a different role
    const developerRole = screen.getByText("Developer");
    fireEvent.click(developerRole);

    // Check updated role passed to TeamMemberCard
    expect(screen.getByTestId("team-member-card")).toHaveTextContent(
      "Role: Developer"
    );
  });
});
