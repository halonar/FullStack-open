import { useState } from "react";
import ShowCountryInfo from "./ShowCountryInfo";

const ShowCountry = ({ country, countryFilter }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <li>
        {country.name.common}
        <button type="button" onClick={() => setShowInfo(true)}>
          Show
        </button>
        {showInfo && <ShowCountryInfo country={country} />}
      </li>
    </>
  );
};

export default ShowCountry;
