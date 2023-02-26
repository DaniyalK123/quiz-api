const QuizAttempt = require("./model");
const QuestionAttempt = require("../QuestionAttempt/model");
const Question = require("../Question/model");
const { createResponse } = require("../../utils");
const { Quiz, Answer } = require("../models");

async function createQuizAttempt(req, res, next) {
  const quiz = await Quiz.findOne({
    where: {
      id: req.body.quizId,
    },
  });

  if (quiz === null) {
    return res
      .status(400)
      .json(createResponse(false, "Specified quiz does not exist", [400]));
  }

  const questionIds = req.body.questionAttempts.map((qa) => qa.questionId);
  const answerIds = req.body.questionAttempts.map((qa) => qa.answerId);

  const questions = await Question.findAll({
    where: {
      id: questionIds,
    },
  });

  if (questions.length !== questionIds.length) {
    return res
      .status(400)
      .json(
        createResponse(false, "One or more question IDs does not exist.", [400])
      );
  }

  const answers = await Answer.findAll({
    where: {
      id: answerIds,
    },
  });

  if (answers.length !== answerIds.length) {
    return res
      .status(400)
      .json(
        createResponse(false, "One or more answer IDs does not exist.", [400])
      );
  }

  const quizQuestions = await quiz.getQuestions();
  const mandatoryQuestions = quizQuestions.filter((q) => q.isMandatory);

  mandatoryQuestions.forEach((question) => {
    if (!questionIds.includes(question.id)) {
      return res
        .status(400)
        .json(
          createResponse(false, "All mandatory questions must be answered.", [
            400,
          ])
        );
    }
  });

  QuizAttempt.create(req.body, {
    include: [
      {
        association: QuizAttempt.QuestionAttempt,
        include: [QuestionAttempt.Answer, QuestionAttempt.Question],
      },
    ],
  })
    .then((quizAttempt) => {
      return res.json(createResponse(true, quizAttempt, []));
    })
    .catch((e) => {
      return res.status(500).json(createResponse(false, e.message, [500]));
    });
}

function getQuizAttempt(req, res) {
  QuizAttempt.findOne({
    where: {
      id: req.params.quizAttemptId,
    },
    include: [{ model: QuestionAttempt, include: [Answer, Question] }],
  }).then((quizAttempt) => {
    if (quizAttempt === null) {
      return res
        .status(400)
        .json(createResponse(false, "Quiz Attempt not found", [404]));
    } else {
      res.json(createResponse(true, quizAttempt, []));
    }
  });
}

function getAllQuizAttempts(req, res) {
  QuizAttempt.findAll()
    .then((quizAttempts) => {
      res.json(createResponse(true, quizAttempts, []));
    })
    .catch((e) => {
      return res
        .status(500)
        .json(createResponse(false, "An error occured", [500]));
    });
}

module.exports = {
  createQuizAttempt,
  getQuizAttempt,
  getAllQuizAttempts,
};
