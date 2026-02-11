import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interfaces";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroAction = async (slugId: string) => {
  const { data } = await heroApi.get<Hero>(`/${slugId}`);

  return {
    ...data,
    image: `${BASE_URL}/images/${data.image}`,
  };
};
