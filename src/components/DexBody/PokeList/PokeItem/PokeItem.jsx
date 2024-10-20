import React from "react";
import "./PokeItem.css";

function startWithUppercase(string) {
  const capitalizedString = string.charAt(0).toUpperCase() + string.slice(1);
  return capitalizedString;
}

function PokeItem({ name, id, sprite, shinySprite, types }) {
  const capitalizedName = startWithUppercase(name);
  const formattedId = `#${String(id).padStart(4, "0")}`;
  const formattedType01 = startWithUppercase(types[0]);
  const formattedType02 = types[1] && startWithUppercase(types[1]);

  return (
    <div className="pokeitem-main-container">
      <img className="pokeitem-img" src={sprite} alt="pokemon-image" />
      <p className="pokemon-number">{formattedId}</p>
      <h2 className="pokemon-name">{capitalizedName}</h2>
      <div className="pokemon-types">
        <span className={`type-box type-${types[0]}`}>{formattedType01}</span>
        {types[1] && (
          <span className={`type-box type-${types[1]}`}>{formattedType02}</span>
        )}
      </div>
    </div>
  );
}

export default PokeItem;
