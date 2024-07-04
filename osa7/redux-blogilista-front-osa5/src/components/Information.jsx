import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Information = () => {
  const information = useSelector((state) => state.information);

  const infoStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (
    information === null ||
    (typeof information === "string" && information.length === 0) ||
    (typeof information.payload === "string" &&
      information.payload.length === 0)
  ) {
    return null;
  }

  // return <div className="info">{message}</div>;
  return <div style={infoStyle}>{information.payload}</div>;
};

Information.propTypes = {
  message: PropTypes.string,
};

export default Information;
