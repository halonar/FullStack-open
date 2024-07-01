const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const blogLists = require("../utils/blogLists");

//---------------- dummy ------------------------------
test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

//---------------- total likes ------------------------------
describe("total likes", () => {
  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(blogLists.listWithOneBlog);
    assert.strictEqual(result, 7);
  });

  test("when list has nine blogs equals the total likes", () => {
    const result = listHelper.totalLikes(blogLists.listWithNineBlogs);
    assert.strictEqual(result, 70);
  });

  test("when list has one blog equals zero likes", () => {
    const result = listHelper.totalLikes(
      blogLists.listWithOneWithZeroLikesBlog
    );
    assert.strictEqual(result, 0);
  });

  test("when list has zero blogs", () => {
    const result = listHelper.totalLikes(blogLists.listWithZeroBlogs);
    assert.strictEqual(result, 0);
  });
});

//---------------- favourite blog ------------------------------
describe("favourite blog", () => {
  test("when list has only one blog equals the most likes of that", () => {
    const result = listHelper.favouriteBlog(blogLists.listWithOneBlog);
    assert.strictEqual(
      JSON.stringify(result),
      JSON.stringify(blogLists.listWithOneBlog[0])
    );
  });

  test("when list has nine blogs equals the most likes of that", () => {
    const result = listHelper.favouriteBlog(blogLists.listWithNineBlogs);
    assert.strictEqual(
      JSON.stringify(result),
      JSON.stringify(blogLists.listWithNineBlogs[4])
    );
  });

  test("when list has one blog equals zero likes", () => {
    const result = listHelper.favouriteBlog(
      blogLists.listWithOneWithZeroLikesBlog
    );
    assert.strictEqual(
      JSON.stringify(result),
      JSON.stringify(blogLists.listWithOneWithZeroLikesBlog[0])
    );
  });

  test("when list has zero blogs", () => {
    const result = listHelper.favouriteBlog(blogLists.listWithZeroBlogs);
    assert.strictEqual(JSON.stringify(result), JSON.stringify({}));
  });
});

//---------------- most blogs ------------------------------
describe("most blogs", () => {
  test("when list has nine blogs equals the author of most blogs of that", () => {
    const result = listHelper.mostBlogs(blogLists.listWithNineBlogs);
    assert.strictEqual(
      JSON.stringify(result),
      JSON.stringify({ author: "Edsger W. Dijkstra", blogs: 4 })
    );
  });

  test("when list has one blog", () => {
    const result = listHelper.mostBlogs(blogLists.listWithOneBlog);
    assert.strictEqual(
      JSON.stringify(result),
      JSON.stringify({ author: "Michael Chan", blogs: 1 })
    );
  });

  test("when list has zero blogs", () => {
    const result = listHelper.mostBlogs(blogLists.listWithZeroBlogs);
    assert.strictEqual(JSON.stringify(result), JSON.stringify({}));
  });
});

//---------------- most likes ------------------------------
describe("most likes", () => {
  test("when list has nine blogs equals the author of most likes of that", () => {
    const result = listHelper.mostLikes(blogLists.listWithNineBlogs);
    assert.strictEqual(
      JSON.stringify(result),
      JSON.stringify({ author: "Edsger W. Dijkstra", likes: 43 })
    );
  });

  test("when list has one blog with zero likes", () => {
    const result = listHelper.mostLikes(blogLists.listWithOneWithZeroLikesBlog);
    assert.strictEqual(
      JSON.stringify(result),
      JSON.stringify({ author: "Michael Chan", likes: 0 })
    );
  });

  test("when list has one blog", () => {
    const result = listHelper.mostLikes(blogLists.listWithOneBlog);
    assert.strictEqual(
      JSON.stringify(result),
      JSON.stringify({ author: "Michael Chan", likes: 7 })
    );
  });

  test("when list has zero blogs", () => {
    const result = listHelper.mostLikes(blogLists.listWithZeroBlogs);
    assert.strictEqual(JSON.stringify(result), JSON.stringify({}));
  });
});
