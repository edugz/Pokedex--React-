import React from "react";
import "./LoadingScreen";

function LoadingScreen() {
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

export default LoadingScreen;
