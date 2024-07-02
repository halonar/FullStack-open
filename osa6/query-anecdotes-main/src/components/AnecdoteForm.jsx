import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { createAnecdote } from "../requests";

const getId = () => (100000 * Math.random()).toFixed(0);

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onError: (error) => {
      dispatch({
        payload:
          "too short anecdote, must have length 5 or more characters" + error,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 });

    dispatch({
      payload: `new anecdote ${content} created`,
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
