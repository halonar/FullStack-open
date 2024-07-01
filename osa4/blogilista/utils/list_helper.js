let _ = require("lodash");
const blogLists = require("./blogLists");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;

  const total = blogs
    .map((blog) => blog.likes)
    .reduce((tot, likes) => tot + likes);

  //console.log("total likes=", total);
  return total;
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  const mostLikes = blogs
    .map((blog) => blog.likes)
    .reduce((m, l) => Math.max(m, l), -Infinity);

  const blogOfMostLikes = blogs.find(({ likes }) => likes === mostLikes);

  return blogOfMostLikes;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const authors = _.countBy(blogs, "author");
  //console.log("authors", authors);

  const max = _(authors).values().max();
  //console.log("max=", max);

  const maxAuthor = Object.keys(authors)[Object.values(authors).indexOf(max)];
  //console.log("author=", maxAuthor);

  const authorOfMostBlogs = { author: maxAuthor, blogs: max };
  //console.log("authorOfMostBlogs", authorOfMostBlogs);
  return authorOfMostBlogs;
};

//mostBlogs(blogLists.listWithNineBlogs);

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  const uniqAuthors = _.uniqBy(blogs, "author");
  //console.log("uniqAuthors=", uniqAuthors);

  const authorLikes = uniqAuthors.map((u) => {
    let tot = 0;
    _.sumBy(blogs, (b) => {
      if (u.author === b.author) {
        tot += b.likes;
        //console.log("a.author", u.author, "b.author", b.author, "tot=", tot);
        return tot;
      }
    });
    //console.log("tot=", tot);
    return { ...u, likes: tot };
  });

  //console.log("authorLikes=", authorLikes);

  const mostLikes = authorLikes
    .map((blog) => blog.likes)
    .reduce((m, l) => Math.max(m, l), -Infinity);

  const blogOfMostLikes = authorLikes.find(({ likes }) => likes === mostLikes);
  //console.log("blogOfMostLikes", blogOfMostLikes);

  const authorOfMostBlogs = {
    author: blogOfMostLikes.author,
    likes: blogOfMostLikes.likes,
  };

  //console.log("authorOfMostBlogs", authorOfMostBlogs);
  return authorOfMostBlogs;
};

//mostLikes(blogLists.listWithNineBlogs);

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
