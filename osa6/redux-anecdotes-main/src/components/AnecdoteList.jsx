import { useDispatch, useSelector } from "react-redux";
import { incrementVotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const filteredAnecdotes = anecdotes.filter((anecdote) => {
    if (anecdote.content.search(filter.payload) !== -1) {
      return anecdote;
    }
  });

  filteredAnecdotes.sort((a, b) => a.votes - b.votes).reverse();
  //anecdotes.sort((a, b) => a.votes - b.votes).reverse();

  const vote = (id, anecdote) => {
    console.log("vote", id);
    //dispatch({ type: "anecdotes/incrementVotes", payload: id });
    dispatch(incrementVotes(id, anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10));

    // dispatch({
    //   type: "notification/setNotification",
    //   payload: `you voted '${anecdote.content}'`,
    // });

    // setTimeout(function () {
    //   dispatch({
    //     type: "notification/setNotification",
    //     payload: "waiting for more action..",
    //   });
    // }, 5000);
  };

  return (
    <ul>
      {filteredAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id, anecdote)}
        />
      ))}
    </ul>
  );
};

export default AnecdoteList;
