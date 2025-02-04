import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import '../styles/Result.scss';

const Results = () => {
  const location = useLocation();
  const { answers, quizData } = location.state || { answers: [], quizData: [] };

  const calculateScore = () => {
    return answers.reduce((score, answer) => {
      const question = quizData.find(q => q.id === answer.questionId);
      if (!question) return score;
      const correctOption = question.options.find(option => option.is_correct);
      if (correctOption && correctOption.description === answer.selectedAnswer) {
        score += 1;
      }
      return score;
    }, 0);
  };

  const score = calculateScore();
  const percentage = (score / quizData.length) * 100;

  return (
    <div className="results">
      {score >= 7 && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Quiz Completed!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        You scored {score} out of {quizData.length}
      </motion.p>
      <motion.div
        className="progress-bar-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          className="progress-bar"
          style={{ width: `${percentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
        />
      </motion.div>
    </div>
  );
};

export default Results;
