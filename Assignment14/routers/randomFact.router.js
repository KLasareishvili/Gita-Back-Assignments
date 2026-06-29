const { Router } = require("express");

const randomFactRouter = new Router();

const randomFactController = require("../controller/randomFact.controller");
const randomBlockMiddleware = require("../middleware/random-block.middleware");

randomFactRouter.get(
  "/",
  randomBlockMiddleware,
  randomFactController.getRandomFact,
);

module.exports = randomFactRouter;
