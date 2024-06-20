import { useState, useEffect } from "react";
import weatherService from "../services/countries";

const ShowCountryInfo = ({ country }) => {
  const [weather, setWeather] = useState({});

  //($env:VITE_SOME_KEY="54l41n3n4v41m34rv0") -and (npm run dev) // Windows PowerShell
  //set "VITE_SOME_KEY=54l41n3n4v41m34rv0" && npm run dev // Windows cmd.exe
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_KEY;

  useEffect(() => {
    console.log("effect");
    weatherService
      .getWeather(getOpenWeatherUrl(country.capital, country.tld.cca2, apiKey))
      .then((weather) => {
        //console.log("get countries: ", countries);
        setWeather(weather);
      });
  }, []);

  const getOpenWeatherUrl = (city, countryCode, apiKey) => {
    //return `https://api.openweathermap.org/data/2.5/weather?q=Helsinki,fi&APPID=54l41n3n4v41m34rv0&units=metric`;
    return `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&APPID=${apiKey}&units=metric`;
  };

  const getCloudIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  if (weather.main === null || weather.main === undefined) return;
  else {
    return (
      <>
        <ul>
          <li>
            <h2>{country.name.common}</h2>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h4>languages:</h4>
            {Object.values(country.languages).map((val, k) => (
              <ul key={k}>
                <li>{val}</li>
              </ul>
            ))}
          </li>
        </ul>
        <div>
          <img src={country.flags.png} alt={country.flags.alt} />
        </div>
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>temperature: {weather.main.temp} Celcius</p>
          <p>
            <img
              src={getCloudIconUrl(weather.weather[0].icon)}
              alt={weather.weather[0].description}
            />
          </p>
          <p>wind: {weather.wind.speed} m/s</p>
        </div>
      </>
    );
  }
};

export default ShowCountryInfo;
