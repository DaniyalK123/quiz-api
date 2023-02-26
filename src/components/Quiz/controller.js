const Quiz = require("./model");
const Question = require("../Question/model");
const Answer = require("../Answer/model");
const { validationResult } = require("express-validator");
const { createResponse } = require("../../utils");

function createQuiz(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(createResponse(false, errors.array(), [400]));
  }

  req.body.questions.forEach((question) => {
    let correct = 0;
    question.answers.forEach((answer) => {
      console.log(answer.isCorrect);
      if (answer.isCorrect.toLowerCase() === "true") {
        correct += 1;
      }
    });
    if (correct !== 1) {
      return res
        .status(400)
        .json(
          createResponse(
            false,
            "Exactly one answer must be correct for each question",
            [400]
          )
        );
    }
  });

  Quiz.create(req.body, {
    include: [
      {
        association: Quiz.Question,
        include: [Question.Answer],
      },
    ],
  })
    .then((quiz) => {
      return res.json(createResponse(true, quiz, []));
    })
    .catch((e) => {
      return res
        .status(500)
        .json(createResponse(false, "An error occured", [500]));
    });
}

function getQuiz(req, res) {
  Quiz.findOne({
    where: {
      id: req.params.quizId,
    },
    include: [{ model: Question, include: [Answer] }],
  }).then((quiz) => {
    if (quiz === null) {
      console.log("not found");
      return res
        .status(400)
        .json(createResponse(false, "Quiz not found", [404]));
    } else {
      res.json(createResponse(true, quiz, []));
    }
  });
}

function getAllQuizzes(req, res) {
  Quiz.findAll()
    .then((quizzes) => {
      res.json(createResponse(true, quizzes, []));
    })
    .catch((e) => {
      return res
        .status(500)
        .json(createResponse(false, "An error occured", [500]));
    });
}

module.exports = {
  createQuiz,
  getQuiz,
  getAllQuizzes,
};
