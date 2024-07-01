import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

test("renders title and author", () => {
  const blogs = [];
  const setBlogs = () => {};

  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "John Doe",
  };

  render(<Blog blog={blog} blogs={blogs} setBlogs={setBlogs} user={{}} />);

  const element = screen.getByText(
    "Component testing is done with react-testing-library John Doe"
  );

  //screen.debug(element);
  expect(element).toBeDefined();
});

test("at start url, likes and user are not displayed", () => {
  const blogs = [];
  const setBlogs = () => {};

  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "John Doe",
    url: "jd.fi",
    likes: 10,
  };

  render(<Blog blog={blog} blogs={blogs} setBlogs={setBlogs} user={{}} />);

  const simpleView = screen.queryByText(
    "Component testing is done with react-testing-library John Doe jd.fi 10"
  );

  //screen.debug(simpleView);
  expect(simpleView).toBeNull();
});

test("after clicking the button, url, likes and user are displayed", async () => {
  const blogs = [];
  const setBlogs = () => {};

  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "John Doe",
    url: "jd.fi",
    likes: 10,
    user: {
      username: "mluukkai",
      name: "Matti Luukkainen",
      id: "65deed6cd4f977903d64ec1b",
    },
  };

  render(<Blog blog={blog} blogs={blogs} setBlogs={setBlogs} user={{}} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  // const fullView = screen.getByText(
  //   "Component testing is done with react-testing-library John Doe jd.fi 10 Matti Luukkainen"
  // );

  // screen.debug(fullView);

  const title = screen.getByText(
    "Component testing is done with react-testing-library John Doe"
  );
  expect(title);

  const url = screen.getByText("jd.fi");
  expect(url);

  const likes = screen.getByText("likes 10");
  expect(likes);

  const usr = screen.getByText("Matti Luukkainen");
  expect(usr);
});

test("when like-button is clicked twice, component's input props event handler function is called twice.", async () => {
  const user = userEvent.setup();

  const blogs = [];
  const setBlogs = vi.fn;
  const incrementLikes = vi.fn();

  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "John Doe",
    url: "jd.fi",
    likes: 10,
    user: {
      username: "mluukkai",
      name: "Matti Luukkainen",
      id: "65deed6cd4f977903d64ec1b",
    },
  };

  render(
    <Blog
      blog={blog}
      blogs={blogs}
      setBlogs={setBlogs}
      user={{}}
      incrementLikes={incrementLikes}
    />
  );

  const button1 = screen.getByText("view");
  await user.click(button1);

  const button2 = screen.getByText("like");
  await user.click(button2);
  await user.click(button2);
  expect(incrementLikes.mock.calls).toHaveLength(2);
  const fullView = screen.queryByText(
    "Component testing is done with react-testing-library John Doe jd.fi 12 Matti Luukkainen"
  );

  expect(fullView);
});

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const user = userEvent.setup();
  const createBlog = vi.fn();

  render(<BlogForm createBlog={createBlog} />);

  //const input = screen.getByRole("textbox");
  const inputTitle = screen.getByPlaceholderText("title");
  const inputAuthor = screen.getByPlaceholderText("author");
  const inputUrl = screen.getByPlaceholderText("url");
  const inputLikes = screen.getByPlaceholderText("likes");
  const sendButton = screen.getByText("save");

  await user.type(inputTitle, "testing a title");
  await user.type(inputAuthor, "testing an author");
  await user.type(inputUrl, "testing a url");
  await user.type(inputLikes, "testing likes");
  await user.click(sendButton);

  console.log(createBlog.mock.calls);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a title");
  expect(createBlog.mock.calls[0][0].author).toBe("testing an author");
  expect(createBlog.mock.calls[0][0].url).toBe("testing a url");
  expect(createBlog.mock.calls[0][0].likes).toBe("testing likes");
});
