import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationMessage(state, action) {
      return { ...state, payload: action.payload };
    },

    clearNotificationMessage(state, action) {
      return { ...state, payload: action.payload };
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

export const clearNotification = (message = initialState) => {
  return async (dispatch) => {
    dispatch(clearNotificationMessage(message));
  };
};
