import { describe, expect, test } from "vitest";
import { getHeroAction } from "./get-hero.action";

describe("getHeroAction", () => {
  test("should fetch hero data and return with complete image url", async () => {
    const result = await getHeroAction("clark-kent");

    expect(result.image).toContain("http");
    expect(result).toStrictEqual({
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
      image: "http://localhost:3001/images/1.jpeg",
      firstAppearance: "1938",
      status: "Active",
      category: "Hero",
      universe: "DC",
    });
  });

  test("should throw an error if hero is not found", async () => {
    const slugId = "clark-kent2";
    const result = await getHeroAction(slugId).catch((error) => {
      expect(error).toBeDefined();
      expect(error.message).toBe("Request failed with status code 404");
    });

    expect(result).toBeUndefined();
  });
});
