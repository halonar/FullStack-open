import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";
import { setInformation } from "./informationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },

    updateBlog(state, action) {
      const id = action.payload.id;
      return state.map((blog) => (blog.id !== id ? blog : action.payload));
    },

    removeBlog(state, action) {
      const id = action.payload.id;
      return state.filter((blog) => blog.id !== id);
    },

    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, updateBlog, removeBlog, setBlogs } =
  blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);
      dispatch(appendBlog(newBlog));
      dispatch(
        setInformation(`Added ${newBlog.title} by ${newBlog.author}`, 5)
      );
    } catch (error) {
      dispatch(setNotification(`adding ${content.title} failed`, 5));
    }
  };
};

export const incrementLikes = (id, blog) => {
  const changedBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id,
  };

  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, changedBlog);
    dispatch(updateBlog(updatedBlog));
  };
};

export const deleteBlog = (id, blog) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(blog));
  };
};
