import type { Hero } from "./hero.interfaces";

export interface HeroesResponse {
  total: number;
  pages: number;
  heroes: Hero[];
}
