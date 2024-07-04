import { useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addBlogComment } from "../reducers/blogReducer";
import PropTypes from "prop-types";

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");

  const clearInput = () => {
    setNewComment("");
  };

  const createComment = (event) => {
    event.preventDefault();
    dispatch(addBlogComment(blog.id, newComment));
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
