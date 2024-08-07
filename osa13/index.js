require("dotenv").config();
const { Sequelize, Model, QueryTypes, DataTypes } = require("sequelize");
const express = require("express");
const app = express();
app.use(express.json());

console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}

Blog.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.TEXT, allowNull: true },
    url: { type: DataTypes.TEXT, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { sequelize, underscored: true, timestamps: false, modelName: "blog" }
);

Blog.sync();

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  blogs.map((blog) =>
    console.log(
      blog.author + ":",
      "'" + blog.title + "'" + ", " + blog.likes + " likes"
    )
  );
  console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  console.log("POST= ", req.body);

  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

app.put("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    blog.likes = req.body.likes;
    await blog.save();
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    await blog.destroy();
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/** 
const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const blogs = await sequelize.query("SELECT * FROM blogs", {
      type: QueryTypes.SELECT,
    });

    console.log(blogs);
    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
*/
