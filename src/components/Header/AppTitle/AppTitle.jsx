import React from "react";
import "./AppTitle.css";

function AppTitle() {
  return (
    <div className="title-main-container">
      <div className="title-image-container">
        <img className="title-image" src="/logo.png" alt="pokemon-logo" />
      </div>
      <div className="pokedex-sub-title">
        <h2>The National Pokedex</h2>
      </div>
    </div>
  );
}

export default AppTitle;
