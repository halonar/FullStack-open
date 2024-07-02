import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNotificationDispatch } from "./NotificationContext";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    console.log("vote", anecdote);

    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    updateAnecdoteMutation.mutate(changedAnecdote);

    dispatch({
      payload: `anecdote ${anecdote.content} voted`,
    });
  };

  // const anecdotes = [
  //   {
  //     content: "If it hurts, do it more often",
  //     id: "47145",
  //     votes: 0,
  //   },
  // ];

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    dispatch({
      payload: "anecdote service not available due to problems in server",
    });

    return (
      // <Notification
      //   error={"anecdote service not available due to problems in server"}
      // />
      <Notification />
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
