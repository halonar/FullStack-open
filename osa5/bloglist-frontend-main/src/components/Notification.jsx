import PropTypes from "prop-types";

const Notification = ({ message }) => {
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

  if (message === null) {
    return null;
  }

  //return <div className="error">{message}</div>;
  return <div style={errorStyle}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
