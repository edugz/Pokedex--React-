import React from "react";
import "./PokeList.css";
import ErrorScreen from "../../Common/ErrorScreen/ErrorScreen";
import LoadingScreen from "../../Common/LoadingScreen/LoadingScreen";
import PokeItem from "./PokeItem/PokeItem";
import usePokemonData from "../../../hooks/usePokemonData.js";
import usePagination from "../../../hooks/usePagination.js";
import Pagination from "./Pagination/Pagination.jsx";

function PokeList() {
  const { pokemonList, loading, error } = usePokemonData(493);
  const itemsPerPage = 16;
  const { currentItems, currentPage, totalPages, handlePageChange } =
    usePagination(pokemonList, itemsPerPage);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  return (
    <div className="poke-list-wrapper">
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
