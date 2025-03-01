import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

function CountryListShimmer({ card }) {
  return (
    <div className="countries-container">
      {Array(card)
        .fill(null)
        .map((_, index) => (
          <Link key={index} className="country-card">
            <div className="shimmer-image"></div>
            <div className="card-text">
              <Skeleton
                style={{ marginBlock: "1rem", height: "30px" }}
              ></Skeleton>
              <Skeleton count={3} style={{ marginBottom: "0.5rem" }} />
            </div>
          </Link>
        ))}
    </div>
  );
}

export default CountryListShimmer;
