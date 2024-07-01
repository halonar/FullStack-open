import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, blogs, setBlogs, user, incrementLikes }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const removeBlog = async (event) => {
    event.preventDefault();
    if (window.confirm(`remove blog: ${blog.title}?`)) {
      try {
        await blogService.remove(blog.id);
        const updatedBlogs = blogs.filter((b) => b.id !== blog.id);
        setBlogs(updatedBlogs);
        updatedBlogs;
      } catch (error) {
        console.log("update: ", error.response.data.error);
      }
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {!visible && (
        <div className="blog">
          {" "}
          {blog.title} {blog.author}{" "}
          <button name="view" id="view-button" onClick={toggleVisibility}>
            view
          </button>
        </div>
      )}
      {visible && (
        <>
          <div>
            {blog.title} {blog.author}
            <button id="hide-button" onClick={toggleVisibility}>
              hide
            </button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button id="like-button" onClick={() => incrementLikes(blog)}>
              like
            </button>
          </div>
          <div> {blog.user.name}</div>
          <div>
            {user.username === blog.user.username && (
              <button id="remove-button" onClick={removeBlog}>
                remove
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
