import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useAuthenticationDispatch,
  useAuthenticationValue,
} from "../hooks/AuthenticationContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const BlogList = ({ blogs }) => {
  const user = useAuthenticationValue();

  if (!user) {
    return null;
  }

  const blogList = blogs.slice();
  blogList.sort((a, b) => a.likes - b.likes).reverse();

  return (
    <>
      <NavLink to="/blogform">
        <Button sx={{ marginTop: 6 }} variant="contained">
          create new blog
        </Button>
      </NavLink>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogList.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <NavLink to={`/blogs/${blog.id}`}>{blog.title}</NavLink>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default BlogList;
