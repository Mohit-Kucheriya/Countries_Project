import "./CountryDetail.css";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import CountryDetailShimmer from "./CountryDetailShimmer";
import useTheme from "../hooks/useTheme";

function CountryDetail() {
  const { country } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation(); // Get state from Link navigation
  const [isDark] = useTheme();

  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Function to set country details
  const setCountryDetails = (data) => {
    const countryDetails = {
      name: data?.name?.common || "N/A",
      capital: data?.capital?.join(", ") || "N/A",
      flag: data?.flags?.svg || "",
      languages: data?.languages
        ? Object.values(data.languages).join(", ")
        : "N/A",
      population: data?.population?.toLocaleString("en-IN") || "N/A",
      region: data?.region || "N/A",
      currencies: data?.currencies
        ? Object.values(data.currencies)[0]?.name
        : "N/A",
      symbol: data?.currencies
        ? Object.values(data.currencies)[0]?.symbol
        : "N/A",
      subregion: data?.subregion || "N/A",
      nativeName: data?.name?.nativeName
        ? Object.values(data.name.nativeName)[0]?.common
        : "N/A",
      borders: data?.borders || [],
    };

    setCountryData(countryDetails);

    if (data.borders) {
      getBorderData(data.borders);
    }
  };

  useEffect(() => {
    if (state) {
      // If state is available, use it to set country data
      setCountryDetails(state);
    } else {
      // Otherwise, fetch data from API
      const controller = new AbortController();
      const signal = controller.signal;

      const getCountriesDetail = async () => {
        try {
          const response = await fetch(
            `https://restcountries.com/v3.1/name/${country}?fullText=true`,
            { signal }
          );

          if (!response.ok) throw new Error("Country not found");

          const [data] = await response.json();
          setCountryDetails(data);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error(error);
            setNotFound(true);
          }
        }
      };

      getCountriesDetail();

      return () => {
        controller.abort();
      };
    }
  }, [country, state]);

  const getBorderData = async (borders) => {
    try {
      const borderRequests = borders.map((border) =>
        fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) =>
          res.json()
        )
      );

      const borderDetails = await Promise.all(borderRequests);

      const borderNames = borderDetails.map(([detail]) => detail.name.common);

      setCountryData((prevState) => ({
        ...prevState,
        borders: borderNames,
      }));
    } catch (error) {
      console.error("Error fetching borders:", error);
    }
  };

  if (notFound)
    return <h1 className="h1-title not-found">Country Not Found</h1>;
  if (!countryData) return <CountryDetailShimmer />;

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>

        <div className="country-details">
          <div className="country-details-img">
            <img src={countryData.flag} alt={`${countryData.name} Flag`} />
          </div>

          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name:</b> {countryData.nativeName}
              </p>
              <p>
                <b>Population:</b> {countryData.population}
              </p>
              <p>
                <b>Region:</b> {countryData.region}
              </p>
              <p>
                <b>Sub Region:</b> {countryData.subregion}
              </p>
              <p>
                <b>Capital:</b> {countryData.capital}
              </p>
              <p>
                <b>Currencies:</b> {countryData.currencies}
              </p>
              <p>
                <b>Symbol:</b> {countryData.symbol}
              </p>
              <p>
                <b>Languages:</b> {countryData.languages}
              </p>
            </div>

            <div className="border-countries">
              <b>Border Countries: </b>
              {countryData.borders.length > 0 ? (
                countryData.borders.map((border) => (
                  <Link key={border} to={`/${border}`}>
                    {border}
                  </Link>
                ))
              ) : (
                <span>No bordering countries</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CountryDetail;
