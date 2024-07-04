import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { setInformation } from "./reducers/informationReducer";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import Information from "./components/Information";
import Togglable from "./components/Togglable";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import {
  initializeUser,
  loginUser,
  logoutUser,
} from "./reducers/authenticationReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const loginError = "wrong username or password";

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const user = useSelector((state) => state.authentication);

  const showInfo = (message) => {
    dispatch(setInformation(`${message}`, 5));
  };

  const showError = (message) => {
    dispatch(setNotification(`${message}`, 5));
  };

  const handleLogin = async ({ username, password }) => {
    try {
      dispatch(loginUser(username, password));
    } catch (exception) {
      console.log("login: ", exception.response.data.error);
      showError(loginError);
    }
  };

  const handleLogout = () => {
    showInfo(`User ${user.username} logged out`);
    dispatch(logoutUser());
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog(blogObject));
    } catch (error) {
      console.log("create: ", error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      {/* <h2>Blogs app, Department of Computer Science, University of Helsinki 2024</h2> */}
      <Notification />
      <Information />

      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <Logout handleLogout={handleLogout} />
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <h2>Blog list</h2>
          <BlogList user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
