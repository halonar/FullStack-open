import { createContext, useReducer, useContext } from "react";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "APPEND": {
      state.push(action.payload);
      break;
    }
    case "UPDATE": {
      const id = action.payload.id;
      return state.map((blog) => (blog.id !== id ? blog : action.payload));
    }
    case "REMOVE": {
      const id = action.payload.id;
      return state.filter((blog) => blog.id !== id);
    }
    case "SET": {
      return action.payload;
    }
    default:
      return state;
  }
};

const BlogContext = createContext();

export const BlogContextProvider = (props) => {
  const [blogs, blogDispatch] = useReducer(blogReducer, null);

  return (
    <BlogContext.Provider value={[blogs, blogDispatch]}>
      {props.children}
    </BlogContext.Provider>
  );
};

export const useBlogValue = () => {
  const blogAndDispatch = useContext(BlogContext);
  return blogAndDispatch[0];
};

export const useBlogDispatch = () => {
  const blogAndDispatch = useContext(BlogContext);
  return blogAndDispatch[1];
};

export default BlogContext;
