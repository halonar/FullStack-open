const router = require("express").Router();
const { Op } = require("sequelize");
const { User, Blog, ReadingList } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  //const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res, next) => {
  console.log("GET: user query: ", req.query.read);

  try {
    const { id } = req.params;
    const { read } = req.query;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      include: [
        {
          model: Blog,
          as: "readings",
          attributes: { exclude: ["userId"] },
          through: {
            model: ReadingList,
            attributes: ["read", "id"],
            where: read !== undefined ? { read: read === "true" } : undefined,
          },
        },
      ],
    });

    if (user) {
      res.json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    const { newUsername } = req.body;
    //console.log("req.body=", req.body);

    const user = await User.findOne({
      where: { username: username },
    });

    console.log("user=", user);

    if (user) {
      user.username = newUsername;
      await user.save();
      res.json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
