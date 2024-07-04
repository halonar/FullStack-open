import { createContext, useReducer, useContext } from "react";

const informationReducer = (state, action) => {
  return action.payload;
};

const InformationContext = createContext();

export const InformationContextProvider = (props) => {
  const [information, informationDispatch] = useReducer(informationReducer, "");

  return (
    <InformationContext.Provider value={[information, informationDispatch]}>
      {props.children}
    </InformationContext.Provider>
  );
};

export const useInformationValue = () => {
  const informationAndDispatch = useContext(InformationContext);
  return informationAndDispatch[0];
};

export const useInformationDispatch = () => {
  const informationAndDispatch = useContext(InformationContext);
  const dispatch = informationAndDispatch[1];

  setTimeout(() => {
    dispatch({
      payload: "",
    });
  }, 10000);

  return informationAndDispatch[1];
};

export default InformationContext;
