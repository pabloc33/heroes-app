import type { Hero } from "./hero.interfaces";

export interface SummaryInformationResponse {
  totalHeroes: number;
  strongestHero: Hero;
  smartestHero: Hero;
  heroCount: number;
  villainCount: number;
}
