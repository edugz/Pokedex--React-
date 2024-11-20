import React from "react";
import "./LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="loading-container">
      <p>Loading Pokémon!</p>
      <div className="loading-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
}

export default LoadingScreen;
