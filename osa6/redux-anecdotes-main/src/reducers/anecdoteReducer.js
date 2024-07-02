import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
    //filter: "",
  };
};

// eslint-disable-next-line no-unused-vars
const initialState = anecdotesAtStart.map(asObject);
//const initialState = anecdotesAtStart.map((anecdote) => asObject(anecdote));

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  //initialState,
  reducers: {
    /** 
    createAnecdote(state, action) {
      state.push(action.payload);
      // const content = action.payload;
      // state.push({ content, id: getId(), votes: 0 });
    },
    incrementVotes(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      console.log(JSON.parse(JSON.stringify(state)));

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    */
    appendAnecdote(state, action) {
      state.push(action.payload);
    },

    updateAnecdote(state, action) {
      const id = action.payload.id;

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.payload
      );
    },

    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const {
  /*createAnecdote, incrementVotes,*/
  appendAnecdote,
  updateAnecdote,
  setAnecdotes,
} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const incrementVotes = (id, anecdote) => {
  const changedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };

  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, changedAnecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

/**-------------------------------------------------------------
const anecdoteReducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "NEW_ANECDOTE": {
      return [...state, action.payload];
    }

    case "INCREMENT_VOTES": {
      const id = action.payload.id;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    }
    default: {
      return state;
    }
  }
};

export const createAnecdote = (anecdote) => {
  return {
    type: "NEW_ANECDOTE",
    payload: {
      content: anecdote,
      id: getId(),
      votes: 0,
    },
  };
};

export const incrementVotes = (id) => {
  return {
    type: "INCREMENT_VOTES",
    payload: { id },
  };
};

export default anecdoteReducer;
--------------------------------------*/
