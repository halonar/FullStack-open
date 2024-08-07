import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
//import anecdoteService from "../services/anecdotes";
//import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    //const newAnecdote = await anecdoteService.createNew(content);
    //dispatch(createAnecdote(newAnecdote));
    //dispatch(createAnecdote(content));
    //dispatch({ type: "anecdotes/createAnecdote", payload: content });
    //dispatch({ type: "anecdotes/createAnecdote", payload: newAnecdote });
    dispatch(createAnecdote(content));
    dispatch(setNotification(`you added '${content}'`, 10));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        {" "}
        <input name="anecdote" /> <button type="submit">create</button>{" "}
      </form>
    </>
  );
};

export default AnecdoteForm;
