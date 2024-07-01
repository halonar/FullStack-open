const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");
const { userExtractor } = require("../utils/middleware");
const User = require("../models/user");

// eslint-disable-next-line no-unused-vars
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

//blogsRouter.get("/", userExtractor, async (request, response, next) => {
blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/:id/comments", userExtractor, async (request, response) => {
  const { comments } = request.body;
  const blog = await Blog.findById(request.params.id);

  const comment = comments[0];
  blog.comments = blog.comments.concat(comment);

  const savedBlog = await blog.save().then((u) =>
    u.populate("user", {
      username: 1,
      name: 1,
      id: 1,
    })
  );

  if (savedBlog) {
    logger.info("updated=", savedBlog);
    response.json(savedBlog);
  } else {
    response.status(404).end();
  }
});

//blogsRouter.post("/", async (request, response, next) => {
blogsRouter.post("/", userExtractor, async (request, response, next) => {
  console.log("request.body: ", request.body);
  const { title, author, url, likes } = request.body;

  try {
    const user = await User.findById(request.user.id);

    if (
      !user ||
      user._id.toString() !== request.user.id ||
      user.username !== request.user.username
    ) {
      return response.status(401).json({
        error: "Access denied: valid user not found",
      });
    }

    const newLikes = likes === undefined ? 0 : likes;
    const blog = new Blog({
      title,
      author,
      url,
      likes: newLikes,
      user: user._id,
      comments: [],
    });

    const savedBlog = await blog.save().then((u) =>
      u.populate("user", {
        username: 1,
        name: 1,
        id: 1,
      })
    );

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    logger.error("adding new blog failed: ", error);
    next(error);
  }
});

blogsRouter.put("/:id", userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" }
  ).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  if (updatedBlog !== null) {
    logger.info("updated=", updatedBlog);
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user");

  if (
    blog &&
    blog.user &&
    blog.user._id.toString() === request.user.id &&
    blog.user.username === request.user.username
  ) {
    const result = await Blog.findByIdAndDelete(request.params.id);
    logger.info(result);
    logger.info("deleted by user: ", request.user.id);
    response.status(204).end();
  } else {
    return response.status(401).json({
      error: "Access denied: user must be the same who created the blog",
    });
  }
});

module.exports = blogsRouter;
