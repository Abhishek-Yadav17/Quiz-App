import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/StartQuiz.scss';

const StartQuiz = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <motion.div
      className="start-quiz-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className={`start-quiz-card ${hover ? 'hovered' : ''}`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: 'spring', stiffness: 100 }}
        onMouseMove={(e) => {
          const card = e.currentTarget;
          const { offsetWidth: width, offsetHeight: height } = card;
          const { clientX: mouseX, clientY: mouseY } = e;

          const moveX = (mouseX - card.offsetLeft - width / 2) / 10;
          const moveY = (mouseY - card.offsetTop - height / 2) / 10;

          card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h1>Welcome to the Quiz Game</h1>
        <p>Test your knowledge with this fun quiz!</p>
        <motion.button
          onClick={startQuiz}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Start Quiz
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default StartQuiz;
