import React from 'react';
import '../styles/Question.scss';
import { motion } from 'framer-motion'

const Question = ({ question, options, selectedAnswer, onAnswer, disabled, onSubmitAnswer }) => {
  const handleOptionChange = (e) => {
    if (!disabled) {
      const selected = e.target.value;
      onAnswer(selected);
      onSubmitAnswer(selected);
    }
  };

  return (
    <div className="question-container">
      <h3>{question}</h3>
      <div className="options">
        {options.map((option, index) => {
          const isCorrect = option.is_correct;
          const isSelected = selectedAnswer === option.description;
          const optionClass = disabled
            ? isSelected
              ? isCorrect
                ? 'selected-correct'
                : 'selected-incorrect'
              : ''
            : '';
          const optionBgClass = `option-bg-${index}`;
          return (
            <motion.div 
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              key={option.id} 
              className={`option ${optionBgClass}`}>
              <input
                type="radio"
                id={option.id}
                name="answer"
                value={option.description}
                checked={isSelected}
                onChange={handleOptionChange}
                disabled={disabled}
              />
              <label
                htmlFor={option.id}
                className={optionClass}
              >
                {option.description}
              </label>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
