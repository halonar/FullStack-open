import { createSlice } from "@reduxjs/toolkit";
import restService from "../services/restService";
import { setNotification } from "./notificationReducer";
import { setInformation } from "./informationReducer";

const baseUrl = "/api/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },

    removeUser(state, action) {
      return null;
    },
  },
});

export const { setUsers, removeUser } = userSlice.actions;
export default userSlice.reducer;

export const initializeUsers = (users) => {
  return async (dispatch) => {
    const users = await restService.getAll(baseUrl);
    dispatch(setUsers(users));
  };
};
