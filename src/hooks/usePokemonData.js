import { useState, useEffect } from "react";

function usePokemonData() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=493"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon Data");
        }
        const data = await response.json();

        const detailedPokemonList = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailedResponse = await fetch(pokemon.url);
            const detailedData = await detailedResponse.json();
            return {
              name: detailedData.name,
              id: detailedData.id,
              types: detailedData.types.map((type) => type.type.name),
              sprite:
                detailedData.sprites.other["official-artwork"].front_default,
              shinySprite: detailedData.sprites.front_shiny,
            };
          })
        );

        setPokemonList(detailedPokemonList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return { pokemonList, loading, error };
}

export default usePokemonData;
