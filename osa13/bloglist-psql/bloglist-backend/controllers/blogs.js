const router = require("express").Router();
const { Op } = require("sequelize");
const { sequelize } = require("../util/db");
const { Blog, User } = require("../models");
const {
  tokenExtractor,
  blogFinder,
  validateSession,
} = require("../util/middleware");

router.get("/", async (req, res) => {
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.iLike]: `%${req.query.search}%` } },
        { author: { [Op.iLike]: `%${req.query.search}%` } },
      ],
    };
  }

  const order = [["likes", "DESC"]];

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order,
  });

  blogs.map(
    (blog) =>
      console.log(`${blog.author} : '${blog.title}' ${blog.likes} likes`)
    // console.log(blog.author + ":", "'" + blog.title + "'" + ", " + blog.likes + " likes")
  );
  console.log(JSON.stringify(blogs, null, 2));

  res.json(blogs);
});

router.get("/authors", async (req, res) => {
  const order = [["likes", "DESC"]];

  const blogs = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: ["author"],
    //Setting raw to true ensures that we receive the raw,
    //plain JavaScript objects rather than Sequelize model instances.
    raw: true,
    order,
  });

  console.log(JSON.stringify(blogs, null, 2));

  res.json(blogs);
});

router.get("/:id", blogFinder, async (req, res) => {
  //const blog = await Blog.findByPk(req.params.id);

  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.post("/", tokenExtractor, validateSession, async (req, res, next) => {
  console.log("POST= ", req.body);

  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
    });

    //const user = await User.findOne();
    //const note = await Blog.create({ ...req.body, userId: user.id });
    res.json(blog);
  } catch (error) {
    console.log(error);
    next(error);
    //return res.status(400).json({ error });
  }
});

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    //const blog = await Blog.findByPk(req.params.id);

    if (req.blog) {
      req.blog.likes = req.body.likes;
      await req.blog.save();
      res.json(req.blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id",
  tokenExtractor,
  validateSession,
  async (req, res, next) => {
    console.log("DecodedToken= ", req.decodedToken);

    try {
      const blog = await Blog.findByPk(req.params.id, {
        include: {
          model: User,
          attributes: ["username"],
        },
      });

      if (blog) console.log("Blog= ", blog.toJSON());

      if (
        blog &&
        blog.toJSON().userId === req.decodedToken.id &&
        blog.toJSON().user.username === req.decodedToken.username
      ) {
        await blog.destroy();
        console.log(`deleted by user: ${req.decodedToken.username}`);
        res.status(204).end();
      } else {
        return res.status(401).json({
          error:
            "Access denied: user must be the same who created the blog or the blog does not exist",
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = router;
