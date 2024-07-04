import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const errorStyle = {
    //color: "red",
    color: "rgb(255, 0, 0)",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (
    notification === null ||
    (typeof notification === "string" && notification.length === 0) ||
    (typeof notification.payload === "string" &&
      notification.payload.length === 0)
  ) {
    return null;
  }

  //return <div style={errorStyle}>{notification.payload}</div>;
  return <Alert severity="error">{notification.payload}</Alert>;
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
