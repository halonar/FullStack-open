import axios from "axios";
import { useState, useEffect } from "react";

const useResource = (baseUrl) => {
  //const baseUrl = "/api/blogs";

  const [resources, setResources] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(baseUrl);
        setResources((resource) => ({
          ...resource,
          ...response,
          found: true,
        }));
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setResources((resource) => ({
          ...resource,
          found: false,
        }));
      }
    };
    getData();
  }, [baseUrl, refreshData]);

  let token = null;
  const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
  };

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  };

  const create = async (resource) => {
    try {
      const config = { headers: { Authorization: token } };
      const response = await axios.post(baseUrl, resource, config);
      return response.data;
    } catch (error) {
      console.log("create failed: ", error);
      throw new Error(`create failed: ${error}`);
    }
  };

  const update = async (id, resource) => {
    const config = { headers: { Authorization: token } };
    const response = await axios.put(`${baseUrl}/${id}`, resource, config);
    return response.data;
  };

  const remove = async (id) => {
    try {
      const config = { headers: { Authorization: token } };
      const response = await axios.delete(`${baseUrl}/${id}`, config);
      return response.data;
    } catch (error) {
      console.log("remove failed: ", error);
    }
  };

  const service = {
    getAll,
    create,
    update,
    remove,
    setToken,
  };

  return [resources, service];
};

//export default { getAll, create, update, remove, setToken };
