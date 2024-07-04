import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch,
} from "react-router-dom";
import { Container } from "@mui/material";
import { setNotification } from "./reducers/notificationReducer";
import { setInformation } from "./reducers/informationReducer";
import Menu from "./components/Menu";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import UserList from "./components/UserList";
import User from "./components/User";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import About from "./components/About";
import Notification from "./components/Notification";
import Information from "./components/Information";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import {
  initializeUser,
  loginUser,
  logoutUser,
} from "./reducers/authenticationReducer";
import { initializeUsers } from "./reducers/userReducer";
import useFetch from "./hooks/useFetch";

const App = () => {
  const dispatch = useDispatch();
  const loginError = "wrong username or password";

  const baseUrl = "/api/blogs";
  //const { error } = useFetch(baseUrl);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.authentication);
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const blogMatch = useMatch("/blogs/:id");
  const userMatch = useMatch("/users/:id");

  const showInfo = (message) => {
    dispatch(setInformation(`${message}`, 5));
  };

  const showError = (message) => {
    dispatch(setNotification(`${message}`, 5));
  };

  const handleLogin = async ({ username, password }) => {
    try {
      dispatch(loginUser(username, password));
      showInfo(`Welcome ${username}`);
      navigate("/blogs", { replace: true });
    } catch (exception) {
      console.log("login: ", exception.response.data.error);
      showError(loginError);
    }
  };

  const handleLogout = () => {
    showInfo(`User ${user.username} logged out`);
    dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  const addBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject));
    } catch (error) {
      console.log("create: ", error.response.data.error);
    }
  };

  if (blogs.length === 0 || !users.length === 0) {
    return null;
  }

  const matchedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  const matchedUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  return (
    <Container>
      <div>
        <Notification />
        <Information />
        <Menu user={user} handleLogout={handleLogout} />
        {/* {!user && <LoginForm handleLogin={handleLogin} />} */}
        <Routes>
          <Route
            path="/blogs/:id"
            element={<Blog blog={matchedBlog} user={user} />}
          />
          <Route path="/blogs" element={<BlogList blogs={blogs} />} />
          <Route path="/blogform" element={<BlogForm addBlog={addBlog} />} />
          <Route path="/users/:id" element={<User user={matchedUser} />} />
          <Route path="/users" element={<UserList users={users} />} />
          <Route
            path="/login"
            element={<LoginForm handleLogin={handleLogin} />}
          />
          <Route
            path="/logout"
            element={<Logout handleLogout={handleLogout} user={user} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <br></br>
        <br></br>
        {/* <Footer /> */}
      </div>
    </Container>
  );
};

export default App;
