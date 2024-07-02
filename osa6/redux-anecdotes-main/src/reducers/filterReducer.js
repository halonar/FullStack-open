import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
      return { ...state, payload: action.payload };
    },
  },
});

export const { filterAnecdotes } = filterSlice.actions;
export default filterSlice.reducer;

/**-------------------------------------------------------------
const filterReducer = (state = "", action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "FILTER_ANECDOTES": {
      //state = {state.filter: action.payload.filter}
      return { ...state, payload: action.payload };
    }
    default:
      return state;
  }
};

export const filterAnecdotes = (filter) => {
  return {
    type: "FILTER_ANECDOTES",
    payload: filter,
  };
};

export default filterReducer;
--------------------------------------*/
