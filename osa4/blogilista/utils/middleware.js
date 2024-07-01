const jwt = require("jsonwebtoken");
const logger = require("./logger");

const tokenExtractor = (request, response, next) => {
  //const authorization = request.get("authorization");
  const authorization = request.header("Authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    return response
      .status(401)
      .json({ error: "Invalid or missing Bearer token" });
  }

  next();
};

const userExtractor = (request, response, next) => {
  const authorization = request.header("Authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");

    try {
      request.user = jwt.verify(token, process.env.SECRET);
      logger.info("middleware.request.user=", request.user);
      next();
    } catch (error) {
      response.status(401).json({ error: "Invalid token" });
    }
  } else {
    return response
      .status(401)
      .json({ error: "Invalid or missing Bearer token" });
  }
};

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (
    error.name === "Error" &&
    error.message.includes("data and salt arguments required")
  ) {
    //logger.error("error.name=", error.name);
    return response.status(400).send({ error: "invalid or missing password" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "token missing or invalid" });
  }

  next(error);
};

module.exports = {
  tokenExtractor,
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
