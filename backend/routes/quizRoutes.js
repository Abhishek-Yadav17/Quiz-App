const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  const quizData = require('../data/quizData.json');
  res.json(quizData);
});

module.exports = router;
