import SearchBar from "./SearchBar";
import SelectFilter from "./SelectFilter";

function SearchComponent({ setQuery }) {
  return (
    <div className="search-filter-container">
      <SearchBar setQuery={setQuery} />
      <SelectFilter setQuery={setQuery} />
    </div>
  );
}

export default SearchComponent;
