// src/test/homepage/FAQ.test.tsx

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FAQ from "../../components/layouts/homepage/FAQ";
import Accordian from "../../components/layouts/homepage/FAQ/Accordian";

describe("Accordian component", () => {
  const mockOnToggle = vi.fn();
  const content = {
    question: "What is Lorem Ipsum?",
    answer: "Lorem Ipsum is simply dummy text.",
  };

  it("should render the question", () => {
    render(
      <Accordian content={content} isOpen={false} onToggle={mockOnToggle} />
    );
    expect(screen.getByText("What is Lorem Ipsum?")).toBeInTheDocument();
  });

  it("should call onToggle when clicked", () => {
    render(
      <Accordian content={content} isOpen={false} onToggle={mockOnToggle} />
    );
    const toggleButton = screen.getByRole("button", { name: /toggle answer/i });
    fireEvent.click(toggleButton);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it("should show the answer when open", () => {
    render(
      <Accordian content={content} isOpen={true} onToggle={mockOnToggle} />
    );
    expect(
      screen.getByText("Lorem Ipsum is simply dummy text.")
    ).toBeInTheDocument();
  });

  it("should not show the answer when closed", () => {
    render(
      <Accordian content={content} isOpen={false} onToggle={mockOnToggle} />
    );
    expect(
      screen.queryByText("Lorem Ipsum is simply dummy text.")
    ).not.toBeInTheDocument();
  });
});

describe("FAQ component", () => {
  it("should render the FAQ section", () => {
    render(<FAQ />);
    expect(screen.getByText("Frequently asked questions.")).toBeInTheDocument();
  });

  it("should render 'No results found' if no question matches the search", () => {
    render(<FAQ />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "Nonexistent question" } });
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("should open the accordion when clicked", () => {
    render(<FAQ />);
    const firstAccordionButton = screen.getAllByRole("button")[0];
    fireEvent.click(firstAccordionButton);
    expect(
      screen.getByText(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
      )
    ).toBeInTheDocument();
  });
});
