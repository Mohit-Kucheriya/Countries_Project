import { useState } from "react";
import CountriesList from "./CountriesList";
import SearchComponent from "./SearchComponent";
import useTheme from "../hooks/useTheme";

function Home() {
  const [query, setQuery] = useState("");
  const [isDark] = useTheme();

  return (
    <>
      <main className={`${isDark ? "dark" : ""}`}>
        <SearchComponent setQuery={setQuery} />
        <CountriesList query={query} />
      </main>
    </>
  );
}

export default Home;
