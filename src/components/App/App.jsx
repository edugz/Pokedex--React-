import React from "react";
import "./App.css";

import AppTitle from "../Header/AppTitle/AppTitle";
import PokeList from "../DexBody/PokeList/PokeList";

function App() {
  return (
    <>
      <AppTitle />
      <PokeList />
    </>
  );
}

export default App;
