import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OurCoreBeliefs from "../../components/layouts/aboutUs/OurCoreBeliefs";

describe("OurCoreBeliefs component", () => {
  it("renders without crashing", () => {
    render(<OurCoreBeliefs />);
  });

  it("test displays correct headings and content", () => {
    render(<OurCoreBeliefs />);
    expect(screen.getByText("Our core beliefs")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
    expect(screen.getByText("Mission")).toBeInTheDocument();
    expect(
      screen.getByText(
        /At its core, transforming dreams into reality begins with a clear vision/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Value is a fundamental concept that underpins many aspects of life/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Our mission is to transform dreams into reality by providing innovative solutions/i
      )
    ).toBeInTheDocument();
  });
});
