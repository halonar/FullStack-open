import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  useNotificationDispatch,
  useNotificationValue,
} from "../hooks/NotificationContext";
import {
  useInformationDispatch,
  useInformationValue,
} from "../hooks/InformationContext";
import restService from "../services/restService";
import PropTypes from "prop-types";

const CommentForm = ({ blog }) => {
  const queryClient = useQueryClient();
  const dispatchError = useNotificationDispatch();
  const dispatchInfo = useInformationDispatch();
  const [newComment, setNewComment] = useState("");
  const blogUrl = "/api/blogs";

  const showInfo = (message) => {
    dispatchInfo({
      payload: `${message}`,
    });
  };

  const showError = (message) => {
    dispatchError({
      payload: `${message}`,
    });
  };

  const clearInput = () => {
    setNewComment("");
  };

  const addCommentMutation = useMutation({
    mutationFn: restService.create,
    onError: (error) => {
      console.log("create failed: ", error);
      showError(error);
    },
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs", blogUrl]);
      if (blogs) {
        queryClient.setQueryData(
          ["blogs", blogUrl],
          blogs.map((blog) => (blog.id !== newBlog.id ? blog : newBlog))
        );
      } else {
        queryClient.setQueryData(["blogs", blogUrl], [newBlog]);
      }
      showInfo(`Added new comment in ${newBlog.title} by ${newBlog.author}`);
    },
  });

  const addCommentMutationX = useMutation({
    mutationFn: restService.create,
    onError: (error) => {
      console.log("create failed: ", error);
      showError(error);
    },
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs", blogUrl] });
      showInfo(`Added new comment in ${newBlog.title} by ${newBlog.author}`);
    },
  });

  const createComment = (event) => {
    event.preventDefault();
    const url = `${blogUrl}/${blog.id}/comments`;
    addCommentMutation.mutate({ url, data: { comments: [newComment] } });
    clearInput();
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
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
      <form onSubmit={createComment}>
        <div>
          <TextField
            id="newComment"
            label="add a new comment"
            autoComplete="newComment"
            value={newComment}
            onChange={handleCommentChange}
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

CommentForm.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default CommentForm;
