import axios from "axios";
const baseUrl = "http://localhost:3001/persons"; //json server
//const baseUrl = "http://localhost:3001/api/persons"; //express server
//const baseUrl = "/api/persons"; //express production (dist)

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      //console.log(error);
      console.log("create post: ", error.response.data);
      throw error.response.data;
    });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response);
      throw error.response;
    });
};

const deleteOne = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export default { getAll, create, update, deleteOne };
