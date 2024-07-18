const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { Blog, Session } = require("../models");

const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "not found" }).end();
  }

  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  console.log("authorization=", authorization);

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      console.log(SECRET);
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

const validateSession = async (req, res, next) => {
  console.log("validateSession", req.decodedToken);

  try {
    const { id, username } = req.decodedToken;
    const session = await Session.findOne({
      where: { username: username },
    });

    if (!session) {
      return res.status(404).json({ error: "no active session found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error("error.message=", error.message);
  console.error("error.name=", error.name);

  if (error.name === "CastError") {
    return response.status(404).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "SequelizeValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "SyntaxError") {
    return response.status(400).json({ error: error.message });
  } else {
    return response.status(500).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  tokenExtractor,
  blogFinder,
  validateSession,
  unknownEndpoint,
  errorHandler,
};
