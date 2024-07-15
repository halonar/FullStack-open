const express = require("express");
const router = express.Router();
const { getAsync } = require("../redis");
const { ADD_TODOS_KEY } = require("../util/config");

const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (req, res) => {
  let todos = await getAsync(ADD_TODOS_KEY);

  if (todos === null || isNaN(todos)) {
    todos = 0;
    console.log("Info: no todos yet");
  }

  res.send({ added_todos: todos });
});

module.exports = router;
