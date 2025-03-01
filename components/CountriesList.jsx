import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountryListShimmer from "./CountryListShimmer";

function CountriesList({ query }) {
  const [countriesData, setCountriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    setCountriesData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      {isLoading ? (
        <CountryListShimmer card={8} />
      ) : (
        <div className="countries-container">
          {countriesData
            .filter(
              (country) =>
                country.name.common.toLowerCase().includes(query) ||
                country.region.toLowerCase().includes(query)
            )
            .map((country, index) => {
              return <CountryCard key={index} country={country} />;
            })}
        </div>
      )}
    </>
  );
}

export default CountriesList;
