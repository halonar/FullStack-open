import { useApolloClient } from "@apollo/client";
import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch,
} from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import BooksByGenre from "./components/BooksByGenre";
import NewBook from "./components/NewBook";
import Favorites from "./components/Favorites";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("booksByGenre")}>booksByGenre</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} setError={notify} token={token} />
      <Books show={page === "books"} genre={null} />
      <BooksByGenre show={page === "booksByGenre"} />
      <Favorites show={page === "recommend"} />
      <NewBook show={page === "add"} setError={notify} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
