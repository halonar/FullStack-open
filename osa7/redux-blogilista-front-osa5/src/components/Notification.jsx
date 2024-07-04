import PropTypes from "prop-types";
import { useSelector } from "react-redux";

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

  return <div style={errorStyle}>{notification.payload}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
