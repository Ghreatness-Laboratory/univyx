import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Button from "../components/common/Button";
import { MemoryRouter } from "react-router-dom";

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe("Button Component", () => {
  it("should render button wrapped in Link when isIconOnly is false", () => {
    renderWithRouter(
      <Button href="/test" isIconOnly={false}>
        Click me
      </Button>
    );

    const link = screen.getByTestId("link");
    const button = screen.getByRole("button");

    expect(link).toBeDefined();
    expect(button).toBeDefined();
    expect(link.contains(button)).toBe(true);
    expect(link.getAttribute("href")).toBe("/test");
  });

  it("should render standalone button when isIconOnly is true", () => {
    renderWithRouter(
      <Button isIconOnly={true} ariaLabel="icon button">
        <span>Icon</span>
      </Button>
    );

    expect(screen.queryByTestId("link")).toBeNull();
    const button = screen.getByRole("button");
    expect(button).toBeDefined();
    expect(button.getAttribute("aria-label")).toBe("icon button");
  });

  it("should render with empty href when href prop is undefined", () => {
    renderWithRouter(<Button>Click me</Button>);

    const link = screen.getByTestId("link");
    const href = link.getAttribute("to");
    expect(href).toBeNull();
  });

  it("should render children content inside button", () => {
    renderWithRouter(
      <Button>
        <span>Test Content</span>
      </Button>
    );

    const element = screen.getByText("Test Content");
    expect(element).toBeDefined();
  });

  it("should render button without children when children prop is empty", () => {
    renderWithRouter(<Button />);

    const button = screen.getByRole("button");
    expect(button.textContent).toBe("");
  });

  it("should call onClick handler when button is clicked", () => {
    const handleClick = vi.fn();
    renderWithRouter(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should apply custom className correctly", () => {
    const customClass = "custom-class";
    renderWithRouter(
      <Button className={customClass} isIconOnly={true}>
        Click me
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button.className).includes(customClass);
  });

  it("should apply default className for non-icon button", () => {
    renderWithRouter(<Button>Click me</Button>);

    const button = screen.getByRole("button");
    const expectedClasses = [
      "bg-primary",
      "text-[#FCFCFC]",
      "rounded-lg",
      "border",
      "border-[#64748B]",
      "cursor-pointer",
    ];

    expectedClasses.forEach((className) => {
      expect(button.className).includes(className);
    });
  });

  it("should preserve aria-label attribute in both button variants", () => {
    const ariaLabel = "Accessible Button";

    const { container: iconOnlyContainer } = render(
      <Button isIconOnly={true} ariaLabel={ariaLabel} onClick={() => {}}>
        Icon
      </Button>
    );

    const iconOnlyButton = iconOnlyContainer.querySelector("button");
    expect(iconOnlyButton).toHaveAttribute("aria-label", ariaLabel);

    const { container: linkContainer } = render(
      <MemoryRouter>
        <Button
          href="/test"
          isIconOnly={false}
          ariaLabel={ariaLabel}
          onClick={() => {}}
        >
          Click me
        </Button>
      </MemoryRouter>
    );

    const link = linkContainer.querySelector("a");
    const linkButton = linkContainer.querySelector("button");

    expect(link).toHaveAttribute("aria-label", ariaLabel);
    expect(linkButton).toHaveAttribute("aria-label", ariaLabel);
  });
});
