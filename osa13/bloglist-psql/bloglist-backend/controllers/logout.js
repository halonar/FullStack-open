const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const Session = require("../models/session");
const { tokenExtractor, validateSession } = require("../util/middleware");

router.delete(
  "/",
  tokenExtractor,
  validateSession,
  async (request, response) => {
    try {
      const { id, username } = request.decodedToken;

      await Session.destroy({
        where: { username: username },
      });

      console.log(`session logged out by user: ${username}`);
      response.status(204).end();
    } catch (error) {
      console.log("session logging out failed", error);
      return response.status(401).json({
        error: "session logging out failed",
      });
    }
  }
);

module.exports = router;
