const express = require("express");
const quizController = require("./controller");
const { checkSchema } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  checkSchema({
    title: {
      isString: true,
      isLength: {
        min: 1,
        withMessage: "Title cannot be empty.",
      },
    },
    questions: {
      isArray: {
        min: 1,
        withMessage: "At least one question must be specified.",
      },
    },
    "questions.*.answers": {
      isArray: {
        min: 1,
        withMessage: "At least one answer must be specified",
      },
    },
    "questions.*.answers.*.description": {
      isString: true,
    },
    "questions.*.description": {
      isString: true,
      withMessage: "All questions must have a description",
      isLength: {
        min: 1,
        withMessage: "Question description cannot be empty",
      },
    },
  }),
  quizController.createQuiz
);
router.get("/:quizId", quizController.getQuiz);
router.get("/", quizController.getAllQuizzes);

module.exports = router;
