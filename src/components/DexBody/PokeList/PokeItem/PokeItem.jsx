import React from "react";
import "./PokeItem.css";

function PokeItem({ name, types }) {
  return (
    <div className="pokeitem-main-container">
      <img className="pokeitem-img" src="" alt="pokemon-image" />
      <p className="pokemon-number">#444</p>
      <h2 className="pokemon-name">{name}</h2>
      <div className="pokemon-types">
        <img className="type-img" src="" alt={types[0]} />
        {types[1] && <img className="type-img" src="" alt={types[1]} />}
      </div>
    </div>
  );
}

export default PokeItem;
