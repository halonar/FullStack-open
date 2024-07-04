import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLikes, setNewLikes] = useState("");

  const clearInput = () => {
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    setNewLikes("");
  };

  const createBlog = (event) => {
    event.preventDefault();

    addBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    });

    clearInput();
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };
  const handleLikesChange = (event) => {
    setNewLikes(event.target.value);
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
      <h2>Add a new blog</h2>
      <form onSubmit={createBlog}>
        <div>
          <TextField
            id="newTitle"
            label="title"
            autoComplete="newTitle"
            value={newTitle}
            onChange={handleTitleChange}
            size="small"
          />
        </div>
        <div>
          <TextField
            id="newAuthor"
            label="author"
            autoComplete="newAuthor"
            value={newAuthor}
            onChange={handleAuthorChange}
            size="small"
          />
        </div>
        <div>
          <TextField
            id="newUrl"
            label="url"
            autoComplete="newUrl"
            value={newUrl}
            onChange={handleUrlChange}
            size="small"
          />
        </div>
        <div>
          <TextField
            id="newLikes"
            label="likes"
            autoComplete="newLikes"
            value={newLikes}
            onChange={handleLikesChange}
            size="small"
          />
        </div>
        <div>
          <Button type="submit" variant="contained">
            save
          </Button>
        </div>
      </form>
    </Box>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
