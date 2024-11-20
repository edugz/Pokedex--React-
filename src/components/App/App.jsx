import React from "react";
import "./App.css";
import { SearchProvider } from "../../hooks/useSearch";

import AppTitle from "../Header/AppTitle/AppTitle";
import PokeList from "../DexBody/PokeList/PokeList";

function App() {
  return (
    <SearchProvider>
      <AppTitle />
      <PokeList />
    </SearchProvider>
  );
}

export default App;
