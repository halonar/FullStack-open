import { createContext, useReducer, useContext } from "react";

const authenticationReducer = (state, action) => {
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

const AuthenticationContext = createContext();

export const AuthenticationContextProvider = (props) => {
  const [authentication, authenticationDispatch] = useReducer(
    authenticationReducer,
    null
  );

  return (
    <AuthenticationContext.Provider
      value={[authentication, authenticationDispatch]}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationValue = () => {
  const authenticationAndDispatch = useContext(AuthenticationContext);
  return authenticationAndDispatch[0];
};

export const useAuthenticationDispatch = () => {
  const authenticationAndDispatch = useContext(AuthenticationContext);
  return authenticationAndDispatch[1];
};

export default AuthenticationContext;
