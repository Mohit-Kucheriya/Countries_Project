import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CountryDetailShimmer() {
  return (
    <main>
      <div className="country-details-container">
        <Skeleton width={"20%"} style={{ padding: "0.5rem 1.5rem" }}></Skeleton>

        <div className="country-details">
          <div className="country-details-img">
            <Skeleton
              height={250}
              style={{ maxWidth: "450px", width: "100%", marginTop: "1rem" }}
            ></Skeleton>
          </div>

          <div className="details-text-container">
            <Skeleton
              width={600}
              height={35}
              style={{ marginBottom: "2rem" }}
            ></Skeleton>
            <div className="details-text">
              <Skeleton
                count={5}
                width={400}
                height={15}
                style={{ marginBottom: "1rem" }}
              ></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CountryDetailShimmer;
