import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const informationSlice = createSlice({
  name: "information",
  initialState,
  reducers: {
    setInformationMessage(state, action) {
      return { ...state, payload: action.payload };
    },

    clearInformationMessage(state, action) {
      return { ...state, payload: action.payload };
    },
  },
});

export const { setInformationMessage, clearInformationMessage } =
  informationSlice.actions;
export default informationSlice.reducer;

export const setInformation = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setInformationMessage(message));

    setTimeout(() => {
      dispatch(clearInformation());
    }, timeout * 1000);
  };
};

export const clearInformation = (message = initialState) => {
  return async (dispatch) => {
    dispatch(clearInformationMessage(message));
  };
};
