// src/components/Search/Search.jsx
import React from 'react'; // Importing React
import './Search.css'; // Importing styles for the search component

const Search = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchChange} // Handling search input change
        placeholder="Search for categories"
      />
    </div>
  );
};

export default Search; // Exporting the Search component
