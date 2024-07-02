import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = async (newAnecdote) => {
  //axios.post(baseUrl, newAnecdote).then((res) => res.data);
  const { data } = await axios.post(baseUrl, newAnecdote);
};

export const updateAnecdote = (updatedAnecdote) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);
