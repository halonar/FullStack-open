import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: props.genre },
    skip: !props.show,
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Books.propTypes = {
  show: PropTypes.bool,
  genre: PropTypes.string,
};

export default Books;
