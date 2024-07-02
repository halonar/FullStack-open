import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  return action.payload;
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    "no messages!"
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  const dispatch = notificationAndDispatch[1];

  setTimeout(() => {
    dispatch({
      payload: "",
    });
  }, 5000);

  return notificationAndDispatch[1];
};

export default NotificationContext;
