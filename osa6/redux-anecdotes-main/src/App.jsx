import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/anecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
//import anecdoteService from "./services/anecdotes";
//import { setAnecdotes } from "./reducers/anecdoteReducer";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
    //.then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;
