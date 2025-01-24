import React from "react";
import { render, screen } from "@testing-library/react";
import { Banner } from "@/modules/home/components/banner";
import "@testing-library/jest-dom";

// Mock next/image to avoid loading actual images
jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} data-testid="mock-image" />);

// Mock the UI components
jest.mock("@/components/ui/card", () => ({
  Card: ({ children }) => <div data-testid="mock-card">{children}</div>,
  CardContent: ({ children }) => <div data-testid="mock-card-content">{children}</div>,
}));

jest.mock("@/components/ui", () => ({
  Carousel: ({ children }) => <div data-testid="mock-carousel">{children}</div>,
  CarouselContent: ({ children }) => <div data-testid="mock-carousel-content">{children}</div>,
  CarouselItem: ({ children }) => <div data-testid="mock-carousel-item">{children}</div>,
  CarouselNext: () => <button data-testid="mock-carousel-next">Next</button>,
  CarouselPrevious: () => <button data-testid="mock-carousel-prev">Prev</button>,
}));

describe("Banner Component", () => {
  it("renders the carousel with all images", () => {
    render(<Banner />);

    // Check if the carousel is rendered
    expect(screen.getByTestId("mock-carousel")).toBeInTheDocument();
    expect(screen.getByTestId("mock-carousel-content")).toBeInTheDocument();

    // Check if all images are rendered
    const images = screen.getAllByTestId("mock-image");
    expect(images.length).toBe(4);

    images.forEach((img, index) => {
      expect(img).toHaveAttribute("alt", `bannerImage-${index}`);
    });
  });

  it("renders the navigation buttons", () => {
    render(<Banner />);

    expect(screen.getByTestId("mock-carousel-prev")).toBeInTheDocument();
    expect(screen.getByTestId("mock-carousel-next")).toBeInTheDocument();
  });
});
