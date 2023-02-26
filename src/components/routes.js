const express = require('express');
const quizRoutes = require('./Quiz/routes');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));


router.use('/quiz', quizRoutes)

module.exports = router;