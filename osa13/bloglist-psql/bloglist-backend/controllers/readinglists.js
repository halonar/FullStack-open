const router = require("express").Router();
const { tokenExtractor, validateSession } = require("../util/middleware");
const { User, Blog, ReadingList } = require("../models");

router.get("/", async (req, res) => {
  const readingList = await ReadingList.findAll();

  //   const users = await ReadingList.findAll({
  //     include: {
  //       model: User,
  //       attributes: { exclude: ["userId"] },
  //     },
  //   });
  res.json(readingList);
});

router.post("/", async (req, res) => {
  console.log("POST: ReadingList", req.body);

  try {
    const { blogId, userId } = req.body;
    const readingList = await ReadingList.create({ blogId, userId });
    res.json(readingList);
  } catch (error) {
    console.log("POST: ReadingList", error);
    return res.status(400).json({ error });
  }
});

router.put("/:id", tokenExtractor, validateSession, async (req, res, next) => {
  console.log("PUT: ReadingList", req.body);

  try {
    const { read } = req.body;
    const readingList = await ReadingList.findByPk(req.params.id);

    if (readingList) console.log("ReadingListJson= ", readingList.toJSON());
    console.log("req.decodedToken.id= ", req.decodedToken.id);

    if (readingList && readingList.toJSON().userId === req.decodedToken.id) {
      readingList.read = read;
      await readingList.save();
      res.json(readingList);
    } else {
      return res.status(401).json({
        error:
          "Access denied: user must be the same who created the reading list",
      });
    }
  } catch (error) {
    console.log("PUT: ReadingList", error);
    next(error);
  }
});

module.exports = router;
