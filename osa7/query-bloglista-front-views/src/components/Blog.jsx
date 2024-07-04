import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import restService from "../services/restService";
import PropTypes from "prop-types";
import CommentForm from "./commentForm";
import {
  useInformationDispatch,
  useInformationValue,
} from "../hooks/InformationContext";

const Blog = ({ blog, user }) => {
  const queryClient = useQueryClient();
  const dispatchInfo = useInformationDispatch();
  const navigate = useNavigate();
  const blogUrl = "/api/blogs";

  const showInfo = (message) => {
    dispatchInfo({
      payload: `${message}`,
    });
  };

  const updateBlogMutation = useMutation({
    mutationFn: restService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs", blogUrl] });
    },
  });

  const removeBlogMutation = useMutation({
    mutationFn: restService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs", blogUrl] });
    },
  });

  const incrementLikes = (id, blog) => {
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    updateBlogMutation.mutate({ url: blogUrl, id, data: changedBlog });
  };

  const removeBlog = async (event) => {
    event.preventDefault();
    if (window.confirm(`remove blog: ${blog.title}?`)) {
      try {
        removeBlogMutation.mutate({ url: blogUrl, id: blog.id });
        showInfo(`blog ${blog.title} removed`);
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
          onClick={() => incrementLikes(blog.id, blog)}
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
