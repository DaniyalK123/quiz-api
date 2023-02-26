const express = require('express');
const quizController = require('./controller');
const { checkSchema, validationResult } = require('express-validator');


const router = express.Router();

router.post("/",
checkSchema({
    title: {
        isString: true,
        isLength: {
            min: 1
        }
    },
    questions: {
        isArray: {
            min: 1
        }
    },
    'questions.*.answers': {
        isArray: {
            min: 1
        }
    }
})
,quizController.createQuiz)
router.get("/:quizId", quizController.getQuiz)

module.exports = router