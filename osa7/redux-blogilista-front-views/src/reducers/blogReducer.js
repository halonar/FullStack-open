import { createSlice } from "@reduxjs/toolkit";
import restService from "../services/restService";
import { setNotification } from "./notificationReducer";
import { setInformation } from "./informationReducer";

const baseUrl = "/api/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      /** The createSlice function provided by Redux Toolkit includes immer under the hood,
       * which takes care of immutability for you.
       */
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

export const getAllBlogs = (blogs) => {
  return async (dispatch) => {
    dispatch(setBlogs(blogs));
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await restService.getAll(baseUrl);
      dispatch(setBlogs(blogs));
    } catch (error) {
      dispatch(setNotification(`blog init failed: ${error}`, 5));
    }
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await restService.create(baseUrl, content);
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
    const updatedBlog = await restService.update(baseUrl, id, changedBlog);
    dispatch(updateBlog(updatedBlog));
  };
};

export const addBlogComment = (id, comment) => {
  return async (dispatch) => {
    const url = `${baseUrl}/${id}/comments`;
    const savedBlog = await restService.create(url, { comments: [comment] });
    dispatch(updateBlog(savedBlog));
  };
};

export const deleteBlog = (id, blog) => {
  return async (dispatch) => {
    await restService.remove(baseUrl, id);
    dispatch(removeBlog(blog));
  };
};
