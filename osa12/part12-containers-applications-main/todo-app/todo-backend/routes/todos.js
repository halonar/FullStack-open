const express = require("express");
const { Todo } = require("../mongo");
const { ObjectId } = require("mongodb");
const { getAsync, setAsync } = require("../redis");
const { ADD_TODOS_KEY } = require("../util/config");

const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  console.log("GET todos listing");
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  let todos = await getAsync(ADD_TODOS_KEY);
  todos = parseInt(todos);

  if (isNaN(todos)) {
    todos = 1;
    console.log("Info: this is the first todos");
  } else {
    todos = Number(todos) + 1;
  }

  console.log("ADD_TODOS_KEY = ", todos);
  console.log("TESTING_KEY = ", todos);

  await setAsync(ADD_TODOS_KEY, todos);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  try {
    res.json(req.todo);
  } catch (err) {
    res.status(500).send(err.message);
    //res.sendStatus(405); // Implement this
  }
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  console.log("***singleRouter.put=", req.todo);
  try {
    const body = req.body;
    const todo = {
      text: body.text,
      done: body.done,
    };

    const id = new ObjectId(req.todo._id);
    const updatedTodo = await Todo.updateOne({ _id: id }, todo);
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).send(err.message);
    //res.sendStatus(405); // Implement this
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
