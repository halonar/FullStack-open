import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

const getAll = () => {
  const request = axios.get(baseUrl + "api/all");
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

const getOne = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const getWeather = (openWeatherUrl) => {
  const request = axios.get(openWeatherUrl);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export default { getAll, getOne, getWeather };
