const express = require("express");
const quizRoutes = require("./Quiz/routes");
const QuizAttemptRoutes = require("./QuizAttempt/routes");
const { createResponse } = require("../utils");

const router = express.Router(); // eslint-disable-line new-cap

router.use("/quiz", quizRoutes);
router.use("/quizAttempt", QuizAttemptRoutes);
router.get("*", function (req, res) {
  res.status(404).json(createResponse(false, "Not found", [404]));
});

module.exports = router;
