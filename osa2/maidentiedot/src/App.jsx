import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import ShowCountries from "./components/ShowCountries";
import countriesService from "./services/countries";

const App = () => {
  useEffect(() => {
    console.log("effect");
    countriesService.getAll().then((countries) => {
      //console.log("get countries: ", countries);
      setCountries(countries);
    });
  }, []);

  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  const handleFilterChange = (event) => {
    //console.log(event.target.value);
    setCountryFilter(event.target.value);
  };

  return (
    <div>
      {/* <div>debug: {countryFilter}</div> */}

      <h2>Maiden tiedot</h2>
      <Filter
        countryFilter={countryFilter}
        handleFilterChange={handleFilterChange}
      />
      <ShowCountries
        countries={countries}
        setCountries={setCountries}
        countryFilter={countryFilter}
      />
    </div>
  );
};

export default App;
