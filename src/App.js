import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './components/Quiz';
import Results from './components/Results';
import StartQuiz from './components/StartQuiz';
import './styles/StartQuiz.scss'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartQuiz />} />

        <Route path="/quiz" element={<Quiz />} />

        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
