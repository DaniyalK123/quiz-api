const express = require("express");
const quizAttemptController = require("./controller");
const { checkSchema } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  checkSchema({
    quizId: {
      isInt: true,
    },
    questionAttempts: {
      isArray: {
        min: 1,
      },
    },
  }),
  quizAttemptController.createQuizAttempt
);

module.exports = router;
