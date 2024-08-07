import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS, {
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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Books.propTypes = {
  show: PropTypes.bool,
};

export default Books;
