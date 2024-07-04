import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getAllBlogs } from "../reducers/blogReducer";
import restService from "../services/restService";

const useFetch = (url) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get(url);
        const response = await restService.getAll(url);
        dispatch(getAllBlogs(response.data));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError(error.response.status);
          console.log("Unauthorized access. Please log in.");
        } else {
          setError(error);
          console.log("An unexpected error occurred:", error);
        }
      }
    };

    fetchData();
  }, [dispatch, url]);

  return { error };
  //return { data, error, loading };

  // return (
  //   // your component JSX
  // );
};

export default useFetch;
