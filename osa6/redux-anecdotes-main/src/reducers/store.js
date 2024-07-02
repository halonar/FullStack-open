//import { createStore, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./anecdoteReducer";
import filterReducer from "./filterReducer";
import notificationReducer from "./notificationReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export default store;

// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   filter: filterReducer,
// });
// const store = createStore(reducer);
