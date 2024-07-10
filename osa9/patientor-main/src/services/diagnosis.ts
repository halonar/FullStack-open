import axios from "axios";
import { Diagnosis } from "../types-full";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Array<Diagnosis>>(`${apiBaseUrl}/diagnosis`);
  return data;
};

export default {
  getAll,
  // getById,
  // create,
};
