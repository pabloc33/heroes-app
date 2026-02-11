import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { FavoriteHeroProvider } from "../contex/FavoriteHeroContext";
import { useHeroSummary } from "../hooks/useHeroSummary";
import type { SummaryInformationResponse } from "../types/summary-information.response";
import { HeroStats } from "./HeroStats";

vi.mock("../hooks/useHeroSummary");
const mockUseHeroSummary = vi.mocked(useHeroSummary);

const mockSummaryData: SummaryInformationResponse = {
  totalHeroes: 25,
  strongestHero: {
    id: "1",
    name: "Clark Kent",
    slug: "clark-kent",
    alias: "Superman",
    powers: [
      "Súper fuerza",
      "Vuelo",
      "Visión de calor",
      "Visión de rayos X",
      "Invulnerabilidad",
      "Súper velocidad",
    ],
    description:
      "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
    strength: 10,
    intelligence: 8,
    speed: 9,
    durability: 10,
    team: "Liga de la Justicia",
    image: "1.jpeg",
    firstAppearance: "1938",
    status: "Active",
    category: "Hero",
    universe: "DC",
  },
  smartestHero: {
    id: "2",
    name: "Bruce Wayne",
    slug: "bruce-wayne",
    alias: "Batman",
    powers: [
      "Artes marciales",
      "Habilidades de detective",
      "Tecnología avanzada",
      "Sigilo",
      "Genio táctico",
    ],
    description:
      "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
    strength: 6,
    intelligence: 10,
    speed: 6,
    durability: 7,
    team: "Liga de la Justicia",
    image: "2.jpeg",
    firstAppearance: "1939",
    status: "Active",
    category: "Hero",
    universe: "DC",
  },
  heroCount: 18,
  villainCount: 7,
};

const mockHero = {
  id: "1",
  name: "Clark Kent",
  slug: "clark-kent",
  alias: "Superman",
  powers: [
    "Súper fuerza",
    "Vuelo",
    "Visión de calor",
    "Visión de rayos X",
    "Invulnerabilidad",
    "Súper velocidad",
  ],
  description:
    "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
  strength: 10,
  intelligence: 8,
  speed: 9,
  durability: 10,
  team: "Liga de la Justicia",
  image: "1.jpeg",
  firstAppearance: "1938",
  status: "Active",
  category: "Hero",
  universe: "DC",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderHeroStas = (mockData?: Partial<SummaryInformationResponse>) => {
  if (mockData) {
    mockUseHeroSummary.mockReturnValue({
      data: mockData,
    } as unknown as ReturnType<typeof useHeroSummary>);
  } else {
    mockUseHeroSummary.mockReturnValue({
      data: undefined,
    } as unknown as ReturnType<typeof useHeroSummary>);
  }

  return render(
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroProvider>
        <HeroStats />
      </FavoriteHeroProvider>
    </QueryClientProvider>,
  );
};

describe("HeroStats", () => {
  test("should render component with default values", () => {
    const { container } = renderHeroStas();

    expect(screen.getByText("Loading...")).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test("should render HeroStas with mock information", () => {
    const { container } = renderHeroStas(mockSummaryData);

    expect(container).toMatchSnapshot();
    expect(screen.getByText("Total de personajes")).toBeDefined();
    expect(screen.getByText("Favoritos")).toBeDefined();
    expect(screen.getByText("Fuerte")).toBeDefined();
  });

  test("should change the percentage of favorites when a hero is added to favorite", () => {
    localStorage.setItem("favorites", JSON.stringify([mockHero]));
    renderHeroStas(mockSummaryData);

    const favoritePercentageElement = screen.getByTestId("favorite-percentage");

    expect(favoritePercentageElement.innerHTML).toContain("4.00%");

    const favoriteCountElement = screen.getByTestId("favorite-count");
    expect(favoriteCountElement.innerHTML).toContain("1");
  });
});
