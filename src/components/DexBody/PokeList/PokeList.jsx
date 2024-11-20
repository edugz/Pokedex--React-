import React, { useState, useEffect } from "react";
import "./PokeList.css";
import ErrorScreen from "../../Common/ErrorScreen/ErrorScreen";
import LoadingScreen from "../../Common/LoadingScreen/LoadingScreen";
import PokeItem from "./PokeItem/PokeItem";
import usePokemonData from "../../../hooks/usePokemonData.js";
import usePagination from "../../../hooks/usePagination.js";
import Pagination from "./Pagination/Pagination.jsx";
import SearchBar from "./SearchBar/SearchBar.jsx";
import useSearch from "../../../hooks/useSearch.jsx";

function PokeList() {
  const { pokemonList, loading, error } = usePokemonData(493);
  const { searchQuery } = useSearch();

  const itemsPerPage = 16;
  const [sortBy, setSortBy] = useState("Default");

  /* Sorting Logic */
  const sortedPokemonList = [...pokemonList].sort((a, b) => {
    switch (sortBy) {
      case "A-Z":
        return a.name.localeCompare(b.name);
      case "Z-A":
        return b.name.localeCompare(a.name);
      case "Lowest #":
        return a.id - b.id;
      case "Highest #":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  /* Search Bar Filter Logic */
  const lowercasedQuery = searchQuery.trim().toLowerCase();
  const searchResults = sortedPokemonList.filter(({ name }) => {
    const nameMatches = name.toLowerCase().startsWith(lowercasedQuery);
    return nameMatches;
  });

  const { currentItems, currentPage, totalPages, handlePageChange } =
    usePagination(searchResults, itemsPerPage);

  useEffect(() => {
    handlePageChange(1);
  }, [searchQuery]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  return (
    <div className="poke-list-wrapper">
      <div className="sort-container">
        <SearchBar />
        <label htmlFor="sort" className="sort-label">
          Sort by:
        </label>
        <select
          className="sort-selection"
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Lowest #">Lowest #</option>
          <option value="Highest #">Highest #</option>
        </select>
      </div>

      <div className="list-main-container">
        {currentItems.map((pokemon) => {
          const pokeItemProps = {
            name: pokemon.name,
            id: pokemon.id,
            types: pokemon.types,
            sprite: pokemon.sprite,
            shinySprite: pokemon.shinySprite,
          };

          return <PokeItem key={pokemon.id} {...pokeItemProps} />;
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default PokeList;
