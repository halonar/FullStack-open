const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const User = require("../models/user");
const Session = require("../models/session");

const addSession = async (user) => {
  try {
    const { id, username } = user;
    console.log("LOGIN: Session: ", username);

    const session = await Session.findOne({
      where: { username: username },
    });

    if (session) console.log("sessionJson= ", session.toJSON());
    console.log("userid= ", id);

    if (!(session && session.toJSON().username === username)) {
      const newSession = await Session.create({ userid: id, username });
      return newSession;
    } else {
      console.log("LOGIN: session already exists");
      throw new Error("Login failed: session already exists");
    }
  } catch (error) {
    console.log("LOGIN: ", error);
    throw error;
  }
};

router.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  if (user.disabled) {
    return response
      .status(401)
      .json({ error: "account disabled, please contact admin" });
  }

  try {
    const session = await addSession(user);
    console.log(
      `LOGIN: Creating new session succeeded: ${session.toJSON.username}`
    );
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;
