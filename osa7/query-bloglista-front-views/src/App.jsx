import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch,
} from "react-router-dom";
import { Container } from "@mui/material";
import Menu from "./components/Menu";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import UserList from "./components/UserList";
import User from "./components/User";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import About from "./components/About";
import {
  useNotificationDispatch,
  useNotificationValue,
} from "./hooks/NotificationContext";
import {
  useInformationDispatch,
  useInformationValue,
} from "./hooks/InformationContext";

import {
  useAuthenticationDispatch,
  useAuthenticationValue,
} from "./hooks/AuthenticationContext";
import { useUserDispatch, useUserValue } from "./hooks/UserContext";
import Notification from "./components/Notification";
import Information from "./components/Information";
import restService from "./services/restService";
import loginService from "./services/login";

const App = () => {
  const queryClient = useQueryClient();
  const dispatchError = useNotificationDispatch();
  const dispatchInfo = useInformationDispatch();
  const dispatchUser = useAuthenticationDispatch();
  const dispatchUsers = useUserDispatch();
  const user = useAuthenticationValue();

  const loginError = "wrong username or password";
  const blogUrl = "/api/blogs";
  const userUrl = "/api/users";

  const navigate = useNavigate();
  const blogMatch = useMatch("/blogs/:id");
  const userMatch = useMatch("/users/:id");

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

  //useMutation------------------------------------------------------------

  const authenticationMutation = useMutation({
    mutationFn: loginService.login,
    onError: (error) => {
      console.log("login failed: ", error);
      showError(error);
    },
    onSuccess: (loginUser) => {
      const user = queryClient.getQueryData({ mutationKey: ["user"] });
      queryClient.setQueryData({ mutationKey: ["user"] }, loginUser);

      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(loginUser)
      );
      restService.setToken(loginUser.token);
      dispatchUser({ type: "SET", payload: loginUser });
    },
  });

  const addUserMutation = useMutation({
    mutationFn: restService.create,
    onSuccess: (newUser) => {
      const users = queryClient.getQueryData({ mutationKey: ["users"] });
      queryClient.setQueryData(
        { mutationKey: ["users"] },
        users.concat(newUser)
      );
    },
  });

  const addBlogMutation = useMutation({
    mutationFn: restService.create,
    onError: (error) => {
      console.log("create failed: ", error);
      showError(error);
    },
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs", blogUrl]);
      if (blogs) {
        queryClient.setQueryData(["blogs", blogUrl], blogs.concat(newBlog));
      } else {
        queryClient.setQueryData(["blogs", blogUrl], [newBlog]);
      }
      showInfo(`Added ${newBlog.title} by ${newBlog.author}`, 5);
    },
  });

  const addBlogMutationX = useMutation({
    mutationFn: ({ newContent }) => restService.create(blogUrl, newContent),
    onError: (error) => {
      console.log("create failed: ", error);
    },
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData({ queryKey: ["blogs", blogUrl] });
      queryClient.setQueryData(
        { queryKey: ["blogs", blogUrl] },
        blogs.concat(newBlog)
      );
    },
  });

  const handleLogin = async ({ username, password }) => {
    try {
      authenticationMutation.mutate({ username, password });
      showInfo(`Welcome ${username}`);
      navigate("/blogs", { replace: true });
    } catch (exception) {
      console.log("login: ", exception.response.data.error);
      showError(loginError);
    }
  };

  const handleLogout = () => {
    showInfo(`User ${user.username} logged out`);
    window.localStorage.removeItem("loggedBlogappUser");
    dispatchUser({ type: "REMOVE" });
    navigate("/login", { replace: true });
  };

  const initializeUser = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      restService.setToken(user.token);
      dispatchUser({ type: "SET", payload: user });
      return user;
    }
  };

  const addBlog = async (blogObject) => {
    try {
      addBlogMutation.mutate({ url: blogUrl, data: blogObject });
    } catch (error) {
      console.log("create: ", error.response.data.error);
    }
  };

  //useQuery------------------------------------------------------------

  const userResult = useQuery({
    queryKey: ["user"],
    queryFn: initializeUser,
    refetchOnWindowFocus: false,
  });

  //console.log(JSON.parse(JSON.stringify(userResult)));

  const usersResult = useQuery({
    queryKey: ["users", userUrl],
    queryFn: restService.getAll,
    refetchOnWindowFocus: false,
  });

  //console.log(JSON.parse(JSON.stringify(usersResult)));

  const blogResult = useQuery({
    queryKey: ["blogs", blogUrl],
    queryFn: restService.getAll,
    refetchOnWindowFocus: false,
  });

  //console.log(JSON.parse(JSON.stringify(blogResult)));

  if (blogResult.isLoading || usersResult.isLoading) {
    return <div>loading data...</div>;
  }

  const users = usersResult.data;
  const blogs = blogResult.data;

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
