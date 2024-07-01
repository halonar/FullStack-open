const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const logger = require("../utils/logger");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const bcryptjs = require("bcryptjs");
//const bcrypt = require("bcrypt");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

/** if no mongoose used
beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});
 */

//---------------- test blog operations ------------------------------
describe("getting blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are four blogs", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("the response is an existing blog title", async () => {
    const response = await api.get("/api/blogs");

    const contents = response.body.map((blog) => blog.title);
    //logger.info("blog contents=", contents);
    assert(contents.includes("First class tests"));
  });

  test("a specific blog can be viewed", async () => {
    const blogsAtStart = await helper.blogsInDb();
    //logger.info("blogsAtStart=", blogsAtStart);

    const blogToView = blogsAtStart[0];
    //logger.info("blogToView=", `/api/blogs/${blogToView.id}`);

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    assert.deepStrictEqual(resultBlog.body, blogToView);

    //logger.info("resultBlog.body=", resultBlog.body);

    if ("id" in blogToView) logger.info("the id key exists on the object");
    assert(resultBlog.body, "id" in blogToView);
  });
});

describe("adding and updating a new blog", () => {
  let bearerToken = null;

  beforeEach(async () => {
    await User.deleteMany({});

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "secret-2",
    };

    await api.post("/api/users").send(newUser).expect(201);
    const user = await api.post("/api/login").send(newUser).expect(200);

    bearerToken = `Bearer ${user._body.token}`;
    logger.info("bearerToken=", bearerToken);
  });

  test("a new blog can be added", async () => {
    const newBlog = {
      title: "Solid principles",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 15,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", bearerToken)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const title = response.body.map((blog) => blog.title);

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
    assert(title.includes("Solid principles"));
  });

  test("if a new blog is added without likes value, it will be set to zero", async () => {
    const newBlog = {
      title: "Solid principles",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      //likes: 15
    };

    await api
      .post("/api/blogs")
      .set("Authorization", bearerToken)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);

    const title = response.body.map((blog) => blog.title);
    assert(title.includes("Solid principles"));

    const zeroLikes = response.body.find(
      (blog) => blog.likes === 0 && blog.title.includes("Solid principles")
    ).likes;
    assert.equal(zeroLikes, 0);
  });

  test("if a new blog is added without title or url fields, http error 400 is returned", async () => {
    const newBlog = {
      //title: "Solid principles",
      author: "Robert C. Martin",
      //url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 15,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", bearerToken)
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("a new blog can't be added without a token", async () => {
    const newBlog = {
      title: "Test Driven Development",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 11,
    };

    await api
      .post("/api/blogs")
      //.set("Authorization", bearerToken)
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("a new blog can't be added without valid user id", async () => {
    const badBearerToken =
      "Bearer XXXXXXeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI2NjdhZDBhMTcyYzQ1YzdiNmNmZWVlNDciLCJpYXQiOjE3MTkzMjQ4MzN9.nWGjiu7IYaSN-_w1ulRHJ4zXTW60DCDRA5ynM";
    const newBlog = {
      title: "Test Driven Development",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 11,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", badBearerToken)
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("a blog can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = { ...blogsAtStart[0], likes: 77 };
    //logger.info("blogToUpdate=", blogToUpdate);

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", bearerToken)
      .send(blogToUpdate)
      .expect(200);
    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    //logger.info("blogsAtEnd[0].likes=", blogsAtEnd[0].likes);
    assert.equal(blogsAtEnd[0].likes, 77);
  });
});

describe("deletion of a blog", () => {
  let bearerToken = null;
  let bearerTokenTwo = null;

  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "secret-2",
    };

    await api.post("/api/users").send(newUser).expect(201);
    const user = await api.post("/api/login").send(newUser).expect(200);

    bearerToken = `Bearer ${user._body.token}`;
    logger.info("bearerToken=", bearerToken);

    const newBlog = {
      title: "Solid principles",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 15,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", bearerToken)
      .send(newBlog)
      .expect(201);

    const newUserTwo = {
      username: "hellas",
      name: "Arto Hellas",
      password: "secret-2",
    };

    await api.post("/api/users").send(newUserTwo).expect(201);
    const userTwo = await api.post("/api/login").send(newUserTwo).expect(200);

    bearerTokenTwo = `Bearer ${userTwo._body.token}`;
    logger.info("bearerTokenTwo=", bearerTokenTwo);
  });

  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    logger.info("blogToDelete=", blogToDelete);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", bearerToken)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    //assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
    assert.strictEqual(blogsAtEnd.length, 0);
    const title = blogsAtEnd.map((r) => r.title);
    assert(!title.includes(blogToDelete.title));
  });

  test("a blog can be deleted only by a user who created it", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    logger.info("blogToDelete=", blogToDelete);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", bearerTokenTwo)
      .expect(401);
  });
});

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcryptjs.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "secret-2",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with a too short username", async () => {
    const newUser = {
      username: "bo",
      name: "Bo Kaspers",
      password: "secret",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("creation fails with too short password", async () => {
    const newUser = {
      username: "bob",
      name: "Bob Kaspers",
      password: "se",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });

  test("creation fails with missing password", async () => {
    const newUser = {
      username: "bob",
      name: "Bob Kaspers",
      //password: "secret",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
