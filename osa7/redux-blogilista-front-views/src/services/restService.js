import axios from "axios";

//const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async (baseUrl) => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};

const create = async (baseUrl, newObject) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    console.log("create failed: ", error);
    throw new Error(`create failed: ${error}`);
  }
};

const update = async (baseUrl, id, newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const remove = async (baseUrl, id) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    console.log("remove failed: ", error);
  }
};

export default { getAll, create, update, remove, setToken };
