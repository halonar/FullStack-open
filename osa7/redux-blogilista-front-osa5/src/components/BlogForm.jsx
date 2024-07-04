import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
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

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
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
    <>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            value={newTitle}
            onChange={handleTitleChange}
            placeholder="title"
            data-testid="title"
          />
        </div>
        <div>
          author:{" "}
          <input
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder="author"
            data-testid="author"
          />
        </div>
        <div>
          url:{" "}
          <input
            value={newUrl}
            onChange={handleUrlChange}
            placeholder="url"
            data-testid="url"
          />
        </div>
        <div>
          likes:{" "}
          <input
            value={newLikes}
            onChange={handleLikesChange}
            placeholder="likes"
            data-testid="likes"
          />
        </div>
        <div>
          <button type="submit">save</button>
        </div>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
