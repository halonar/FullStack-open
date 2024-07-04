import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();

    handleLogin({
      username,
      password,
    });

    setUsername("");
    setPassword("");
  };

  return (
    <Box
      component="section"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        "& .MuiButtonBase-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="on"
    >
      <form onSubmit={login}>
        <div>
          <TextField
            style={{ marginTop: 40 }}
            id="username"
            label="username"
            autoComplete="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            size="small"
          />
        </div>
        <div>
          <TextField
            id="password"
            label="password"
            type="password"
            autoComplete="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            size="small"
          />
        </div>
        <div>
          <Button id="login-button" type="submit" variant="contained">
            submit
          </Button>
        </div>
      </form>
    </Box>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
