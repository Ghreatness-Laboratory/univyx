import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";
import "@testing-library/jest-dom";
import AppRouter from "../routes/AppRouter";

const routes = [
  { path: "/", testid: "home-page" },
  { path: "/login", testid: "login-page" },
  { path: "/sign-up", testid: "sign-up-page" },
  { path: "/contact-us", testid: "contact-us-page" },
  { path: "/services", testid: "services-page" },
  { path: "/about-us", testid: "about-us-page" },
  { path: "/blog", testid: "blog-page" },
  { path: "/undefined-route", testid: "not-found-page" },
];

describe("AppRouter", () => {
  routes.forEach(({ path, testid }) => {
    test(`renders ${testid} on route ${path}`, () => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <AppRouter />
        </MemoryRouter>
      );

      expect(screen.getByTestId(testid)).toBeInTheDocument();
    });
  });
});
