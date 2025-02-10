import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Login from "../../pages/Login";
import { describe, expect, it, beforeEach } from "vitest";

describe("Login Component", () => {
  beforeEach(() => {
    render(<Login />);
  });

  it("renders the login page", () => {
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("displays welcome message", () => {
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
  });

  it("renders the login form elements", () => {
    // Check for form inputs
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    
    // Check for placeholders
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter 8 characters")).toBeInTheDocument();
    
    // Check for login button
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders social login options", () => {
    expect(screen.getByText("Login with Google")).toBeInTheDocument();
    expect(screen.getByText("Login with Apple")).toBeInTheDocument();
    expect(screen.getByAltText("google")).toBeInTheDocument();
    expect(screen.getByAltText("apple")).toBeInTheDocument();
  });

  it("renders the sign up link", () => {
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    const joinLink = screen.getByText("Join Us");
    expect(joinLink).toBeInTheDocument();
    expect(joinLink).toHaveAttribute("href", "/join");
  });

  it("renders the divider", () => {
    expect(screen.getByText("Or")).toBeInTheDocument();
  });
});