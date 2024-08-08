import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setError, setToken, setPage }) => {
  const [username, setUsername] = useState("mluukkai");
  const [password, setPassword] = useState("secret");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data, setToken]);

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
    setPage("authors");
  };

  if (!show) {
    return;
  }

  return (
    <div>
      <h2>please, login</h2>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  show: PropTypes.bool,
  setError: PropTypes.func,
  setToken: PropTypes.func,
  setPage: PropTypes.func,
};

export default LoginForm;
