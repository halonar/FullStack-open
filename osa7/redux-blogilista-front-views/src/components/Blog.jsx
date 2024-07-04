import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import { deleteBlog } from "../reducers/blogReducer";
import { incrementLikes } from "../reducers/blogReducer";
import { setInformation } from "../reducers/informationReducer";
import PropTypes from "prop-types";
import CommentForm from "./commentForm";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeBlog = async (event) => {
    event.preventDefault();
    if (window.confirm(`remove blog: ${blog.title}?`)) {
      try {
        dispatch(deleteBlog(blog.id, blog));
        dispatch(setInformation(`blog ${blog.title} removed`, 5));
      } catch (error) {
        console.log("update: ", error.response.data.error);
      } finally {
        navigate("/blogs", { replace: true });
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

  if (!blog || !user) {
    return null;
  }
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}
        <Button
          sx={{ marginLeft: 1 }}
          id="like-button"
          onClick={() => dispatch(incrementLikes(blog.id, blog))}
          variant="contained"
        >
          like
        </Button>
      </div>{" "}
      <div> {blog.user.name}</div>
      <div>
        <h4>comments</h4>
        <CommentForm blog={blog} />
        <List
          sx={{
            listStyleType: "disc",
            listStylePosition: "inside",
          }}
        >
          {blog.comments.map((comment) => (
            <ListItem
              key={comment}
              disablePadding
              sx={{
                paddingLeft: 3,
                listStyleType: "disc",
                display: "list-item",
              }}
            >
              {comment}
            </ListItem>
          ))}
        </List>
      </div>
      <div>
        {user.username === blog.user.username && (
          <Button id="remove-button" onClick={removeBlog} variant="contained">
            remove
          </Button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.object,
};

export default Blog;
