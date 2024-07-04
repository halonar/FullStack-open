import { createContext, useReducer, useContext } from "react";

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET": {
      return action.payload;
    }
    case "REMOVE": {
      return null;
    }
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [users, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[users, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[0];
};

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[1];
};

export default UserContext;
