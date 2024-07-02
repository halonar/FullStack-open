import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "waiting for action.." };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationMessage(state, action) {
      return { ...state, message: action.payload };
    },

    clearNotificationMessage(state, action) {
      return { ...state, message: action.payload };
    },
  },
});

export const { setNotificationMessage, clearNotificationMessage } =
  notificationSlice.actions;
export default notificationSlice.reducer;

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setNotificationMessage(message));

    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};

export const clearNotification = (message = "waiting for more action..") => {
  return async (dispatch) => {
    dispatch(clearNotificationMessage(message));
  };
};
