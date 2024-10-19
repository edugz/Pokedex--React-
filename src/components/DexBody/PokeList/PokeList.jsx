import React, { useState, useEffect } from "react";
import "./PokeList.css";
import ErrorScreen from "../../Common/ErrorScreen/ErrorScreen";
import LoadingScreen from "../../Common/LoadingScreen/LoadingScreen";
import PokeItem from "./PokeItem/PokeItem";

function PokeList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Error Simulation for Error display optimization
        throw new Error("Simulated error for testing");

        /*         const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon Data");
        }
        const data = await response.json();
        setPokemonList(data.results); */
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
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
