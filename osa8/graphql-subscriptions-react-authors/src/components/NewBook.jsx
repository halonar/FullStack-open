import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS, UNIQUE_GENRES } from "../queries";
import { updateCache } from "../updateCache.js";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      props.setError(messages);
    },
    update: (cache, response) => {
      updateCache(cache, response.data.addBook);
    },
    // refetchQueries: [
    //   { query: ALL_BOOKS },
    //   { query: ALL_AUTHORS },
    //   { query: UNIQUE_GENRES },
    // ],
    // awaitRefetchQueries: true,
  });

  const submit = async (event) => {
    event.preventDefault();
    console.log("add book...");
    let publishedYear = parseInt(published, 10);

    createBook({
      variables: { title, published: publishedYear, author, genres },
    })
      .then((data) => {
        console.log("Book created successfully", data);
      })
      .catch((error) => {
        console.error("Error creating book", error);
      });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  if (!props.show) {
    return;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

NewBook.propTypes = {
  show: PropTypes.bool,
  setError: PropTypes.func,
};

export default NewBook;
