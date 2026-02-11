import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { usePaginetedHero } from "@/heroes/hooks/usePaginetedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/contex/FavoriteHeroContext";

vi.mock("@/heroes/hooks/usePaginetedHero");

const mockUsePaginetedHero = vi.mocked(usePaginetedHero);

mockUsePaginetedHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
} as unknown as ReturnType<typeof mockUsePaginetedHero>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteHeroProvider>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteHeroProvider>
    </MemoryRouter>,
  );
};

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render HomePage with default values", () => {
    const { container } = renderHomePage();

    expect(container).toMatchSnapshot();
  });

  test("should call usePaginatedHero with default values", () => {
    renderHomePage();

    expect(mockUsePaginetedHero).toHaveBeenCalledWith(1, 6, "all");
  });

  test("should call usePaginatedHero with custom query params", () => {
    renderHomePage(["/?page=2&limit=10&category=villains"]);

    expect(mockUsePaginetedHero).toHaveBeenCalledWith(2, 10, "villains");
  });

  test("should called usePaginatedHero with default page and same limit on tab click", () => {
    renderHomePage(["/?tab=favorites&page=2&limit=10"]);

    const [, , , villainsTab] = screen.getAllByRole("tab");

    fireEvent.click(villainsTab);

    expect(mockUsePaginetedHero).toHaveBeenCalledWith(1, 10, "villain");

    // expect(mockUsePaginetedHero).toHaveBeenCalledWith(2, 10, "villains");
  });
});
