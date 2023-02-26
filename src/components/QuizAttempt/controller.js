const QuizAttempt = require('./model');
const QuestionAttempt = require('../QuestionAttempt/model')
const Question = require('../Question/model')

function createQuizAttempt(req, res, next) {
    QuizAttempt.create(req.body, {
        include: [
            {
                association: QuizAttempt.QuestionAttempt,
                include: [QuestionAttempt.Answer, QuestionAttempt.Question]
            }
        ]
    }).then(quizAttempt => {
        return res.json(quizAttempt)
    }).catch(e => {
        console.log(e)
        next(e)
    })

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

module.exports = {
    createQuizAttempt
}