import PropTypes from "prop-types";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import SetBirthYear from "./SetBirthYear";

const Authors = (props) => {
  const [page, setPage] = useState("authors");

  const result = useQuery(ALL_AUTHORS, {
    skip: !props.show,
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          style={{ marginTop: 20, marginBottom: 10 }}
          onClick={() => setPage("setBirthYear")}
        >
          set birth year
        </button>
        <SetBirthYear show={page === "setBirthYear"} authors={authors} />
      </div>
    </div>
  );
};

Authors.propTypes = {
  show: PropTypes.bool,
};

export default Authors;
