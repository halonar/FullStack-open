import { NavLink, useNavigate } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Logout from "./Logout";

const Menu = ({ user, handleLogout }) => {
  const activeStyle = {
    paddingRight: 5,
    color: "purple",
  };

  const navigate = useNavigate();
  const handleLogin = () => navigate("/login", { replace: true });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blogs Application
          </Typography>
          <Button color="inherit" component={NavLink} to="/blogs">
            blogs
          </Button>
          <Button color="inherit" component={NavLink} to="/users">
            users
          </Button>
          <Button color="inherit" component={NavLink} to="/about">
            about
          </Button>
          {user ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
              <p>{user.name} logged in</p>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleLogin}>
                login
              </Button>
              <p>please, login to see blogs and users</p>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Menu;
