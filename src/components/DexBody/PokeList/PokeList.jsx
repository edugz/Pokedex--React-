import React, { useState, useEffect } from "react";
import "./PokeList.css";
import ErrorScreen from "../../Common/ErrorScreen/ErrorScreen";
import LoadingScreen from "../../Common/LoadingScreen/LoadingScreen";
import PokeItem from "./PokeItem/PokeItem";

function PokeList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const totalPages = Math.ceil(pokemonList.length / itemsPerPage);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage > 3) {
      buttons.push(
        <button
          key={1}
          className="pagination-button"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (currentPage > 4) {
        buttons.push(<span key="left-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        buttons.push(<span key="right-ellipsis">...</span>);
        buttons.push(
          <button
            key={totalPages}
            className="pagination-button"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
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
        <button
          onClick={() =>
            handlePageChange(currentPage > 5 ? currentPage - 5 : 1)
          }
          disabled={currentPage === 1}
          className="pagination-button jump-5"
        >
          &lt;&lt;
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button previous"
        >
          Previous
        </button>
        {getPaginationButtons()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button next"
        >
          Next
        </button>
        <button
          onClick={() =>
            handlePageChange(
              currentPage < totalPages - 4 ? currentPage + 5 : totalPages
            )
          }
          disabled={currentPage === totalPages}
          className="pagination-button jump-5"
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
}

export default PokeList;
