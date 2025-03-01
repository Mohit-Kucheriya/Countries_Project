import React from "react";
import { Link } from "react-router-dom";

function CountryCard({ country }) {
  const { name, capital, region, population, flags } = country;

  return (
    <Link to={`/${name.common}`} className="country-card" state={country}>
      <img src={flags.svg} alt={flags.alt} />
      <div className="card-text">
        <h3 className="card-title">{name.common}</h3>
        <p>
          <b>Population: </b>
          {population.toLocaleString("en-IN")}
        </p>
        <p>
          <b>Region: </b>
          {region}
        </p>
        <p>
          <b>Capital: </b>
          {capital?.[0]}
        </p>
      </div>
    </Link>
  );
}

export default CountryCard;
