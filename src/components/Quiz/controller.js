const Quiz = require('./model');
const Question = require('../Question/model')
const Answer = require("../Answer/model")
const { validationResult } = require('express-validator');

function createQuiz(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    Quiz.create(req.body, {
        include: [
            {
                association: Quiz.Question,
                include: [Question.Answer]
            }
        ]
    }).then((quiz) => {
        return res.json(quiz)
    }).catch(e => {
        console.log(e)
        next(e)
    })
}

function getQuiz(req,res,next) {
    Quiz.findOne({
        where: {
          id: req.params.quizId
        },
        include: [{model: Question, include: [Answer]}]
      }).then((quiz) => {
        if (quiz === null) {
            console.log('not found');
            res.status(400)
        } else {
            res.json(quiz)
        }
    })
}

module.exports = {
    createQuiz,
    getQuiz
}
