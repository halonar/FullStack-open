import { useParams, NavLink } from "react-router-dom";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItem";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const User = ({ user }) => {
  // const id = useParams().id;
  // const user = users.find((u) => u.id === id);

  const userStyle = {
    paddingLeft: 50,
    color: "purple",
  };

  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <List
        sx={{
          listStyleType: "disc",
          listStylePosition: "inside",
        }}
      >
        {user.blogs.map((blog) => (
          <ListItem
            key={blog.id}
            disablePadding
            sx={{
              paddingLeft: 3,
              listStyleType: "disc",
              display: "list-item",
            }}
          >
            `{blog.title}` by {blog.author}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object,
};

export default User;
