import ShowCountry from "./ShowCountry";
import ShowCountryInfo from "./ShowCountryInfo";

const ShowCountries = ({ countries, setCountries, countryFilter }) => {
  const selectedCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  );

  if (selectedCountries.length > 10) {
    return <p>too many matches, specify another filter</p>;
  } else if (selectedCountries.length > 1) {
    return (
      <ul>
        {selectedCountries.map((country) => (
          <ShowCountry
            key={country.name.common}
            country={country}
            countryFilter={countryFilter}
          />
        ))}
      </ul>
    );
  } else if (selectedCountries.length === 1) {
    return <ShowCountryInfo country={selectedCountries[0]} />;
  }
};

export default ShowCountries;
