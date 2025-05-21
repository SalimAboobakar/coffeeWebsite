// src/components/Location.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Location from "./Location";

// Helpers to mock geolocation and fetch
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

describe("Location component", () => {
  beforeAll(() => {
    // Replace navigator.geolocation
    Object.defineProperty(global.navigator, "geolocation", {
      value: mockGeolocation,
    });
  });

  beforeEach(() => {
    jest.resetAllMocks();
    // default fetch mock
    global.fetch = jest.fn();
  });

  test("displays loading initially", () => {
    // Do not resolve geolocation or fetch
    mockGeolocation.getCurrentPosition.mockImplementation(() => {});
    render(<Location />);
    expect(screen.getByText(/Detecting location/i)).toBeInTheDocument();
  });

  test("shows location from reverse geocode on geolocation success", async () => {
    const fakePosition = { coords: { latitude: 10, longitude: 20 } };
    // Mock geolocation success callback
    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success(fakePosition);
    });
    // Mock reverse geocode fetch
    const addressData = {
      address: { city: "TestCity", country: "TestCountry" },
    };
    global.fetch.mockResolvedValueOnce({ json: async () => addressData });

    render(<Location />);
    // Wait for component to update
    await waitFor(() =>
      expect(screen.getByText(/TestCity, TestCountry/)).toBeInTheDocument()
    );
  });

  test("falls back to IP-based geolocation when geolocation fails", async () => {
    // Mock geolocation error
    mockGeolocation.getCurrentPosition.mockImplementation((_, error) => {
      error();
    });
    // Mock IP-based fetch
    const fallbackData = {
      city: "IPCity",
      regionName: "IPRegion",
      country: "IPCountry",
    };
    global.fetch.mockResolvedValueOnce({ json: async () => fallbackData });

    render(<Location />);
    await waitFor(() =>
      expect(
        screen.getByText(/IPCity, IPRegion, IPCountry/)
      ).toBeInTheDocument()
    );
  });

  test("displays error message when both methods fail", async () => {
    // Mock geolocation error
    mockGeolocation.getCurrentPosition.mockImplementation((_, error) => {
      error();
    });
    // Mock fallback fetch to throw
    global.fetch.mockRejectedValueOnce(new Error("fail"));

    render(<Location />);
    await waitFor(() =>
      expect(
        screen.getByText(/Unable to determine location/)
      ).toBeInTheDocument()
    );
  });
});
