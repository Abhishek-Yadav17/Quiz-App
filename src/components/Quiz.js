import React, { useState, useEffect } from 'react';
import { fetchQuizData } from '../api';
import { useNavigate } from 'react-router-dom';
import Question from './Question';
import Results from './Results';
import { motion } from 'framer-motion';
import 'font-awesome/css/font-awesome.min.css';
import ReactConfetti from 'react-confetti';
import '../styles/Quiz.scss';

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuizData();
        if (data && data.questions && Array.isArray(data.questions)) {
          setQuizData(data.questions);
        } else {
          setError('Invalid data structure');
        }
      } catch (error) {
        setError('Error fetching quiz data');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / quizData.length) * 100);
  }, [currentQuestionIndex, quizData.length]);

  const handleAnswer = (selected) => {
    const currentQuestion = quizData[currentQuestionIndex];
    const correctOption = currentQuestion.options.find(option => option.is_correct);
    const isCorrect = selected === correctOption.description;

    setAnswers([...answers, { questionId: currentQuestion.id, selectedAnswer: selected, isCorrect }]);
    setAnswerSubmitted(true);
    setCorrectAnswerSelected(isCorrect);
    setTimeout(() => {
      setCorrectAnswerSelected(false);
    }, 6000);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      alert('Please select an answer before moving to the next question!');
      return;
    }

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setAnswerSubmitted(false);
      setCorrectAnswerSelected(false);
    } else {
      setQuizCompleted(true);
      navigate('/results', { state: { answers, quizData } });
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousAnswer = answers.find(answer => answer.questionId === quizData[currentQuestionIndex - 1].id);
      setSelectedAnswer(previousAnswer?.selectedAnswer || '');
      setAnswerSubmitted(true);
      setCorrectAnswerSelected(false);
    }
  };

if (loading) {
  return (
    <motion.div
      className="loading-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 9999,
      }}
    >
      <div className="loading-message">
        <h2>Loading quiz...</h2>
      </div>
    </motion.div>
  );
}

  if (error) return <div>{error}</div>;

  if (quizCompleted) {
    return <Results answers={answers} quizData={quizData} />;
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <motion.div
      className="quiz-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="quiz-card"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: 'spring', stiffness: 100 }}
      >
        {correctAnswerSelected && (
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
          />
        )}

        <motion.div className="progress-bar">
          <motion.div
            className="progress-fill"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Question
            question={currentQuestion.description}
            options={currentQuestion.options}
            selectedAnswer={selectedAnswer}
            onAnswer={setSelectedAnswer}
            onSubmitAnswer={handleAnswer}
            disabled={answerSubmitted}
          />
        </motion.div>


        <div className="navigation-buttons">
          <motion.button 
            whileHover={{
              scale: 1.1,
              x: 5,
              y: -5,
              transition: { type: 'spring', stiffness: 300 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { type: 'spring', stiffness: 300 },
            }}
            onClick={handlePrevQuestion} 
            disabled={currentQuestionIndex === 0}
            className="prev-button">
            <i className="fa fa-arrow-left"></i> Prev
          </motion.button>
          <motion.button 
            whileHover={{
              scale: 1.1,
              x: 5,
              y: -5,
              transition: { type: 'spring', stiffness: 300 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { type: 'spring', stiffness: 300 },
            }} 
            onClick={handleNextQuestion} 
            className="next-button">
            {currentQuestionIndex === quizData.length - 1 ? 'Go to Results' : 'Next'} 
            <i className="fa fa-arrow-right"></i>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Quiz;
