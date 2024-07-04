import axios from "axios";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async ({ queryKey }) => {
  try {
    const [_, url] = queryKey;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};

const create = async ({ url, data }) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    console.log("create failed: ", error);
    throw new Error(`create failed: ${error}`);
  }
};

const update = async ({ url, id, data }) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(`${url}/${id}`, data, config);
  return response.data;
};

const remove = async ({ url, id }) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.delete(`${url}/${id}`, config);
    return response.data;
  } catch (error) {
    console.log("remove failed: ", error);
  }
};

export default { getAll, create, update, remove, setToken };
