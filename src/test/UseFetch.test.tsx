import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import { describe, expect, it, Mocked, vi } from "vitest";
import useFetch from "../hooks/useFetch";

vi.mock("axios");

const mockedAxios = axios as Mocked<typeof axios>;

describe("useFetch", () => {
  it("should fetch and return data successfully", async () => {
    const mockData = { message: "Success" };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useFetch("/mock-endpoint"));

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();

    // Wait for the effect to complete
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Final state
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  // it("should handle API errors correctly", async () => {
  //   mockedAxios.get.mockRejectedValueOnce({
  //     response: {
  //       status: 404,
  //       data: { message: "Not Found" },
  //     },
  //   });

  //   const { result } = renderHook(() => useFetch("/mock-endpoint"));

  //   // Initial state
  //   expect(result.current.loading).toBe(true);
  //   expect(result.current.data).toBeUndefined();
  //   expect(result.current.error).toBeNull();

  //   // Wait for the effect to complete
  //   await waitFor(() => expect(result.current.loading).toBe(false));

  //   // Final state
  //   expect(result.current.data).toBeUndefined();
  //   expect(result.current.error).toEqual({
  //     status: 404,
  //     message: "Not Found",
  //   });
  // });

  // it("should handle unknown errors gracefully", async () => {
  //   mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

  //   const { result } = renderHook(() => useFetch("/mock-endpoint"));

  //   // Initial state
  //   expect(result.current.loading).toBe(true);
  //   expect(result.current.data).toBeUndefined();
  //   expect(result.current.error).toBeNull();

  //   // Wait for the effect to complete
  //   await waitFor(() => expect(result.current.loading).toBe(false));

  //   // Final state
  //   expect(result.current.data).toBeUndefined();
  //   expect(result.current.error).toEqual({
  //     status: null,
  //     message: "An unknown error occurred.",
  //   });
  // });
});
