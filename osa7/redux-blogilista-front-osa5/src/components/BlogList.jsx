import { useSelector } from "react-redux";
import Blog from "./Blog";
import PropTypes from "prop-types";

const BlogList = ({ user }) => {
  const blogsState = useSelector((state) => state.blogs);
  const blogs = blogsState.slice();
  blogs.sort((a, b) => a.likes - b.likes).reverse();

  return (
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </ul>
  );
};

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
};

export default BlogList;
