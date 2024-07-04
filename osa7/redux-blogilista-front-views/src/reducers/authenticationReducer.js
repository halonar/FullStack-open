import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import restService from "../services/restService";
import { setNotification } from "./notificationReducer";
import { setInformation } from "./informationReducer";

const baseUrl = "/api/login";
const loginError = "wrong username or password";

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
      restService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      restService.setToken(user.token);
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
