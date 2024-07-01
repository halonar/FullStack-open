import PropTypes from "prop-types";

const Information = ({ message }) => {
  const infoStyle = {
    color: "green",
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

  // return <div className="info">{message}</div>;
  return <div style={infoStyle}>{message}</div>;
};

Information.propTypes = {
  message: PropTypes.string,
};

export default Information;
