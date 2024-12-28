import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Testimonials from "../../components/layouts/aboutUs/Testimonials";
import TestimonialCard from "../../components/layouts/aboutUs/Testimonials/TestimonialCard";

// Mock the Button and TestimonialCard components
vi.mock("../../../common/Button", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
}));

vi.mock("./TestimonialCard", () => ({
  default: ({
    name,
    comment,
    image,
    rating = 5,
  }: {
    name: string;
    comment: string;
    image: string;
    rating?: number;
  }) => (
    <div>
      <h2>{name}</h2>
      <p>{comment}</p>
      <img src={image} alt="Profile picture" />
      {Array(rating)
        .fill(null)
        .map((_, index) => (
          <span key={index} role="img" aria-label="star">
            ⭐
          </span>
        ))}
    </div>
  ),
}));

describe("Testimonials and TestimonialCard components", () => {
  it("renders the testimonial section and button", () => {
    render(
      <MemoryRouter>
        <Testimonials />
      </MemoryRouter>
    );

    expect(screen.getByText("Testimonial")).toBeInTheDocument();
    expect(screen.getByText("Success stories")).toBeInTheDocument();
    expect(screen.getByText("View All")).toBeInTheDocument();
  });

  it("renders the correct number of testimonial cards in Testimonials", () => {
    render(
      <MemoryRouter>
        <Testimonials />
      </MemoryRouter>
    );

    const testimonialCards = screen.getAllByTestId("testimonial-card");
    expect(testimonialCards).toHaveLength(2);
  });

  it("renders the TestimonialCard with correct data", () => {
    const props = {
      name: "Artemisia Udinese",
      profession: "Marketing Specialist",
      comment: "This is a great product!",
      image: "/path/to/image.jpg",
      rating: 5,
    };

    render(
      <MemoryRouter>
        <TestimonialCard {...props} />
      </MemoryRouter>
    );

    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.profession)).toBeInTheDocument();
    expect(screen.getByText(props.comment)).toBeInTheDocument();
    expect(screen.getByAltText("Profile picture")).toHaveAttribute(
      "src",
      props.image
    );
    expect(screen.getAllByRole("img", { name: "star" })).toHaveLength(
      props.rating
    );
  });

  it("renders the TestimonialCard with default rating of 5 stars if no rating is passed", () => {
    const props = {
      name: "Artemisia Udinese",
      profession: "Marketing Specialist",
      comment: "This is a great product!",
      image: "/path/to/image.jpg",
    };

    render(
      <MemoryRouter>
        <TestimonialCard {...props} />
      </MemoryRouter>
    );

    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.profession)).toBeInTheDocument();
    expect(screen.getByText(props.comment)).toBeInTheDocument();
    expect(screen.getByAltText("Profile picture")).toHaveAttribute(
      "src",
      props.image
    );

    expect(screen.getAllByRole("img", { name: "star" })).toHaveLength(5);
  });
});
