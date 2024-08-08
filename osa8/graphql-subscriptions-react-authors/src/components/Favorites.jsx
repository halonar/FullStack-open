import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../queries";
import Books from "./Books";

const Favorites = (props) => {
  const result = useQuery(CURRENT_USER, {
    skip: !props.show,
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return;
  }

  const me = result.data.me;

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{me.favoriteGenre}</b>
      <Books show={true} genre={me.favoriteGenre} />
    </div>
  );
};

Favorites.propTypes = {
  show: PropTypes.bool,
  favoriteGenre: PropTypes.string,
};

export default Favorites;
