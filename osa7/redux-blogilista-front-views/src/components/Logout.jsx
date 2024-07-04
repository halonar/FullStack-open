import PropTypes from "prop-types";

const Logout = ({ handleLogout, user }) => (
  <button id="logout-button" type="submit" onClick={() => handleLogout()}>
    Logout
  </button>
);

Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Logout;
