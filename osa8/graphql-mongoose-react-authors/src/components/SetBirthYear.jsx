import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SET_BIRTH_YEAR, ALL_AUTHORS } from "../queries";

const SetBirthYear = (props) => {
  const [name, setName] = useState("");
  const [newBirthYear, setNewBirthYear] = useState("");
  // const [setBirthYear] = useMutation(SET_BIRTH_YEAR, {
  //   refetchQueries: [{ query: ALL_AUTHORS }],
  // });

  const [setBirthYear] = useMutation(SET_BIRTH_YEAR, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      props.setError(messages);
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
    // update: (cache, response) => {
    //   cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
    //     return {
    //       allAuthors: allAuthors.concat(response.data.allAuthors),
    //     };
    //   });
    // },
  });

  const submit = async (event) => {
    event.preventDefault();
    console.log("set birth year...");
    let wasBorn = parseInt(newBirthYear, 10);

    setBirthYear({
      variables: { name, setBornTo: wasBorn },
    })
      .then((data) => {
        console.log("Birth year changed successfully", data);
      })
      .catch((error) => {
        console.error("Error changing birth year", error);
      });

    setName("");
    setNewBirthYear("");
  };

  if (!props.show) {
    return;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {props.authors.map((author, index) => (
            <option key={index}>{author.name}</option>
          ))}
        </select>
        <div>
          born
          <input
            value={newBirthYear}
            onChange={({ target }) => setNewBirthYear(target.value)}
          />
        </div>
        <button style={{ marginTop: 10 }} type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

SetBirthYear.propTypes = {
  show: PropTypes.bool,
  authors: PropTypes.array,
  setError: PropTypes.func,
};

export default SetBirthYear;
