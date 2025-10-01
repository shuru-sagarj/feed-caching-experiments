import { MAX_POKEMONS_PER_REQUEST } from "@/utils/constants";
import axios from "axios";

export const fetchPokemonPaginated = async ({
  limit = MAX_POKEMONS_PER_REQUEST,
  offset = 0,
}: {
  limit: number;
  offset: number;
}) => {
  const result = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  if (result) {
    return result.data;
  }
};
