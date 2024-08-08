import PropTypes from "prop-types";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { UNIQUE_GENRES, ALL_BOOKS } from "../queries";

const BooksByGenre = ({ show }) => {
  const {
    loading: genresLoading,
    error: genresError,
    data: genresData,
  } = useQuery(UNIQUE_GENRES);

  const [selectedGenre, setSelectedGenre] = useState(null);

  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
  } = useQuery(ALL_BOOKS, {
    skip: !selectedGenre,
    variables: { genre: selectedGenre },
  });

  if (genresLoading || booksLoading) return <p>loading...</p>;
  if (genresError || booksError) return <p>error :</p>;

  if (!show) {
    return;
  }

  return (
    <div>
      <h2>books</h2>
      {selectedGenre ? (
        <p>
          in genre <b>{selectedGenre}</b>
        </p>
      ) : (
        <p>please, select a genre</p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData &&
            booksData.allBooks.map(({ title, published, author, id }) => (
              <tr key={id}>
                <td>{title}</td>
                <td>{author.name}</td>
                <td>{published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {genresData.genres.map((genre) => (
        <button key={genre} onClick={() => setSelectedGenre(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

BooksByGenre.propTypes = {
  show: PropTypes.bool,
};

export default BooksByGenre;
