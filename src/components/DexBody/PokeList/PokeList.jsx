import React, { useState, useEffect } from "react";
import "./PokeList.css";
import ErrorScreen from "../../Common/ErrorScreen/ErrorScreen";
import LoadingScreen from "../../Common/LoadingScreen/LoadingScreen";
import PokeItem from "./PokeItem/PokeItem";

function PokeList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

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
              sprite: detailedData.sprites.front_default,
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

  // Calculate Pokemon for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pokemonList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(pokemonList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  console.log(pokemonList);

  return (
    <div className="poke-list-wrapper">
      <div className="list-main-container">
        {currentItems.map((pokemon) => (
          <PokeItem
            key={pokemon.id}
            name={pokemon.name}
            id={pokemon.id}
            types={pokemon.types}
            sprite={pokemon.sprite}
            shinySprite={pokemon.shinySprite}
          />
        ))}
      </div>

      <div className="pagination-container">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            className={`pagination-button ${
              currentPage === page + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PokeList;
