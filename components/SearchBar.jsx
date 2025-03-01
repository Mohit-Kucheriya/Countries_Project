function SearchBar({ setQuery }) {
  return (
    <div className="search-container">
      <div className="search-input">
        <input
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search countries"
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      {/* <button>Reset</button> */}
    </div>
  );
}

export default SearchBar;
