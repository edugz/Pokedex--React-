import React from "react";
import useSearch from "../../../../hooks/useSearch";

function SearchBar() {
  const { setSearchQuery } = useSearch();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        className="search-box"
        type="text"
        placeholder="Search Pokemon..."
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
