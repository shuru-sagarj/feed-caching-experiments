import { fetchPokemonPaginated } from "@/services/api/pokemon/pokemon";
import { MAX_POKEMONS_PER_REQUEST } from "@/utils/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePokemon = () => {
  return useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: ({ pageParam = 5 }) =>
      fetchPokemonPaginated({
        offset: pageParam,
        limit: MAX_POKEMONS_PER_REQUEST,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) {
        return;
      }
      const url = new URL(lastPage.next);
      const offset = url.searchParams.get("offset");
      return offset ? Number(offset) : undefined;
    },
  });
};
