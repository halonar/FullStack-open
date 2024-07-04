import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../reducers/blogReducer";
import { incrementLikes } from "../reducers/blogReducer";
import { setInformation } from "../reducers/informationReducer";

import PropTypes from "prop-types";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const removeBlog = async (event) => {
    event.preventDefault();
    if (window.confirm(`remove blog: ${blog.title}?`)) {
      try {
        dispatch(deleteBlog(blog.id, blog));
        dispatch(setInformation(`blogg ${blog.title} removed`, 5));
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
        <div>
          {" "}
          {blog.title} {blog.author}{" "}
          <button id="view-button" onClick={toggleVisibility}>
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
            <button
              id="like-button"
              onClick={() => dispatch(incrementLikes(blog.id, blog))}
            >
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
  user: PropTypes.object.isRequired,
};

export default Blog;
