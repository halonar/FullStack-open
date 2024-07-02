import { useContext } from "react";
import { useNotificationValue } from "../NotificationContext";

//const Notification = ({ error }) => {
const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const message = useNotificationValue();

  //if (error === null) return null;
  if (message === null) return null;

  return <div style={style}>{message}</div>;
};

export default Notification;
