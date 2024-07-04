import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogReducer";
import authenticationReducer from "./authenticationReducer";
import notificationReducer from "./notificationReducer";
import informationReducer from "./informationReducer";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    blogs: blogReducer,
    notification: notificationReducer,
    information: informationReducer,
  },
});

export default store;
