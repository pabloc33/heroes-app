import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";

if (typeof window.ResizeObserver === "undefined") {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver;
}

const renderWithRouter = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControls />
    </MemoryRouter>,
  );
};

describe("SearchControls", () => {
  test("should render SearchControls with default values", () => {
    const { container } = renderWithRouter();

    expect(container).toMatchSnapshot();
  });

  test("should set input value when search param is set", () => {
    renderWithRouter(["/?name=batman"]);

    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams...",
    );

    expect(input.getAttribute("value")).toBe("batman");
  });

  test("should change params when input is changed and enter is pressed", () => {
    renderWithRouter(["/?name=batman"]);

    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams...",
    );

    expect(input.getAttribute("value")).toBe("batman");

    fireEvent.change(input, { target: { value: "superman" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input.getAttribute("value")).toBe("superman");
  });

  test("should change params strength when slider is changed", () => {
    renderWithRouter(["/?name=batman&active-accordion=advance-filters"]);
    const slider = screen.getByRole("slider");

    expect(slider.getAttribute("aria-valuenow")).toBe("0");

    fireEvent.keyDown(slider, { key: "ArrowRight" });

    expect(slider.getAttribute("aria-valuenow")).toBe("1");
  });

  test("should accordion be open when active-accordion param is set", () => {
    renderWithRouter(["/?name=batman&active-accordion=advance-filters"]);

    const accordion = screen.getByTestId("accordion");
    const accordionItem = accordion.querySelector("div");

    expect(accordionItem?.getAttribute("data-state")).toBe("open");
  });

  test("should accordion be close when active-accordion param is not set", () => {
    renderWithRouter(["/?name=batman"]);

    const accordion = screen.getByTestId("accordion");
    const accordionItem = accordion.querySelector("div");

    expect(accordionItem?.getAttribute("data-state")).toBe("closed");
  });
});
