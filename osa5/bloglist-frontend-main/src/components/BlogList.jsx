import Blog from "./Blog";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const BlogList = ({ blogs, setBlogs, user }) => {
  blogs.sort((a, b) => a.likes - b.likes).reverse();

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      setBlogs(updatedBlogs);
    } catch (error) {
      console.log("update: ", error.response.data.error);
    }
  };

  const incrementLikes = (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    updateBlog(blog.id, updatedBlog);
  };

  return (
    <ul>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          incrementLikes={incrementLikes}
        />
      ))}
    </ul>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default BlogList;
