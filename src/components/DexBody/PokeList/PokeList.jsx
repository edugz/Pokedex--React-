import React, { useState, useEffect } from "react";
import "./PokeList.css";
import PokeItem from "./PokeItem/PokeItem";

function PokeList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon Data");
        }
        const data = await response.json();
        setTimeout(() => {
          setPokemonList(data.results);
          setLoading(false);
        }, 3000); // 3-second delay for testing purposes: loading screen
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000); // 3-second delay for testing purposes: loading screen
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
        <p>Loading Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(pokemonList);

  return (
    <div className="list-main-container">
      {pokemonList.map((pokemon) => (
        <PokeItem key={pokemon.name} name={pokemon.name} number={pokemon.id} />
      ))}
    </div>
  );
}

export default PokeList;
