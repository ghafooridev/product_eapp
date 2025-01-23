// import '@testing-library/jest-dom'
// import { render, screen } from '@testing-library/react'
// import Page from '@/app/(public)/page'

// describe('Page', () => {
//   it('renders a heading', () => {
//     render(<Page />)

//     const heading = screen.getByRole('heading')

//     expect(heading).toBeInTheDocument()
//     expect(heading).toBe('Digital Shop')
//   })
// })
import React from "react";
import { render, screen } from "@testing-library/react";
import Page from '@/app/(public)/page'
import "@testing-library/jest-dom";
// import { MonitorSmartphone } from "lucide-react";
import Link from "next/link";

// Mock the Button component
jest.mock("@/components/ui", () => ({
  Button: ({ children }) => <div data-testid="mock-button">{children}</div>,
}));

jest.mock("lucide-react", () => ({
  MonitorSmartphone: () => <svg data-testid="lucide-icon" />,
}));

describe("SitePage", () => {
  it("renders the heading and elements correctly", () => {
    render(<Page />);

    // Check for "Welcome to" text
    expect(screen.getByText("Welcome to")).toBeInTheDocument();

    // Check for the Digital Shop title
    expect(screen.getByRole("heading", { name: "Digital Shop" })).toBeInTheDocument();

    // Check for the MonitorSmartphone icon (optional, as it's an SVG)
    expect(screen.getByTestId("lucide-icon")).toBeInTheDocument();

    // Check for the mocked Button component
    expect(screen.getByTestId("mock-button")).toBeInTheDocument();

    // Check if the button contains the correct link text
    expect(screen.getByRole("link", { name: "Go to Products" })).toHaveAttribute("href", "/products");
  });
});
