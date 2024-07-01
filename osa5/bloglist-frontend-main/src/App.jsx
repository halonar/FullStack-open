import { useState, useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import Information from "./components/Information";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null);
  const loginError = "wrong username or password";

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const showInfo = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      console.log("login: ", exception.response.data.error);
      showError(loginError);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    showInfo(`User ${user.username} logged out`);
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      showInfo(`Added ${returnedBlog.title} by ${returnedBlog.author}`);
    } catch (error) {
      console.log("create: ", error.response.data.error);
      showError(`${error.response.data.error}`);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      {/* <h2>Blogs app, Department of Computer Science, University of Helsinki 2024</h2> */}
      <Notification message={errorMessage} />
      <Information message={successMessage} />

      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <Logout handleLogout={handleLogout} />
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <h2>Blog list</h2>
          <BlogList blogs={blogs} setBlogs={setBlogs} user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
