import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";
import { setInformation } from "./informationReducer";

const loginSlice = createSlice({
  name: "authentication",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },

    removeUser(state, action) {
      return null;
    },
  },
});

export const { setUser, removeUser } = loginSlice.actions;
export default loginSlice.reducer;

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

const loginError = "wrong username or password";

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
    } catch (exception) {
      console.log("login: ", exception.response.data.error);
      dispatch(setNotification(loginError, 5));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(removeUser());
  };
};
